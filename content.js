chrome.storage.sync.get(['year', 'location', 'siteType'], function(data) {
    let yearFilter = data.year;
    let locationFilter = data.location;
    let siteTypeFilter = data.siteType;

    let results = document.querySelectorAll('.g'); // Google search results

    results.forEach(result => {
        let link = result.querySelector('a'); // Link to the website
        let snippet = result.querySelector('.st'); // Snippet under the link

        if (link && snippet) {
            let displayResult = true;

            // Apply year filter
            if (yearFilter) {
                let yearMatch = snippet.innerText.match(/\d{4}/); // Try to extract the year
                if (yearMatch && parseInt(yearMatch[0]) < parseInt(yearFilter)) {
                    displayResult = false;
                }
            }

            // Apply location filter
            if (locationFilter && !snippet.innerText.toLowerCase().includes(locationFilter.toLowerCase())) {
                displayResult = false;
            }

            // Apply site type filter
            if (siteTypeFilter) {
                let href = link.href.toLowerCase();
                if (siteTypeFilter === 'blog' && !href.includes('blog')) {
                    displayResult = false;
                } else if (siteTypeFilter === 'news' && !href.includes('news')) {
                    displayResult = false;
                } else if (siteTypeFilter === 'portfolio' && !href.includes('portfolio')) {
                    displayResult = false;
                } else if (siteTypeFilter === 'ecommerce' && !href.includes('shop')) {
                    displayResult = false;
                } else if (siteTypeFilter === 'forum' && !href.includes('forum')) {
                    displayResult = false;
                }
            }

            // Hide the result if it doesn't match the filters
            if (!displayResult) {
                result.style.display = 'none';
            }
        }
    });
});
