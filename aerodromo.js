const axios = require('axios');
const {parseString} = require('xml2js');

let ConsultarAerodromo = (icao) => {  
  let apiKey = '1975992905';
  let apiPass = 'b9847af1-a47e-11e7-a836-00505680c1b4';
  let url = 'http://www.aisweb.aer.mil.br/api/?apiKey=' + apiKey + '&apiPass=' + apiPass + '&area=';

  // Consulta do TAR e METAR
  axios({
    method: 'get',
    url: url + 'met&icaoCode=' + icao,
    responseType: 'xml'
  }).then(metRes => {
    // Consulta das cartas
    axios({
      method: 'get',
      url: url + 'cartas&icaoCode=' + icao,
      responseType: 'xml'
    }).then(cartasRes => { 
      // Consulta sobre o Sol
      axios({
        method: 'get',
        url: url + 'sol&icaoCode=' + icao,
        responseType: 'xml'
      }).then(solRes => {          
        // Conversão dos dados obtidos em xml textual para objetos com tratamento de erro        
        parseString(solRes.data, (err, resultSol) => {    
          if(err)
            console.log('Erro ao extrair dados sobre condições climáticas do aeródromo.');
          else
          {
            parseString(metRes.data, (err, resultMet) => {              
              if(err)
                console.log('Erro ao extrair dados de TAF e METAR do aeródromo.');  
              else
              {
                parseString(cartasRes.data, (err, resultCartas) => {
                  if(err)
                    console.log('Erro ao extrair dados das cartas do aeródromo.');                    
                  else{                           
                    // Exibe algumas informações solicitadas                                           
                    console.log('Informações sobre o aeródromo', icao);
                    console.log('Horário do nascer do sol hoje: ', resultSol.aisweb.day[0].sunrise[0]);
                    console.log('Horário do por do sol hoje: ', resultSol.aisweb.day[0].sunset[0]); 
                    console.log('METAR: ', resultMet.aisweb.met[0].metar[0]);
                    console.log('TAF: ', resultMet.aisweb.met[0].taf[0]);
                    for(let i = 0; i < resultCartas.aisweb.cartas[0].item.length; i++){
                      console.log('Carta', resultCartas.aisweb.cartas[0].item[i].nome[0]);
                      console.log('Link', resultCartas.aisweb.cartas[0].item[i].link[0]);
                      console.log('-------------------------------------------------------');
                    }
                  }
                });                  
              }
            });                       
          }
        });
      });
    });
  }).catch(err => console.log('Aeródrom não identificado no servidor.'));
}

module.exports = {
  ConsultarAerodromo
}
