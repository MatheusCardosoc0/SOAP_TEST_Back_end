import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.post('/get-countries', async (req, res) => {
    const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';

    const xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
    <soapenv:Body>
    <web:ListOfCountryNamesByName/>
    </soapenv:Body>
 </soapenv:Envelope>`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=utf-8',
                'SOAPAction': 'http://www.oorsprong.org/websamples.countryinfo/ListOfCountryNamesByName',
            },
            body: xmls,
        });

        const data = await response.text();
        res.send(data);

    } catch (error) {
        console.error('Erro na requisição SOAP', error);
        res.status(500).send(error.toString());
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
