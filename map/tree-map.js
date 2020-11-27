
  var chart_config = {
    chart: {
        container: "#basic-example",
        
        connectors: {
            type: 'step'
        },
        node: {
            HTMLclass: 'nodeExample1'
        }
    },
    
    nodeStructure: {
    text: { 
      name: "biblioteca",
      actions: "leer libro",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/biblioteca.png',
    children: [
      {
    text: { 
      name: "habitación",
      actions: "",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/habitacion.png',
    children: [
      {
    text: { 
      name: "zaguán",
      actions: "examinar escalera, coger escalon",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/zaguan.png',
    children: [
      {
    text: { 
      name: "comedor",
      actions: "examinar pared, coger espada, coger currusco",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/comedor.png',
    children: [
      
    ]
  },
{
    text: { 
      name: "cocina",
      actions: "abrir alacena, examinar alacena, coger llave",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/cocina.png',
    children: [
      {
    text: { 
      name: "despensa",
      actions: "abrir baúl, coger armadura, poner armadura",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/despensa.png',
    children: [
      
    ]
  },
    ]
  },
{
    text: { 
      name: "portalón",
      actions: "abrir puerta",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/portalon.png',
    children: [
      {
    text: { 
      name: "argamasilla",
      actions: "leer bando",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/argamasilla.png',
    children: [
      {
    text: { 
      name: "calles",
      actions: "coger rastrillo",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/calles.png',
    children: [
      {
    text: { 
      name: "campos",
      actions: "",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/campos.png',
    children: [
      {
    text: { 
      name: "venta",
      actions: "",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/venta.png',
    children: [
      {
    text: { 
      name: "recibidor",
      actions: "",
    },
    image: 'undefined',
    children: [
      {
    text: { 
      name: "distribuidor",
      actions: "arreglar cerradura",
    },
    image: 'undefined',
    children: [
      {
    text: { 
      name: "alcoba",
      actions: "descansar undefined",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/venta_dormitorio.png',
    children: [
      
    ]
  },
{
    text: { 
      name: "patio",
      actions: "velar armas",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/Patio-venta.png',
    children: [
      
    ]
  },
    ]
  },
{
    text: { 
      name: "salón",
      actions: "examinar cesto, coger alambre",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/Salon-venta.png',
    children: [
      
    ]
  },
    ]
  },
{
    text: { 
      name: "prados",
      actions: "atacar ovejas",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/prados.png',
    children: [
      {
    text: { 
      name: "cancela",
      actions: "cruzar cancela",
    },
    image: 'undefined',
    children: [
      
    ]
  },
    ]
  },
    ]
  },
{
    text: { 
      name: "acantilado",
      actions: "colocar escalón, saltar acantilado",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/acantilado.png',
    children: [
      {
    text: { 
      name: "bosque",
      actions: "coger pedrusco",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/bosque_oscuro.png',
    children: [
      
    ]
  },
    ]
  },
    ]
  },
    ]
  },
{
    text: { 
      name: "arco",
      actions: "",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/arco.png',
    children: [
      {
    text: { 
      name: "arboleda",
      actions: "examinar suelo, coger níscalo",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/arboleda.png',
    children: [
      {
    text: { 
      name: "manzano",
      actions: "golpear manzano, coger manzana",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/manzano.png',
    children: [
      {
    text: { 
      name: "pinar",
      actions: "examinar suelo, coger amanita",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/bosque.png',
    children: [
      {
    text: { 
      name: "posada",
      actions: "llamar puerta",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/posada.png',
    children: [
      {
    text: { 
      name: "muro",
      actions: "colocar pedrusco, subir pedrusco, escalar muro",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/muro.png',
    children: [
      
    ]
  },
{
    text: { 
      name: "recepción",
      actions: "",
    },
    image: 'undefined',
    children: [
      {
    text: { 
      name: "escalera",
      actions: "examinar candelabro, coger vela",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/escaleras.png',
    children: [
      {
    text: { 
      name: "rellano",
      actions: "",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/posada_rellano.png',
    children: [
      {
    text: { 
      name: "bodega",
      actions: "abrir odre, golpear odre, coger vino, beber vino",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/bodega.png',
    children: [
      
    ]
  },
{
    text: { 
      name: "dormitorio",
      actions: "coger martillo",
    },
    image: 'https://raw.githubusercontent.com/next-francisconavarro/hci-quijote/develop/images/posada_dormitorio.png',
    children: [
      
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
    ]
  },
  };
