// 请把与index.html页面相关的javascript代码写在这里
// 同时删除该注释

function calculatePrice(){
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
  let selectItems = [];
  for(let i = 1; i <= 4; i++){
    let amount = document.getElementById("amount" + i).value;
    if(amount != "" && amount != "0"){
      let str = document.getElementById("id" + i).innerHTML + " x " + amount;
      selectItems.push(str);
    }
  }
  document.getElementById("message").innerHTML = bestCharge(selectItems);
};

function clearInput(){
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
  for(let i = 1; i <= 4; i++){
    document.getElementById("amount" + i).value = null;
  }
  document.getElementById("message").innerHTML = null;
};
