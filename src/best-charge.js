function bestCharge(selectedItems) {
  var itemInfo = getItemInfo(selectedItems);
  var best_charge = findBestCharge(itemInfo);
  var receipt = printReceipt(itemInfo, best_charge);
  return receipt;
}

function printReceipt(itemInfo,best_charge){
  let result = '============= 订餐明细 =============\n';
  for(let i = 0; i < itemInfo.length; i++){
    result += itemInfo[i].name + ' x ' + itemInfo[i].amount + ' = ' + itemInfo[i].price + '元\n';
  }
  result += '-----------------------------------\n';
  if(best_charge.saveMoney != 0){
    result += '使用优惠:\n' + best_charge.promotionType + '，省'
    + best_charge.saveMoney + '元\n' + '-----------------------------------\n';
  }
  result += '总计：' + best_charge.totalPrice + '元\n' + '===================================';

  return result;
}

function findBestCharge(itemInfo){
  let promotion = loadPromotions();
  let best_charge = {};
  let saveMoney_1 = 0, saveMoney_2 = 0;
  let totalPrice = 0;
  let typeflag = 0;

  for(let i = 0; i < itemInfo.length; i++){
    totalPrice += itemInfo[i].price;
    for(let j = 0; j < promotion[1].items.length; j++){
      if(itemInfo[i].id ==  promotion[1].items[j]){
        saveMoney_2 += itemInfo[i].price / 2;
        typeflag += j + 1;
      }
    }
  }

  if(totalPrice >= 30)
    saveMoney_1 = 6;

  if((saveMoney_1 && saveMoney_2) == 0){
    best_charge.totalPrice = totalPrice;
    best_charge.saveMoney = 0;
  }else if(saveMoney_1 >= saveMoney_2){
    best_charge.totalPrice = totalPrice - saveMoney_1;
    best_charge.promotionType = promotion[0].type;
    best_charge.saveMoney = saveMoney_1;
  }else{
    best_charge.totalPrice = totalPrice - saveMoney_2;
    switch (typeflag) {
      case 1:
        best_charge.promotionType = promotion[1].type + '(黄焖鸡)';
      break;
      case 2:
        best_charge.promotionType = promotion[1].type + '(凉皮)';
      break;
      case 3:
        best_charge.promotionType = promotion[1].type + '(黄焖鸡，凉皮)';
      break;
    }
    best_charge.saveMoney = saveMoney_2;
  }

  return best_charge;
}

function getItemInfo(selectedItems){
  let selectedItemsInfo = [];
  let allItemsInfo = loadAllItems();

  for(let i = 0; i < selectedItems.length; i++){
    let obj = {};
    let arr = selectedItems[i].split(" x ", 2);
    obj.id = arr[0];
    obj.amount = parseInt(arr[1]);
    for(let j = 0; j < allItemsInfo.length; j++){
      if(obj.id == allItemsInfo[j].id){
        obj.name = allItemsInfo[j].name;
        obj.price = allItemsInfo[j].price * arr[1];
      }
    }
    selectedItemsInfo.push(obj);
  }

  return selectedItemsInfo;
}
