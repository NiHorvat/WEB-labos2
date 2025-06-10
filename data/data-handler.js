const data = require('./mydata');

function getCategoryItems(categoryName){

    return data.categories.find(t=>t.name === categoryName);

}

module.exports = {getCategoryItems}