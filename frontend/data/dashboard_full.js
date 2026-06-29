const DATA = {
  months: ['Ene','Feb','Mar','Abr','May','Jun','Jul'],
  byMonth: [
    {m:1,imp:257,exp:94,vac:104,por:8,loc:0,rev:128960543,cost:5888891},
    {m:2,imp:119,exp:98,vac:38,por:37,loc:37,rev:140663897,cost:5722299},
    {m:3,imp:149,exp:121,vac:74,por:69,loc:19,rev:132859700,cost:5243000},
    {m:4,imp:167,exp:95,vac:89,por:11,loc:1,rev:124626082,cost:4612000},
    {m:5,imp:154,exp:114,vac:58,por:22,loc:15,rev:108055084,cost:4534000},
    {m:6,imp:163,exp:145,vac:44,por:24,loc:4,rev:133104890,cost:5141000},
    {m:7,imp:37,exp:13,vac:0,por:0,loc:0,rev:18243450,cost:465000}
  ],
  topClients: [
    {n:'Nestlé Chile',imp:649,exp:395,vac:0,por:0,rev:493933715,cost:12500000},
    {n:'DYC',imp:81,exp:34,vac:48,por:16,rev:70293300,cost:2100000},
    {n:'Vanadium',imp:0,exp:120,vac:77,por:70,rev:55289800,cost:1800000},
    {n:'Sitrans',imp:68,exp:49,vac:40,por:0,rev:30597801,cost:980000},
    {n:'Perrot Express',imp:72,exp:0,vac:0,por:0,rev:22710000,cost:720000},
    {n:'Medlog',imp:11,exp:58,vac:0,por:0,rev:20636391,cost:650000},
    {n:'Agunsa',imp:62,exp:10,vac:0,por:0,rev:17520000,cost:560000},
    {n:'CMA CGM',imp:0,exp:0,vac:124,por:0,rev:9490000,cost:300000},
    {n:'Sudtrans',imp:32,exp:0,vac:21,por:0,rev:8190000,cost:260000},
    {n:'Margomz',imp:0,exp:0,vac:85,por:0,rev:6350000,cost:200000}
  ],
  drivers: [
    {n:'Rafael Granadillo',p:'JZGX59',trips:220,rev:74913119,cost:2954091},
    {n:'Juan Leiva',p:'KXSP51',trips:179,rev:71312806,cost:2412010},
    {n:'Sofía Zarazola',p:'JJXP47',trips:155,rev:36643740,cost:1990205},
    {n:'Diego Zarazola',p:'JYPW85',trips:112,rev:38348924,cost:1474000},
    {n:'Felipe Muñoz',p:'JZKB11',trips:98,rev:30408365,cost:1216500},
    {n:'Francisco Silva',p:'KXSP52',trips:96,rev:37082551,cost:1288000},
    {n:'Antonio Cabezas',p:'JFBZ97',trips:89,rev:30483453,cost:1247817},
    {n:'Andres Trapp',p:'JXZX18',trips:78,rev:30477613,cost:1082000},
    {n:'Alexis Opazo',p:'JYPW75',trips:73,rev:20667256,cost:897000},
    {n:'Esteban Sandoval',p:'KFLW91',trips:69,rev:20103672,cost:930000}
  ],
  revBreakdown: {flete:2316333708,porteo:310354964,almacenaje:78834600,estadia:133836420,escolta:53960000},
  costConductores: 68906103,
  origenes: [{n:'Medlog SAI',c:478},{n:'DYC SCL',c:297},{n:'Todocontenedor',c:140},{n:'Contopsa SCL',c:133},{n:'Medlog VAP',c:126},{n:'Sitrans SCL',c:78},{n:'DYC La Divisa',c:77},{n:'Contopsa Stgo',c:71}],
  destinos: [{n:'CD Quilicura',c:302},{n:'Alm. Integrales',c:205},{n:'Vanadium',c:193},{n:'CPW Maipú',c:170},{n:'Graneros',c:166},{n:'CIS SAI',c:132},{n:'San Antonio',c:121},{n:'Lampa',c:71}],
  kpis: {
    totalFletes:10492,totalRev:2645006867,ticketProm:377000,
    costoTotal:68906103,margenBruto:2576100764,margenPct:97.4,
    enDeposito:1498,enRutaCli:395,enRutaPto:396,
    gateIn:1479,gateOut:921,rotacion:62,
    vehiculos:72,camionesRuta:25,totalCamiones:51,utilizacion:49,
    clientes:59,personal:212,navieras:29,ramplas:23,
    fletesW27:221,revW27:77574618,fletesW26:237,revW26:78664626
  }
};
