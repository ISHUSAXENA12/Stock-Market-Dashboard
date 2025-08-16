-- Seed script to populate the database with initial data
-- This would be used in production with real database

-- Insert companies
INSERT INTO companies (symbol, name, sector, market_cap) VALUES
('RELIANCE', 'Reliance Industries Ltd', 'Oil & Gas', 1660000000000),
('TCS', 'Tata Consultancy Services', 'Information Technology', 1380000000000),
('INFY', 'Infosys Limited', 'Information Technology', 650000000000),
('HDFCBANK', 'HDFC Bank Limited', 'Banking', 1270000000000),
('ICICIBANK', 'ICICI Bank Limited', 'Banking', 760000000000),
('HINDUNILVR', 'Hindustan Unilever Ltd', 'FMCG', 550000000000),
('ITC', 'ITC Limited', 'FMCG', 570000000000),
('SBIN', 'State Bank of India', 'Banking', 700000000000),
('BHARTIARTL', 'Bharti Airtel Limited', 'Telecommunications', 680000000000),
('ASIANPAINT', 'Asian Paints Limited', 'Paints', 330000000000),
('MARUTI', 'Maruti Suzuki India Ltd', 'Automobile', 340000000000),
('WIPRO', 'Wipro Limited', 'Information Technology', 310000000000)
ON CONFLICT (symbol) DO NOTHING;

-- Insert current stock prices
INSERT INTO stock_prices (company_id, price, change_amount, change_percent, volume, high_52_week, low_52_week)
SELECT 
    c.id,
    CASE c.symbol
        WHEN 'RELIANCE' THEN 2456.75
        WHEN 'TCS' THEN 3789.20
        WHEN 'INFY' THEN 1567.45
        WHEN 'HDFCBANK' THEN 1678.90
        WHEN 'ICICIBANK' THEN 1089.65
        WHEN 'HINDUNILVR' THEN 2345.80
        WHEN 'ITC' THEN 456.75
        WHEN 'SBIN' THEN 789.45
        WHEN 'BHARTIARTL' THEN 1234.60
        WHEN 'ASIANPAINT' THEN 3456.25
        WHEN 'MARUTI' THEN 11234.50
        WHEN 'WIPRO' THEN 567.80
    END as price,
    CASE c.symbol
        WHEN 'RELIANCE' THEN 23.45
        WHEN 'TCS' THEN -45.80
        WHEN 'INFY' THEN 12.30
        WHEN 'HDFCBANK' THEN 8.75
        WHEN 'ICICIBANK' THEN -15.20
        WHEN 'HINDUNILVR' THEN 34.50
        WHEN 'ITC' THEN -2.85
        WHEN 'SBIN' THEN 18.90
        WHEN 'BHARTIARTL' THEN -8.40
        WHEN 'ASIANPAINT' THEN 67.80
        WHEN 'MARUTI' THEN -123.75
        WHEN 'WIPRO' THEN 4.25
    END as change_amount,
    CASE c.symbol
        WHEN 'RELIANCE' THEN 0.96
        WHEN 'TCS' THEN -1.19
        WHEN 'INFY' THEN 0.79
        WHEN 'HDFCBANK' THEN 0.52
        WHEN 'ICICIBANK' THEN -1.38
        WHEN 'HINDUNILVR' THEN 1.49
        WHEN 'ITC' THEN -0.62
        WHEN 'SBIN' THEN 2.45
        WHEN 'BHARTIARTL' THEN -0.68
        WHEN 'ASIANPAINT' THEN 2.00
        WHEN 'MARUTI' THEN -1.09
        WHEN 'WIPRO' THEN 0.75
    END as change_percent,
    FLOOR(RANDOM() * 10000000 + 1000000) as volume,
    CASE c.symbol
        WHEN 'RELIANCE' THEN 2856.15
        WHEN 'TCS' THEN 4259.75
        WHEN 'INFY' THEN 1953.90
        WHEN 'HDFCBANK' THEN 1794.25
        WHEN 'ICICIBANK' THEN 1257.80
        WHEN 'HINDUNILVR' THEN 2844.95
        WHEN 'ITC' THEN 502.75
        WHEN 'SBIN' THEN 912.75
        WHEN 'BHARTIARTL' THEN 1549.90
        WHEN 'ASIANPAINT' THEN 3750.05
        WHEN 'MARUTI' THEN 13680.00
        WHEN 'WIPRO' THEN 659.85
    END as high_52_week,
    CASE c.symbol
        WHEN 'RELIANCE' THEN 2220.30
        WHEN 'TCS' THEN 3311.00
        WHEN 'INFY' THEN 1351.65
        WHEN 'HDFCBANK' THEN 1363.55
        WHEN 'ICICIBANK' THEN 951.10
        WHEN 'HINDUNILVR' THEN 2172.00
        WHEN 'ITC' THEN 387.60
        WHEN 'SBIN' THEN 543.20
        WHEN 'BHARTIARTL' THEN 900.25
        WHEN 'ASIANPAINT' THEN 2671.05
        WHEN 'MARUTI' THEN 9737.65
        WHEN 'WIPRO' THEN 385.05
    END as low_52_week
FROM companies c;

-- Note: Historical data would be populated by a separate script or data import process
-- as it requires generating 30+ days of data for each company
