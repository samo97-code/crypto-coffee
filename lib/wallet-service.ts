import {supabase} from "@/lib/supabase";
import {IHistoryTransaction, IPaginationInfo, ITransactionStats, IWalletPageData} from "@/types";


export class WalletService {
    /**
     * Get transaction statistics for a user
     */
    async getTransactionStats(userId: string): Promise<ITransactionStats> {

        // Get transaction count
        const {count: txCount, error: txCountError} = await supabase
            .from('transactions')
            .select('*', {count: 'exact', head: true})
            .eq('user_id', userId)

        if (txCountError) throw txCountError

        // Get networks used
        const {data, error} = await supabase
            .rpc('get_user_networks', {uid: userId});

        if (error) console.error(error);

        if (error) throw error

        // Get most active network
        const {data: mostActiveNetwork, error: networkError} = await supabase
            .rpc('get_most_active_network', {uid: userId});

        if (networkError) throw networkError;

        return {
            transaction_count: txCount || 0,
            networks_used: data.length,
            most_active_network: mostActiveNetwork.length > 0 ? mostActiveNetwork[0].network_name : 'None'
        }
    }

    /**
     * Get transaction history with pagination and filtering
     */
    async getTransactionHistory(
        userId: string,
        network: string = 'all',
        period: string = '30',
        page: number = 1,
        pageSize: number = 5
    ): Promise<{ transactions: IHistoryTransaction[], pagination: IPaginationInfo }> {
        const offset = (page - 1) * pageSize

        // Build the query with filters
        let query = supabase
            .from('transactions')
            .select(`
        id,
        created_at,
        type,
        transaction_hash,
        projects(
            name,
            icon_url,
            blockchain_networks (
            explorer_url,
            chain_key
          )
        ),
        network_name,
        amount,
        status,
        transaction_hash
      `)
            .eq('user_id', userId)

        // Apply network filter
        if (network !== 'all') {
            query = query.eq('network_name', network)
        }

        // Apply time period filter
        if (period !== 'all') {
            const daysAgo = parseInt(period)
            const fromDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
            query = query.gte('created_at', fromDate)
        }

        // Get paginated results
        const {data, error: txError} = await query
            .order('created_at', {ascending: false})
            .range(offset, offset + pageSize - 1)

        if (txError) throw txError

        // Format the transactions
        const transactions = data.map((tx) => ({
            id: tx.id,
            created_at: tx.created_at,
            type: tx.type === 'support' ? 'Bought Coffee' : tx.type,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            project_name: tx.projects?.name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            icon_url: tx.projects?.icon_url,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            chain_key: tx.projects?.blockchain_networks[0].chain_key,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            explorer_url: `${tx.projects?.blockchain_networks[0].explorer_url}/tx/${tx.transaction_hash}`,
            network_name: tx.network_name,
            amount: tx.amount,
            status: tx.status,
            transaction_hash: tx.transaction_hash
        })) as IHistoryTransaction[]

        // Get total count for pagination
        let countQuery = supabase
            .from('transactions')
            .select('*', {count: 'exact', head: true})
            .eq('user_id', userId)

        // Apply the same filters to the count query
        if (network !== 'all') {
            countQuery = countQuery.eq('network_name', network)
        }

        if (period !== 'all') {
            const daysAgo = parseInt(period)
            const fromDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
            countQuery = countQuery.gte('created_at', fromDate)
        }

        const {count, error: countError} = await countQuery

        if (countError) throw countError

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return {
            transactions,
            pagination: {
                total: count || 0,
                page,
                pageSize,
                totalPages: Math.ceil((count || 0) / pageSize)
            }
        }
    }

    /**
     * Get All list of networks
     */
    async getAllNetworks(): Promise<string[]> {
        const {data: allNetworks, error} = await supabase
            .from('projects')
            .select('network_name')

        if (error) throw error;

        // ✅ Remove duplicates manually
        return allNetworks?.map((item) => item.network_name)
    }

    /**
     * Get all data needed for the wallet page in a single call
     */
    async getWalletPageData(
        userId: string,
        network: string = 'all',
        period: string = '30',
        page: number = 1,
        pageSize: number = 5
    ): Promise<IWalletPageData> {
        try {
            const [allNetworks, stats, txData] = await Promise.all([
                this.getAllNetworks(),
                this.getTransactionStats(userId),
                this.getTransactionHistory(userId, network, period, page, pageSize),
            ])

            return {
                stats,
                transactions: txData.transactions,
                pagination: txData.pagination,
                allNetworks: [{label: 'All networks', value: 'all'}, ...allNetworks.map((name) => ({
                    label: name,
                    value: name
                }))],
            }
        } catch (error) {
            console.error('Error fetching wallet page data:', error)
            throw error
        }
    }
}

// Export a singleton instance
export const walletService = new WalletService()
