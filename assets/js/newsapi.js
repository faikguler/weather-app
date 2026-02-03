// https://newsapi.org/v2/top-headlines?country=us&apiKey=1d94732338544aee851c1996fe6931be
   
// Configuration
const NEWS_API_KEY = '1d94732338544aee851c1996fe6931be'; 
const COUNTRY = 'us';
const API_URL = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${NEWS_API_KEY}`;

// Function to fetch and display the last 10 news articles
async function fetchLast10News() {
    try {
        console.log('latest news');

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'ok' && data.articles.length > 0) {
            console.log(`Success! Found ${data.totalResults} articles. Showing the last 10:\n`);
            
            // last 10 articles
            const last10Articles = data.articles.slice(0, 10);
            
            // Display each article
            last10Articles.forEach((article, index) => {
                console.log(`${index + 1}. ${article.title}`);
                console.log(`Source: ${article.source.name}`);
                console.log(`URL: ${article.url}`);
                console.log(`Published: ${new Date(article.publishedAt).toLocaleDateString()}`);
                console.log('----------------------');
            });
        } else {
            console.log('No news found.');
        }

    } catch (error) {
        console.error('Failed to fetch news:', error.message);
    }
}

fetchLast10News();