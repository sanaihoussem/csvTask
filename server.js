const csv = require('csv-parser');  
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
const csvWriter = createCsvWriter({  
  path: 'result.csv',
  header: [
    {id: 'email', title: 'Email'},
  ]
});


const data = [];

const validDomains = ['web.de','t-online.de','gmail.com'];

fs.createReadStream('votes.csv')  
  .pipe(csv())
  .on('data', (row) => {
	if ( row.country.toString() == "brazil" && validDomains.indexOf(row.email.slice(row.email.indexOf('@')+1) ) > -1  ){
		data.push({email: row.email})
	}
  })
  .on('end', () => {
    console.log('End of file');
	csvWriter  
	  .writeRecords(data)
	  .then(()=> console.log('Result saved'));
  });

