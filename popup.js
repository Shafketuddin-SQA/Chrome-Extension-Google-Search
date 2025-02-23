document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('query').value;
    const year = document.getElementById('year').value;
    const location = document.getElementById('location').value;
    const siteType = document.getElementById('siteType').value;

    // Save the search parameters to Chrome storage
    chrome.storage.sync.set({ query, year, location, siteType }, function() {
        console.log('Search parameters saved.');
    });

    // Trigger the content script to execute the search
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: applyFilters // Call the content script function to apply filters
        });
    });
});

// This function will be executed within the content script (in the active tab)
function applyFilters() {
    chrome.storage.sync.get(['query', 'year', 'location', 'siteType'], function(data) {
        let searchQuery = data.query;

        // Add the year filter to the search query
        if (data.year) {
            searchQuery += ` before:${data.year}`;
        }

        // Add the location filter to the search query (assuming location is part of the query)
        if (data.location) {
            searchQuery += ` location:${data.location}`;
        }

        // Add the site type to the search query (assuming site type filters by URL content)
        if (data.siteType) {
            if (data.siteType === 'blog') {
                searchQuery += ` inurl:blog`;
            } else if (data.siteType === 'news') {
                searchQuery += ` inurl:news`;
            } else if (data.siteType === 'portfolio') {
                searchQuery += ` inurl:portfolio`;
            } else if (data.siteType === 'ecommerce') {
                searchQuery += ` inurl:shop`;
            } else if (data.siteType === 'forum') {
                searchQuery += ` inurl:forum`;
            }
        }

        // Redirect to Google with the constructed search query
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    });
}
