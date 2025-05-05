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
  status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  outcome_type VARCHAR(50) CHECK (outcome_type IN ('win', 'lose', 'tie', 'other')),
  transaction_id INTEGER REFERENCES transactions(id),
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
-- Final version
INSERT INTO "public"."levels" ("id", "level_number", "name", "requirements", "experience_required", "created_at", "updated_at") VALUES
(1, 1, 'Coffee Novice', 'Join Crypto Coffee', 0, now(), now()),
(2, 2, 'Coffee Sipper', 'Buy coffee from 3 projects', 50, now(), now()),
(3, 3, 'Trivia Rookie', 'Answer 5 trivia questions correctly', 125, now(), now()),
(4, 4, 'Daily Dripper', 'Complete 5 daily activities', 225, now(), now()),
(5, 5, 'Coffee Explorer', 'Buy coffee from 5 networks', 350, now(), now()),
(6, 6, 'Activity Regular', 'Log 7 days in a row', 500, now(), now()),
(7, 7, 'Coffee Collector', 'Buy coffee from 10 projects', 700, now(), now()),
(8, 8, 'Gas Grinder', 'Send tx when gas is above 30 gwei', 950, now(), now()),
(9, 9, 'Trivia Addict', 'Answer 25 trivia questions', 1250, now(), now()),
(10, 10, 'Coffee Devotee', 'Buy coffee from 15 projects and maintain 7-day streak', 1600, now(), now()),
(11, 11, 'Support Streaker', 'Maintain a 14-day streak', 2000, now(), now()),
(12, 12, 'Chain Jumper', 'Buy coffee on 10 chains', 2450, now(), now()),
(13, 13, 'Bingo Player', 'Play 5 games of Bingo', 2950, now(), now()),
(14, 14, 'Trivia Veteran', 'Answer 50 trivia questions', 3550, now(), now()),
(15, 15, 'Gas Warrior', 'Complete 3 gas lottery entries', 4200, now(), now()),
(16, 16, 'Chain Challenger', 'Win 5 Rock Paper Scissors games', 4950, now(), now()),
(17, 17, 'Daily Devotion', 'Complete any daily activity for 21 consecutive days', 5800, now(), now()),
(18, 18, 'Coffee Enthusiast', 'Buy coffee from 25 projects', 6700, now(), now()),
(19, 19, 'Knowledge is Power', 'Answer 100 trivia questions', 7700, now(), now()),
(20, 20, 'Coffee Aficionado', 'Buy coffee from 30 projects + maintain 21-day streak', 8800, now(), now()),
(21, 21, 'Trivia Fiend', 'Answer 5 trivia in a row correctly', 10000, now(), now()),
(22, 22, 'RPS Veteran', 'Win 10 Rock Paper Scissors matches', 11500, now(), now()),
(23, 23, 'Full House', 'Complete a full Bingo card', 13000, now(), now()),
(24, 24, 'Lucky Brewer', 'Win the gas lottery 3 times', 14500, now(), now()),
(25, 25, 'Coffee Connoisseur', 'Buy coffee from 40 projects', 16000, now(), now()),
(26, 26, 'The Rock', 'Win 3 Rock Paper Scissors games in a row', 17500, now(), now()),
(27, 27, 'Daily Champion', 'Complete 75 daily activities', 19000, now(), now()),
(28, 28, 'Trivia Oracle', 'Answer 150 trivia questions', 21500, now(), now()),
(29, 29, 'Coffee Legend', 'Buy coffee from 60 projects and unlock 20 achievements', 23500, now(), now()),
(30, 30, 'Coffee Deity', 'Buy coffee from 80 projects and unlock 24 achievements', 26000, now(), now());


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
-- Final version
INSERT INTO "public"."achievements" (
  "id", "name", "description", "icon_name", "icon_bg", "icon_color",
  "requirement_type", "requirement_value", "xp_reward", "is_featured", "is_show","created_at", "updated_at"
) VALUES
-- Original Achievements
('1', 'Early Adopter', 'Joined Crypto Coffee in the first month of launch', 'Award', 'bg-purple-100', 'text-purple-600', 'join_date', 1, 25, true, true, NOW(), NOW()),
('2', 'Coffee Connoisseur', 'Buy Coffee 50 time', 'Coffee', 'bg-coffee-100', 'text-coffee-700', 'projects_supported', 50, 300, true,true, NOW(), NOW()),
('3', 'Generous Brewer', 'Contributed over $200 in total', 'Droplets', 'bg-green-100', 'text-green-600', 'total_support', 200, 300, true,true, NOW(), NOW()),
('4', 'Streak Master', 'Maintained a 20-day streak', 'Zap', 'bg-orange-100', 'text-orange-600', 'streak_days', 20, 250, false,true, NOW(), NOW()),
('5', 'Multichain Master', 'Buy Coffee on 10 different chains', 'Globe', 'bg-blue-100', 'text-blue-600', 'networks_supported', 10, 250, true, true, NOW(), NOW()),
('6', 'Daily Devotee', 'Completed all daily activities for 7 consecutive days', 'Calendar', 'bg-indigo-100', 'text-indigo-600', 'daily_activities', 7, 150, false,true, NOW(), NOW()),
('7','Chain Explorer','Bought coffee on 5 different chains','Globe','bg-teal-100','text-teal-600','unique_chains', 5, 150, true, true, NOW(), NOW()),
('8', 'Social Butterfly', 'Connected your social media accounts', 'Share', 'bg-pink-100', 'text-pink-600', 'social_connections', 1, 100, false, false, NOW(), NOW()),
('9', 'Crypto Trivia Master', 'Answered 50 crypto trivia questions correctly', 'Brain', 'bg-cyan-100', 'text-cyan-600', 'trivia_correct', 50, 300, true, false, NOW(), NOW()),
('10', 'Gas Lottery Winner', 'Won the gas fee lottery', 'Trophy', 'bg-yellow-100', 'text-yellow-600', 'lottery_wins', 1, 150, true, false, NOW(), NOW()),

-- New Achievements
('11', 'Coffee Whale', 'Buy Coffee in one chain with over $50.', 'Banknote', 'bg-lime-100', 'text-lime-600', 'single_support', 50, 250, true, true, NOW(), NOW()),
('12', 'Coffee Scholar', 'Completed 10 crypto trivia questions.', 'BookOpenCheck', 'bg-indigo-100', 'text-indigo-600', 'trivia_correct', 10, 100, false, false, NOW(), NOW()),
('13', 'Trivia Fiend', 'Answered 5 trivia questions in a row correctly.', 'Bot', 'bg-cyan-100', 'text-cyan-600', 'trivia_streak', 5, 120, false,false, NOW(), NOW()),
('14', 'Daily Devotion', 'Completed any activity for 14 days straight.', 'Bolt', 'bg-orange-100', 'text-orange-600', 'daily_streak', 14, 200, false,true, NOW(), NOW()),
('15', 'Gas Warrior', 'Sent a tx when gas was over 200 gwei.', 'Flame', 'bg-red-100', 'text-red-600', 'high_gas_tx', 1, 150, false,false, NOW(), NOW()),
('16', 'Diamond Hands', 'Buy Coffee on same chain for 30 days.', 'Gem', 'bg-purple-100', 'text-purple-600', 'repeat_support', 30, 300, true, true, NOW(), NOW()),
('17', 'OG Brewer', 'Was active during the first 3 months of launch.', 'Sparkles', 'bg-yellow-100', 'text-yellow-600', 'founding_activity', 1, 200, true, true, NOW(), NOW()),

-- Daily Activity Achievements
('18', 'Lucky Brewer', 'Won the gas fee lottery 3 times.', 'TicketCheck', 'bg-purple-100', 'text-purple-600', 'lottery_wins', 3, 200, false,false, NOW(), NOW()),
('19', 'Knowledge is Power', 'Reached 100 total correct trivia answers.', 'BookCheck', 'bg-blue-100', 'text-blue-600', 'trivia_correct', 100, 350, true,false, NOW(), NOW()),
('20', 'Crypto Comedian', 'Logged in every day for a week just to reveal the joke.', 'Laugh', 'bg-yellow-100', 'text-yellow-600', 'jokes_revealed', 7, 100, false,false, NOW(), NOW()),
('21', 'Bingo Baller', 'Won 3 games in a week.', 'Grid3x3', 'bg-green-100', 'text-green-600', 'bingo_wins', 3, 150, false,false, NOW(), NOW()),
('22', 'Full House', 'Completed a full card at least once.', 'Grid2x2', 'bg-emerald-100', 'text-emerald-600', 'bingo_full_card', 1, 200, false,false, NOW(), NOW()),
('23', 'Chain Gamer', 'Played 10 games of Rock Paper Scissors.', 'Gamepad', 'bg-teal-100', 'text-teal-600', 'rps_played', 10, 150, false,false, NOW(), NOW()),
('24', 'The Rock', 'Won 3 matches', 'HandRock', 'bg-slate-100', 'text-slate-600', 'rps_3_wins', 3, 150, false,false, NOW(), NOW());
('25', 'RPS Legend', 'Won 10 Rock Paper Scissors matches', 'Hand', 'bg-slate-100', 'text-slate-600', 'rps_10_wins', 10, 250, false, false, NOW(), NOW());



-- Insert daily activities
INSERT INTO daily_activities (name, description, icon_name, icon_bg, icon_color, fee, reward, category, action_text, completed_text)
VALUES
  ('Gas Fee Lottery', 'Pay a fixed fee and get a chance to win accumulated rewards or a special NFT.', 'Ticket', 'bg-purple-100', 'text-purple-600', 0.05, 'Daily prize pool or NFT', 'rewards', 'Enter Lottery', 'Entered Today'),
  ('Crypto Trivia', 'Answer a daily crypto question correctly to earn badges or points.', 'Brain', 'bg-blue-100', 'text-blue-600', 0.05, 'Badges & Points', 'games', 'Answer Question', 'Answered Today'),
  ('Daily Crypto Joke', 'Reveal a daily crypto-themed joke that you can share on social media.', 'Laugh', 'bg-yellow-100', 'text-yellow-600', 0.05, 'Shareable content', 'fun', 'Reveal Joke', 'Joke Revealed'),
  ('Blockchain Bingo', 'Get daily bingo numbers and win rewards for completed rows or cards.', 'Dice', 'bg-green-100', 'text-green-600', 0.05, 'Weekly/monthly prizes', 'games', 'Play Bingo', 'Played Today'),
  ('Crypto Pet', 'Feed your virtual Crypto Cat daily and watch it grow and evolve.', 'Cat', 'bg-orange-100', 'text-orange-600', 0.05, 'Pet collectibles', 'fun', 'Feed Pet', 'Pet Fed Today');
  ('Rock Paper Scissors', 'Play rock paper scissors against the blockchain and win crypto rewards.', 'Hand', 'bg-orange-100', 'text-orange-600', 0.05, 'Double your bet', 'fun', 'Feed Pet', 'Pet Fed Today');
