/**
 * btcday.shop 
 * Main JavaScript for live price tracking and interactive features.
 */

async function fetchBitcoinPrice() {
    const priceElement = document.getElementById('btc-price');
    const changeElement = document.getElementById('btc-change');
    
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        if (data.bitcoin) {
            const price = data.bitcoin.usd;
            const change = data.bitcoin.usd_24h_change;
            
            // Format currency
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            priceElement.textContent = formatter.format(price);
            
            // Formatting change percentage
            const sign = change >= 0 ? '+' : '';
            changeElement.textContent = `(${sign}${change.toFixed(2)}%)`;
            changeElement.style.color = change >= 0 ? '#10b981' : '#ef4444';
        }
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        if (priceElement) {
            priceElement.textContent = 'Loading...';
        }
    }
}

// Update price every 60 seconds
setInterval(fetchBitcoinPrice, 60000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchBitcoinPrice();
    
    // Add scroll reveal animations for cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
