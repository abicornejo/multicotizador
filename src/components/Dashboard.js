import React, { useState, useEffect } from 'react';
import { FullCalendar } from '@fullcalendar/react'
//import { FullCalendar } from 'primereact/fullcalendar';
//import { Calendar } from '@fullcalendar/core';

import axios from 'axios';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// import dayGridPlugin from '@fullcalendar/daygrid'
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ProductService } from '../service/ProductService';
import { EventService } from '../service/EventService';
//var soap = require('soap');
//import * as soap  from '';
//import soap from 'soap';
//const soap = require('soap');
const dropdownCities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];

// const options = {
//     plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
//     defaultDate: '2019-01-01',
//     header: {
//         left: 'prev,next',
//         center: 'title',
//         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//     },
//     editable: true
// };

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860'
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e'
        }
    ]
};

export const Dashboard = () => {

    const [tasksCheckbox, setTasksCheckbox] = useState([]);
    const [dropdownCity, setDropdownCity] = useState(null);
    const [events, setEvents] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const productService = new ProductService();
        const eventService = new EventService();
        productService.getProductsSmall().then(data => setProducts(data));
        eventService.getEvents().then(data => setEvents(data));
        soapCall();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onTaskCheckboxChange = (e) => {
        let selectedTasks = [...tasksCheckbox];
        if (e.checked)
            selectedTasks.push(e.value);
        else
            selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

        setTasksCheckbox(selectedTasks);
    };
    const soapCall = () => {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'https://serviciosgs.mx:443/gsautos-ws/soap/autenticacionWS?wsdl', true);
        xmlhttp.withCredentials = true;
        // build SOAP request
        var sr =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soapenv:Envelope ' +
            'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
            'xmlns:com="http://com.gs.gsautos.ws.autenticacion">' +
            '<soapenv:Header/>'+
        '<soapenv:Body>' +
                '<com:obtenerToken>' +
                    '<arg0>' +
                        '<password>2r2kGdeUA0</password>' +
                        '<usuario>ATC0</usuario>' +
                    '</arg0>' +
            '   </com:obtenerToken>' +
            '</soapenv:Body>' +
            '</soapenv:Envelope>';

        xmlhttp.onreadystatechange = function () {debugger;
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    alert('done. use firebug/console to see network response');
                }
            }
        }
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
        xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
        // send request
    }
    const soapCallr1 = () => {

        var symbol = "MSFT";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://www.webservicex.net/stockquote.asmx?op=GetQuote",true);
        xmlhttp.onreadystatechange=function() {debugger;
            if (xmlhttp.readyState == 4) {
                alert(xmlhttp.responseText);
                // http://www.terracoder.com convert XML to JSON
                // var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
                // var result = json.Body[0].GetQuoteResponse[0].GetQuoteResult[0].Text;
                // // Result text is escaped XML string, convert string to XML object then convert to JSON object
                // json = XMLObjectifier.xmlToJSON(XMLObjectifier.textToXML(result));
                // alert(symbol + ' Stock Quote: $' + json.Stock[0].Last[0].Text);
            }
        }
        xmlhttp.setRequestHeader("SOAPAction", "http://www.webserviceX.NET/GetQuote");
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        var xml = '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
            'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<soap:Body> ' +
            '<GetQuote xmlns="http://www.webserviceX.NET/"> ' +
            '<symbol>' + symbol + '</symbol> ' +
            '</GetQuote> ' +
            '</soap:Body> ' +
            '</soap:Envelope>';
        xmlhttp.send(xml);

        // var url = 'http://example.com/wsdl?wsdl';
        // //var args = {name: 'value'};
        // var args = {name: 'value'};
        // soap.createClient(url, function(err, client) {
        //     client.MyFunction(args, function(err, result) {
        //         console.log(result);
        //     });
        // });

            // let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
            //                     xmlns:com="http://com.gs.gsautos.ws.autenticacion/">\
            //     <soapenv:Header/>\
            //     <soapenv:Body>\
            //       <com:obtenerToken>\
            //         <arg0>\
            //             <password>2r2kGdeUA0</password>\
            //             <usuario>ATC0</usuario>\
            //         </arg0>\
            //       </com:obtenerToken>\
            //     </soapenv:Body>\
            //   </soapenv:Envelope>';
            //
            // axios.post('https://serviciosgs.mx:443/gsautos-ws/soap/autenticacionWS',
            //     xmls,
            //     {headers:
            //             {'Content-Type': 'text/xml'}
            //     }).then(res=>{
            //         debugger;
            //     console.log(res);
            // }).catch(err=>{
            //     debugger;
            //     console.log(err);
            // });


            // var xmlhttp = new XMLHttpRequest();
            // xmlhttp.open('GET', 'https://serviciosgs.mx:443/gsautos-ws/soap/autenticacionWS', true);

           //  xmlhttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
           // xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/Consulta");



            // var sr =
            //     '<?xml version="1.0" encoding="utf-8"?>' +
            //     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://com.gs.gsautos.ws.autenticacion">'+
            //     '<soapenv:Header/>' +
            //     '<soapenv:Body>' +
            //     '<com:obtenerToken><arg0>' +
            //     '<password>2r2kGdeUA0</password>' +
            //     '<usuario>ATC0</usuario>' +
            //     '</arg0></com:obtenerToken>' +
            //     '</soapenv:Body>' +
            //     '</soapenv:Envelope>';
            //
            // xmlhttp.onreadystatechange = function () {debugger;
            //     if (xmlhttp.readyState === 4) {
            //         if (xmlhttp.status === 200) {
            //             alert(xmlhttp.responseText);
            //             // alert('done. use firebug/console to see network response');
            //         }
            //     }
            // }
            // Send the POST request
            // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            // xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            // xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
            // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            // xmlhttp.send(sr);

        // var xmlhttp = new XMLHttpRequest();
        // xmlhttp.open('POST', 'https://serviciosgs.mx:443/gsautos-ws/soap/autenticacionWS', true);
        //
        // // build SOAP request
        // var sr =
        //     '<?xml version="1.0" encoding="utf-8"?>' +
        //     '<soapenv:Envelope ' +
        //     'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        //     'xmlns:api="http://com.gs.gsautos.ws.autenticacion" ' +
        //     'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
        //     'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
        //     '<soapenv:Body>' +
        //         '<com:obtenerToken><arg0>' +
        //         '<password>2r2kGdeUA0</password>' +
        //         '<usuario>ATC0</usuario>' +
        //         '</arg0></com:obtenerToken>' +
        //     '</soapenv:Body>' +
        //     '</soapenv:Envelope>';
        //
        // xmlhttp.onreadystatechange = function () {debugger;
        //     if (xmlhttp.readyState === 4) {
        //         if (xmlhttp.status === 200) {
        //             alert('done. use firebug/console to see network response');
        //         }
        //     }
        // }
        // // Send the POST request
        // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        // xmlhttp.send(sr);
        // send request


    }

    // const soapCall = () => {
    //

    //
    //     // var xmlhttp = new XMLHttpRequest();
    //     // xmlhttp.open('POST', 'https://serviciosgs.mx:443/gsautos-ws/soap/autenticacionWS', true);
    //     //
    //     // xmlhttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8");
    //    // xmlhttp.setRequestHeader("SOAPAction", "http://tempuri.org/Consulta");
    //

    //
    //     // var sr =
    //     //     '<?xml version="1.0" encoding="utf-8"?>' +
    //     //     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:com="http://com.gs.gsautos.ws.autenticacion">'+
    //     //     '<soapenv:Header/>' +
    //     //     '<soapenv:Body>' +
    //     //     '<com:obtenerToken><arg0>' +
    //     //     '<password>2r2kGdeUA0</password>' +
    //     //     '<usuario>ATC0</usuario>' +
    //     //     '</arg0></com:obtenerToken>' +
    //     //     '</soapenv:Body>' +
    //     //     '</soapenv:Envelope>';
    //     //
    //     // xmlhttp.onreadystatechange = function () {debugger;
    //     //     if (xmlhttp.readyState === 4) {
    //     //         if (xmlhttp.status === 200) {
    //     //             alert(xmlhttp.responseText);
    //     //             // alert('done. use firebug/console to see network response');
    //     //         }
    //     //     }
    //     // }
    //     // // Send the POST request
    //     // xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    //     // xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
    //     // xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
    //     // xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    //     // xmlhttp.send(sr);
    //     // send request
    //     // ...
    //
    //     // var xmlhttp = new XMLHttpRequest();
    //     // xmlhttp.open("POST", "http://com.gs.gsautos.ws.autenticacion/AutenticacionWS/obtenerTokenRequest",true);
    //     // xmlhttp.onreadystatechange=function() {
    //     //     if (xmlhttp.readyState === 4) {
    //     //         alert(xmlhttp.responseText);
    //     //         // http://www.terracoder.com convert XML to JSON
    //     //         var json = XMLObjectifier.xmlToJSON(xmlhttp.responseXML);
    //     //         var result = json.Body[0].GetQuoteResponse[0].GetQuoteResult[0].Text;
    //     //         // Result text is escaped XML string, convert string to XML object then convert to JSON object
    //     //         json = XMLObjectifier.xmlToJSON(XMLObjectifier.textToXML(result));
    //     //         alert(symbol + ' Stock Quote: $' + json.Stock[0].Last[0].Text);
    //     //     }
    //     // }
    //     // xmlhttp.setRequestHeader("SOAPAction", "http://www.webserviceX.NET/GetQuote");
    //     // xmlhttp.setRequestHeader("Content-Type", "text/xml");
    //     // var xml = '<?xml version="1.0" encoding="utf-8"?>' +
    //     //     '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    //     //     'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
    //     //     'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    //     //     '<soap:Body> ' +
    //     //     '<GetQuote xmlns="http://www.webserviceX.NET/"> ' +
    //     //     '<symbol>' + symbol + '</symbol> ' +
    //     //     '</GetQuote> ' +
    //     //     '</soap:Body> ' +
    //     //     '</soap:Envelope>';
    //     // xmlhttp.send(xml);
    //
    //
    // }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6">
                    <table className="table text-center fondoAzul text-white">
                        <thead>
                        <tr>
                            <th className="font-weight-bold h3 removeBorder" colSpan="4" scope="col">Paquetes</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="removeBorder">Integral</td>
                            <td className="removeBorder">Amplia</td>
                            <td className="removeBorder">Limitada</td>
                            <td className="removeBorder">RC</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src="assets/layout/images/logo_ana.jpg" className="img-fluid mx-auto d-block" alt="LOGO EMPRESA" />
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Descuento</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01">
                                    <option selected>Selecciona...</option>
                                    <option value="1">20%</option>
                                    <option value="2">30%</option>
                                    <option value="3">40%</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="fas fa-sticky-note fa-lg"></i></a>
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="far fa-list-alt fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <table className="table">
                        <tbody>
                        <tr className="font-weight-bold">
                            <td className="text-dark border1">No configurado</td>
                            <td className="text-center numeroAzul border1">$9,211</td>
                            <td className="text-center numeroAzul border1">$4,791</td>
                            <td className="text-center numeroAzul border1">$3752</td>
                        </tr>
                        <tr className=" align-middle">
                            <td className="auto text-secondary border1" colSpan="4">FORD FIGO ENERGY STD 4PTAS <a
                                href="#" className="btn btn-sm float-right bg-warning text-white" role="button"
                                aria-pressed="true"><i className="fas fa-pencil-alt fa-lg"></i></a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src="assets/layout/images/logo_afirme.jpg" className="img-fluid" alt="LOGO EMPRESA" />
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Descuento</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01">
                                    <option selected>Selecciona...</option>
                                    <option value="1">20%</option>
                                    <option value="2">30%</option>
                                    <option value="3">40%</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="fas fa-sticky-note fa-lg"></i></a>
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="far fa-list-alt fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <table className="table">
                        <tbody>
                        <tr className="font-weight-bold">
                            <td className="text-dark border1">No configurado</td>
                            <td className="text-center numeroAzul border1">$9,211</td>
                            <td className="text-center numeroAzul border1">$4,791</td>
                            <td className="text-center numeroAzul border1">$3752</td>
                        </tr>
                        <tr className=" align-middle">
                            <td className="auto text-secondary border1" colSpan="4">FORD FIGO ENERGY STD 4PTAS <a
                                href="#" className="btn btn-sm float-right bg-warning text-white" role="button"
                                aria-pressed="true"><i className="fas fa-pencil-alt fa-lg"></i></a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src="assets/layout/images/logo_qualitas.jpg" className="img-fluid" alt="LOGO EMPRESA"/>
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Descuento</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01">
                                    <option selected>Selecciona...</option>
                                    <option value="1">20%</option>
                                    <option value="2">30%</option>
                                    <option value="3">40%</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="fas fa-sticky-note fa-lg"></i></a>
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="far fa-list-alt fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <table className="table">
                        <tbody>
                        <tr className="font-weight-bold">
                            <td className="text-dark border1">No configurado</td>
                            <td className="text-center numeroAzul border1">$9,211</td>
                            <td className="text-center numeroAzul border1">$4,791</td>
                            <td className="text-center numeroAzul border1">$3752</td>
                        </tr>
                        <tr className=" align-middle">
                            <td className="auto text-secondary border1" colSpan="4">FORD FIGO ENERGY STD 4PTAS <a
                                href="#" className="btn btn-sm float-right bg-warning text-white" role="button"
                                aria-pressed="true"><i className="fas fa-pencil-alt fa-lg"></i></a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src="assets/layout/images/logo_banorte.jpg" className="img-fluid" alt="LOGO EMPRESA"/>
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Descuento</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01">
                                    <option selected>Selecciona...</option>
                                    <option value="1">20%</option>
                                    <option value="2">30%</option>
                                    <option value="3">40%</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="fas fa-sticky-note fa-lg"></i></a>
                            <a href="#" className="btn ml-4 mr-4 bg-info text-white" role="button"
                               aria-pressed="true"><i className="far fa-list-alt fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <table className="table">
                        <tbody>
                        <tr className="font-weight-bold">
                            <td className="text-dark border1">No configurado</td>
                            <td className="text-center numeroAzul border1">$9,211</td>
                            <td className="text-center numeroAzul border1">$4,791</td>
                            <td className="text-center numeroAzul border1">$3752</td>
                        </tr>
                        <tr className=" align-middle">
                            <td className="auto text-secondary border1" colSpan="4">FORD FIGO ENERGY STD 4PTAS <a
                                href="#" className="btn btn-sm float-right bg-warning text-white" role="button"
                                aria-pressed="true"><i className="fas fa-pencil-alt fa-lg"></i></a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
);
}
