const fs = require('fs');

const rawdata = fs.readFileSync('./functions/dao/places.json', 'utf8');
const places = JSON.parse(rawdata);
const tree = {
  name: 'biblioteca',
  parent: null,
  children: []
};
const parents = ['biblioteca'];

function readNode(parent) {
  console.log(parent.name);
  const place = places[parent.name];
  const connectedRooms = place.connectedRooms || [];
  parent.children = [];
  parent.image = place.media.images[0];
  parent.actions = place.actions.map(el => {
    return el.action + ' ' + (el.object && el.object.name)
  }).join(', ');
  
  connectedRooms.forEach(room => {
    if (!parents.includes(room) && places[room]) {
      parents.push(room);
      parent.children.push(readNode({
        name: room,
        parent
      }));
    }
  });

  return parent;
}

function drawNode(node) {
  let string = `{
    text: { 
      name: "${node.name}",
      actions: "${node.actions}",
    },
    image: '${node.image}',
    children: [
      ${node.children.length ?
        node.children.map(drawNode).join('\n') :
        ''}
    ]
  },`;

  return string;
}

readNode(tree);

let rawOutput = `
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
    
    nodeStructure: ${drawNode(tree)}
  };
`;

fs.writeFileSync('./map/tree-map.js', rawOutput);
