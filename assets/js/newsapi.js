// https://newsapi.org/v2/top-headlines?country=us&apiKey=1d94732338544aee851c1996fe6931be
// https://newsapi.org/v2/everything?q=technology&apiKey=1d94732338544aee851c1996fe6931be
// https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${NEWS_API_KEY}

// Configuration
const NEWS_API_KEY = '1d94732338544aee851c1996fe6931be'; 
const COUNTRY = 'us';
const API_URL = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${NEWS_API_KEY}`;
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

// Function to fetch and display the last 10 news articles
async function fetchLast10News() {
    try {
        console.log('latest news');

        //const response = await fetch(API_URL);
        const response = await fetch(CORS_PROXY + encodeURIComponent(API_URL));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //const data = await response.json();

        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents); 

        const newsContainer = document.getElementById('news-container');

        if (data.status === 'ok' && data.articles.length > 0) {
            console.log(`Success! Found ${data.totalResults} articles. Showing the last 10:\n`);
            
            // last 10 articles
            const last10Articles = data.articles.slice(0, 10);

            newsContainer.innerHTML = '';
            
            const row = document.createElement('div');
            row.className = 'row';




            // Display each article
            last10Articles.forEach((article, index) => {
                /*
                console.log(`${index + 1}. ${article.title}`);
                console.log(`Source: ${article.source.name}`);
                console.log(`URL: ${article.url}`);
                console.log(`URLToImg: ${article.urlToImage}`);
                console.log(`Published: ${new Date(article.publishedAt).toLocaleDateString()}`);
                console.log('----------------------');
                */
                const col = document.createElement('div');
                col.className='col-md-4';

                const card = document.createElement('div');
                card.className='card h-100';

                const img = document.createElement('img');
                img.style.height ='200px';
                img.style.objectFit = 'cover';

                img.src= article.urlToImage || 'assets/images/noimage.jpg'; // Sometimes some data problem
                img.alt = article.title  || 'No Title';


                const cardbody = document.createElement('div');
                cardbody.className='card-body';

                const title = document.createElement('h5');
                title.className = 'card-title';
                title.textContent = article.title || 'No Title';

                const description = document.createElement('p');
                description.className = 'card-text';
                description.textContent = article.description || 'No Description Maybe broken link';


                const readmore = document.createElement('a');
                readmore.className = 'btn btn-primary mt-3';
                readmore.href = article.url;
                readmore.target = '_blank';
                readmore.textContent = 'Read More';


                const publishDate = document.createElement('p');
                publishDate.className = 'card-text text-muted small mt-2';
                publishDate.textContent = `Published: ${new Date(article.publishedAt).toLocaleDateString()}`;                



                cardbody.appendChild(title);
                cardbody.appendChild(description);
                cardbody.appendChild(readmore);
                cardbody.appendChild(publishDate); 
                
                
                card.appendChild(img);
                card.appendChild(cardbody);
                col.appendChild(card);
                row.appendChild(col);                
            });
            newsContainer.appendChild(row);
        } else {
            //console.log('No news found.');
            newsContainer.innerHTML = '<div class="col-12 text-center"><p>No news found.</p></div>';
        }
    } catch (error) {
       // console.error('Failed to fetch news:', error.message);
       document.getElementById('news-container').innerHTML =`<div class="col-12 text-center"><p>Failed to fetch news. Please try again later.</p></div>`;
    }
}

fetchLast10News();