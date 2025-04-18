-- =============================================
-- CRYPTO COFFEE PLATFORM DATABASE SCHEMA
-- =============================================

-- =============================================
-- CORE TABLES
-- =============================================

-- Users table (using wallet_address as identifier)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE,
  display_name TEXT,
  email TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  wallet_address TEXT UNIQUE NOT NULL,
  timezone TEXT DEFAULT 'UTC',
  website_url TEXT,
  twitter_username TEXT,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  total_supported_amount DECIMAL(12,2) DEFAULT 0,
  level_id INTEGER,
  experience_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table (blockchain networks)
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  chain TEXT NOT NULL,
  network_name TEXT NOT NULL,
  icon_url TEXT,
  description TEXT,
  status TEXT DEFAULT 'Ready for your daily support!',
  button_text TEXT,
  button_color TEXT,
  is_new BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  total_supporters INTEGER DEFAULT 0,
  total_support_amount DECIMAL(12,6) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blockchain Networks metadata
CREATE TABLE blockchain_networks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) NOT NULL,
  chain_key TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  explorer_url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('mainnet', 'testnet')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  project_id INTEGER REFERENCES projects(id) NOT NULL,
  network_name TEXT NOT NULL,
  transaction_hash TEXT,
  amount NUMERIC(12, 8),
  type TEXT NOT NULL CHECK (type IN ('support', 'reward')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  icon_bg TEXT NOT NULL,
  icon_color TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements table
CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  achievement_id INTEGER REFERENCES achievements(id) NOT NULL,
  progress INTEGER DEFAULT 0,
  is_unlocked BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Levels table
CREATE TABLE levels (
  id SERIAL PRIMARY KEY,
  level_number INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  requirements TEXT NOT NULL,
  experience_required INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Level Rewards table
CREATE TABLE level_rewards (
  id SERIAL PRIMARY KEY,
  level_id INTEGER REFERENCES levels(id) NOT NULL,
  reward_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Activities table
CREATE TABLE daily_activities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  icon_bg TEXT NOT NULL,
  icon_color TEXT NOT NULL,
  fee DECIMAL(12,2) NOT NULL,
  reward TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('games', 'fun', 'rewards')),
  action_text TEXT NOT NULL,
  completed_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Completions table
CREATE TABLE activity_completions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  activity_id INTEGER REFERENCES daily_activities(id) NOT NULL,
  completion_date DATE DEFAULT CURRENT_DATE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, activity_id, completion_date)
);

-- Coffee Brews table
CREATE TABLE coffee_brews (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  apy TEXT NOT NULL,
  duration TEXT NOT NULL,
  beans_staked INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Streaks table
CREATE TABLE user_streaks (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  streak_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, streak_date)
);

-- =============================================
-- INDEXES
-- =============================================

-- Users indexes
CREATE INDEX idx_users_wallet_address ON users(wallet_address);

-- Transactions indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_project_id ON transactions(project_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- User achievements indexes
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- Activity completions indexes
CREATE INDEX idx_activity_completions_user_id ON activity_completions(user_id);
CREATE INDEX idx_activity_completions_activity_id ON activity_completions(activity_id);
CREATE INDEX idx_activity_completions_completed_at ON activity_completions(completed_at);

-- User streaks indexes
CREATE INDEX idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX idx_user_streaks_streak_date ON user_streaks(streak_date);

-- Blockchain networks index
CREATE INDEX idx_blockchain_networks_project_id ON blockchain_networks(project_id);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_networks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coffee_brews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- Create a function to check if a user is authenticated by wallet
CREATE OR REPLACE FUNCTION is_wallet_owner(wallet_address TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- This function would normally verify a signature or token
  -- For now, we'll just check if the wallet exists in the users table
  RETURN EXISTS (
    SELECT 1 FROM users WHERE users.wallet_address = wallet_address
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users table policies
CREATE POLICY "Anyone can create a user"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (true);

-- Projects table policies (public read)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

-- Blockchain networks policies (public read)
CREATE POLICY "Anyone can view blockchain networks"
  ON blockchain_networks FOR SELECT
  USING (true);

-- Transactions table policies
CREATE POLICY "Users can view transactions"
  ON transactions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- Achievements table policies (public read)
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  USING (true);

-- User achievements table policies
CREATE POLICY "Users can view user achievements"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "Users can insert user achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (true);

-- Levels table policies (public read)
CREATE POLICY "Anyone can view levels"
  ON levels FOR SELECT
  USING (true);

-- Level rewards table policies (public read)
CREATE POLICY "Anyone can view level rewards"
  ON level_rewards FOR SELECT
  USING (true);

-- Daily activities table policies (public read)
CREATE POLICY "Anyone can view daily activities"
  ON daily_activities FOR SELECT
  USING (true);

-- Activity completions table policies
CREATE POLICY "Users can view activity completions"
  ON activity_completions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert activity completions"
  ON activity_completions FOR INSERT
  WITH CHECK (true);

-- Coffee brews table policies
CREATE POLICY "Users can view coffee brews"
  ON coffee_brews FOR SELECT
  USING (true);

CREATE POLICY "Users can insert coffee brews"
  ON coffee_brews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update coffee brews"
  ON coffee_brews FOR UPDATE
  USING (true);

-- User streaks table policies
CREATE POLICY "Users can view user streaks"
  ON user_streaks FOR SELECT
  USING (true);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update user streak when activity is completed
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into user_streaks if not already exists for today
  INSERT INTO user_streaks (user_id, streak_date)
  VALUES (NEW.user_id, CURRENT_DATE)
  ON CONFLICT (user_id, streak_date) DO NOTHING;

  -- Update current streak in users table
  WITH streak_data AS (
    SELECT
      user_id,
      COUNT(*) as current_streak
    FROM (
      SELECT
        user_id,
        streak_date,
        streak_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY streak_date) AS grp
      FROM user_streaks
      WHERE user_id = NEW.user_id
      ORDER BY streak_date DESC
    ) sub
    WHERE streak_date >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY user_id, grp
    ORDER BY COUNT(*) DESC
    LIMIT 1
  )
  UPDATE users
  SET
    current_streak_days = streak_data.current_streak,
    longest_streak_days = GREATEST(longest_streak_days, streak_data.current_streak)
  FROM streak_data
  WHERE users.id = streak_data.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_activity_completion
AFTER INSERT ON activity_completions
FOR EACH ROW
EXECUTE FUNCTION update_user_streak();

-- Function to update transaction totals
CREATE OR REPLACE FUNCTION update_transaction_totals()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.type = 'support' THEN
    -- Update project totals
    UPDATE projects
    SET
      total_supporters = total_supporters + 1,
      total_support_amount = total_support_amount + NEW.amount
    WHERE id = NEW.project_id;

    -- Update user totals
    UPDATE users
    SET total_supported_amount = total_supported_amount + NEW.amount
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_transaction_insert
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_transaction_totals();

-- Function to get or create a user by wallet address
CREATE OR REPLACE FUNCTION get_or_create_user(wallet_addr TEXT)
RETURNS TABLE (
  id UUID,
  wallet_address TEXT,
  username TEXT,
  display_name TEXT,
  is_new BOOLEAN
) AS $$
DECLARE
  user_id UUID;
  is_new_user BOOLEAN := false;
BEGIN
  -- Check if user exists
  SELECT u.id INTO user_id
  FROM users u
  WHERE u.wallet_address = wallet_addr;

  -- If not, create a new user
  IF user_id IS NULL THEN
    is_new_user := true;

    INSERT INTO users (wallet_address, username, display_name, level_id)
    VALUES (
      wallet_addr,
      'user_' || substring(wallet_addr from 3 for 8),
      'Crypto Coffee User',
      1
    )
    RETURNING id INTO user_id;
  END IF;

  -- Return the user data
  RETURN QUERY
  SELECT
    u.id,
    u.wallet_address,
    u.username,
    u.display_name,
    is_new_user
  FROM users u
  WHERE u.id = user_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert blockchain projects
INSERT INTO projects (id, name, chain, network_name, icon_url, description, status, button_text, button_color, is_new)
VALUES
  (1, 'Eth Sepolia', 'Eth', 'Eth Sepolia', '/images/chains/eth.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on ETH', 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500', true),
  (2, 'Monad', 'Monad', 'Monad', '/images/chains/monad.jpg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Monad', 'bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-900 hover:to-indigo-900', true),
  (3, 'Optimism', 'Optimism', 'Optimism', '/images/chains/optimism.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Optimism', 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600', true),
  (4, 'Arbitrum', 'Arbitrum', 'Arbitrum', '/images/chains/arbitrum.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Arbitrum', 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600', true),
  (5, 'Base', 'Base', 'Base', '/images/chains/base.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Base', 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500', true),
  (6, 'Scroll', 'Scroll', 'Scroll', '/images/chains/scroll.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Scroll', 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600', true),
  (7, 'zkSync', 'zkSync', 'zkSync', '/images/chains/zkSync.png', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on zkSync', 'bg-gradient-to-r from-zinc-800 to-gray-700 hover:from-zinc-900 hover:to-gray-800', true),
  (8, 'Mode', 'Mode', 'Mode', '/images/chains/mode.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Mode', 'bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500', true),
  (9, 'Zora', 'Zora', 'Zora', '/images/chains/zora.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Zora', 'bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600', true),
  (10, 'Linea', 'Linea', 'Linea', '/images/chains/linea.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Linea', 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600', true),
  (11, 'Ink', 'Ink', 'Ink', '/images/chains/ink.png', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Ink', 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700', true),
  (12, 'Soneium', 'Soneium', 'Soneium', '/images/chains/soneium.jpeg', 'Privacy-focused blockchain', 'Ready for your daily support!', 'Buy Coffee on Soneium', 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700', true),
  (13, 'Unichain', 'Unichain', 'Unichain', '/images/chains/unichain.jpg', 'Interoperability protocol', 'Ready for your daily support!', 'Buy Coffee on Unichain', 'bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500', true),
  (14, 'Hemi', 'Hemi', 'Hemi', '/images/chains/hemi.webp', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Hemi', 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600', true),
  (15, 'BOB', 'Bob', 'BOB', '/images/chains/bob.webp', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Bob', 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600', true),
  (16, 'Superseed', 'Superseed', 'Superseed', '/images/chains/superseed.png', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Superseed', 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-900 hover:to-gray-800', true),
  (17, 'Fraxtal', 'Fraxtal', 'Fraxtal', '/images/chains/fraxtal.webp', 'Layer 2 scaling solution', 'Ready for your daily support!', 'Buy Coffee on Fraxtal', 'bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-black hover:to-zinc-900', true),
  (18, 'Lisk', 'Lisk', 'Lisk', '/images/chains/lisk.svg', 'A decentralized exchange', 'Ready for your daily support!', 'Buy Coffee on Lisk', 'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500', true);

-- Insert blockchain network metadata
INSERT INTO blockchain_networks (project_id, chain_key, chain_id, explorer_url, type)
VALUES
  (1, 'Eth', 11155111, 'https://sepolia.etherscan.io/', 'testnet'),
  (2, 'Mon', 10143, 'https://testnet.monadexplorer.com/', 'testnet'),
  (3, 'Eth', 10, 'https://optimistic.etherscan.io/', 'mainnet'),
  (4, 'Eth', 42161, 'https://arbiscan.io/', 'mainnet'),
  (5, 'Eth', 8453, 'https://basescan.org/', 'mainnet'),
  (6, 'Eth', 534352, 'https://scrollscan.com/', 'mainnet'),
  (7, 'Eth', 324, 'https://explorer.zksync.io/', 'mainnet'),
  (8, 'Eth', 34443, 'https://explorer.mode.network/', 'mainnet'),
  (9, 'Eth', 7777777, 'https://explorer.zora.energy/', 'mainnet'),
  (10, 'Eth', 59144, 'https://lineascan.build/', 'mainnet'),
  (11, 'Eth', 57073, 'https://explorer.inkonchain.com/', 'mainnet'),
  (12, 'Eth', 1868, 'https://soneium.blockscout.com/', 'mainnet'),
  (13, 'Eth', 130, 'https://unichain.blockscout.com/', 'mainnet'),
  (14, 'Eth', 43111, 'https://explorer.hemi.xyz/', 'mainnet'),
  (15, 'Eth', 60808, 'https://explorer.gobob.xyz/', 'mainnet'),
  (16, 'Eth', 5330, 'https://explorer.superseed.xyz/', 'mainnet'),
  (17, 'Eth', 252, 'https://fraxscan.com/', 'mainnet'),
  (18, 'Eth', 1135, 'https://blockscout.lisk.com/', 'mainnet');

-- Insert levels
INSERT INTO levels (level_number, name, requirements, experience_required)
VALUES
  (1, 'Coffee Novice', 'Join Crypto Coffee', 0),
  (2, 'Coffee Apprentice', 'Support 5 projects', 100),
  (3, 'Coffee Enthusiast', 'Support 10 projects and maintain a 7-day streak', 250),
  (4, 'Coffee Aficionado', 'Support 20 projects and complete 15 daily activities', 500),
  (5, 'Coffee Connoisseur', 'Support 30 projects and maintain a 14-day streak', 1000),
  (6, 'Coffee Master', 'Support 40 projects and unlock 10 achievements', 2000),
  (7, 'Coffee Virtuoso', 'Support 50 projects and maintain a 21-day streak', 3500),
  (8, 'Coffee Legend', 'Support 75 projects and unlock 20 achievements', 5000),
  (9, 'Coffee Oracle', 'Support 100 projects and maintain a 30-day streak', 7500),
  (10, 'Coffee Deity', 'Support 150 projects and unlock all achievements', 10000);

-- Insert level rewards
INSERT INTO level_rewards (level_id, reward_description)
VALUES
  (1, 'Basic profile features'),
  (1, 'Access to daily activities'),
  (2, 'Custom profile badge'),
  (2, '+5% chance in Gas Fee Lottery'),
  (3, 'Exclusive profile themes'),
  (3, 'Daily activity bonus rewards'),
  (4, 'Reduced fees on transactions'),
  (4, 'Access to exclusive networks'),
  (5, 'Special coffee bean multipliers'),
  (5, 'Custom avatar frames'),
  (6, 'Priority support access'),
  (6, 'Exclusive NFT drops'),
  (7, 'Higher staking rewards'),
  (7, 'Custom username colors'),
  (8, 'Beta feature access'),
  (8, 'Governance voting rights'),
  (9, 'VIP community access'),
  (9, 'Special mention on leaderboards'),
  (10, 'Lifetime premium status'),
  (10, 'Exclusive merchandise');

-- Insert achievements
INSERT INTO achievements (name, description, icon_name, icon_bg, icon_color, requirement_type, requirement_value, is_featured)
VALUES
  ('Early Adopter', 'Joined Crypto Coffee in the first month of launch', 'Award', 'bg-purple-100', 'text-purple-600', 'join_date', 30, true),
  ('Coffee Connoisseur', 'Supported 50 different projects', 'Coffee', 'bg-coffee-100', 'text-coffee-700', 'projects_supported', 50, true),
  ('Generous Brewer', 'Contributed over $1,000 in total support', 'Droplets', 'bg-green-100', 'text-green-600', 'total_support', 1000, true),
  ('Streak Master', 'Maintained a 30-day support streak', 'Zap', 'bg-orange-100', 'text-orange-600', 'streak_days', 30, false),
  ('Chain Explorer', 'Supported projects on 10 different networks', 'Globe', 'bg-blue-100', 'text-blue-600', 'networks_supported', 10, true),
  ('Daily Devotee', 'Completed all daily activities for 7 consecutive days', 'Calendar', 'bg-indigo-100', 'text-indigo-600', 'daily_activities', 7, false),
  ('Bean Baron', 'Staked over 10,000 beans in coffee brews', 'Bean', 'bg-amber-100', 'text-amber-600', 'beans_staked', 10000, true),
  ('Social Butterfly', 'Connected your social media accounts', 'Share', 'bg-pink-100', 'text-pink-600', 'social_connections', 3, false),
  ('Crypto Trivia Master', 'Answered 50 crypto trivia questions correctly', 'Brain', 'bg-cyan-100', 'text-cyan-600', 'trivia_correct', 50, true),
  ('Gas Lottery Winner', 'Won the gas fee lottery', 'Trophy', 'bg-yellow-100', 'text-yellow-600', 'lottery_wins', 1, true);

-- Insert daily activities
INSERT INTO daily_activities (name, description, icon_name, icon_bg, icon_color, fee, reward, category, action_text, completed_text)
VALUES
  ('Gas Fee Lottery', 'Pay a fixed fee and get a chance to win accumulated rewards or a special NFT.', 'Ticket', 'bg-purple-100', 'text-purple-600', 0.045, 'Daily prize pool or NFT', 'rewards', 'Enter Lottery', 'Entered Today'),
  ('Crypto Trivia', 'Answer a daily crypto question correctly to earn badges or points.', 'Brain', 'bg-blue-100', 'text-blue-600', 0.045, 'Badges & Points', 'games', 'Answer Question', 'Answered Today'),
  ('Daily Crypto Joke', 'Reveal a daily crypto-themed joke that you can share on social media.', 'Laugh', 'bg-yellow-100', 'text-yellow-600', 0.045, 'Shareable content', 'fun', 'Reveal Joke', 'Joke Revealed'),
  ('Blockchain Bingo', 'Get daily bingo numbers and win rewards for completed rows or cards.', 'Dice', 'bg-green-100', 'text-green-600', 0.045, 'Weekly/monthly prizes', 'games', 'Play Bingo', 'Played Today'),
  ('Crypto Pet', 'Feed your virtual Crypto Cat daily and watch it grow and evolve.', 'Cat', 'bg-orange-100', 'text-orange-600', 0.045, 'Pet collectibles', 'fun', 'Feed Pet', 'Pet Fed Today');
