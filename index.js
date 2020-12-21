


const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020';

axios.get(url)
  .then(response => {
    let html = response.data;
    console.log(getPublicationDate(html));
	
	console.log(getBiddingDate(html));
	
	console.log(getObject(html));
	
console.log(getAlllinks(html));
 
	
  })
  .catch(error => {
    console.log(error);
  })

  export let getPublicationDate = html => {
	 const $ = cheerio.load(html);
   txt1 = $('.lbl-licitacao:nth-child(1)').text()
  return txt1;
}

export let getBiddingDate = html => {
	 const $ = cheerio.load(html);
   txt1 = $('.lbl-licitacao:nth-last-child(6)').text()
  return txt1;
}

export let getObject = html => {
const $ = cheerio.load(html);
   txt1 = $('.views-field span > .lbl-licitacao:nth-child(4)').text()
   txt2 = $('.views-field span > p:first-of-type').text()
   
     var txt = txt1.concat(txt2);
  return txt;
}

export let getAlllinks = html => {
	const $ = cheerio.load(html);
  data = [];
   $('.block-content').each((i, elem) => {
  data.push({
      link : $(elem).find('a').attr('href')        

    });
	
	
	
  });
  
 
  return data;
}


document.querySelector("h1").innerHTML = txt1;








