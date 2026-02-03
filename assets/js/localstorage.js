function addRecord(newText) {
    // Get existing records from LocalStorage
    let records = JSON.parse(localStorage.getItem('lastRecords')) || [];
    
    const newRecord = {
        id: Date.now(), // Unique ID
        text: newText,
        date: new Date().toLocaleString()
    };

    // Add to beginning (newest first)
    records.unshift(newRecord);
    
    // last 10 records
    records = records.slice(0, 10);
    
    // Save to LocalStorage  
    localStorage.setItem('lastRecords', JSON.stringify(records));
    
    return records;
}

function getRecords() {
    return JSON.parse(localStorage.getItem('lastRecords')) || [];
}


function clearRecords() {
    localStorage.removeItem('lastRecords');
    return [];
}

// 4. Show records in console
function showRecords() {
    const records = getRecords();
    
    console.log('LAST RECORDS:');
    
    if (records.length === 0) {
        console.log('No records yet');
    } else {
        records.forEach((record, index) => {
            console.log(`${index + 1}. ${record.text} - ${record.date}`);
        });
    }    
}

showRecords();

const allRecords = getRecords();
console.log(allRecords);
