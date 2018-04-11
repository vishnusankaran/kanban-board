() => {
    let mutationType = 'DELETE_LIST';
    let mutationName = mutationType.split('_').map((item, index) => { 
        let modifiedItem = item.toLowerCase();
        return index === 0 ? modifiedItem : modifiedItem[0].toUpperCase() + modifiedItem.slice(1) 
    }).join('');
}