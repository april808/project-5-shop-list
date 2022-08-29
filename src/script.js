// ajax資料
var itemurl="https://awiclass.monoame.com/api/command.php?type=get&name=itemdata";
// ------
//新增一個商品清單的物件
var shoplist={};
shoplist.name="MyBuylist 購物清單";
shoplist.time="2016/9/10";
// 商品清單的清單裡面是個陣列，很多個物件的陣列

shoplist.list=[
  {name: "吹風機",price: 1000},
  {name: "鏡子",price: 100},
  {name: "牙刷",price: 500},
  {name: "肥皂",price: 50}
];

$.ajax({
  url: itemurl,
  success: function(res){
    shoplist.list=JSON.parse(res);
    showlist();
  }
  
});



// -----
//定義元素用的html模板
var item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<hr class='dashed'/><div class='price'>{{price}}</div><div id={{del_id}} data-delid={{del_item_id}} class='del_btn'>✘</div></li>";

var total_html="<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

//刪除並重新產生清單中所有項目
function showlist(){
  $("#items_list").html("");
  var total_price=0;
  //把每個項目做出來
  for(var i=0;i<shoplist.list.length;i++){
    var item=shoplist.list[i];
    var item_id="buyitem_"+i;
    var del_item_id="del_buyitem_"+i;
    
    //動態統計總價(每一項跑時加上去)
    total_price+=parseInt(item.price);/*parseInt()轉換成數字.val()預設是字串string*/
    
    //取代模板位置成資料replace(要取代的,取代成...)
    var current_item_html=item_html.replace("{{num}}",i+1)
                                   .replace("{{item}}",item.name)
                                   .replace("{{id}}",item_id)
                                   .replace("{{del_id}}",del_item_id)
                                   .replace("{{price}}",item.price)
                                   .replace("{{del_item_id}}",i)
    ;
    
    //加入元素後才能夠用jquery操作
    $("#items_list").append(current_item_html);
    $("#"+del_item_id).click(
      function(){
        /*指定要刪除項目的id*/
        var thisAttr=$(this).attr("data-delid");/*Number.parseInt === parseInt*/
        /*指定項目的動畫--"#"+item_id是<li>的id，但不會抓到現在點的li。--*/
        $("#buyitem_"+thisAttr).css("animation","ani2 0.6s 1");/*我們還在for裡面*/
        /*刪除項目*/
        setTimeout(function () {
          remove_item(thisAttr);/*thisAttr===parseInt(thisAttr)*/
        }, 500);/*延後刪除時間*/
      }
    );
  }
  //新增總價那一欄
  var current_total_html=
      total_html.replace("{{price}}",total_price);
  $("#items_list").append(current_total_html);
}
//先顯示一次，因為前面只定義好function 還沒有執行
showlist();

// 新增資料流程: 動態push一筆資料->呼叫showlist重新渲染清單
$(".addbtn").click(
  function(){
    //使用val()存取輸入的值，val("..") 有給參數是設定
    shoplist.list.push(
      {
        name:$("#input_name").val(),
        price:$("#input_price").val()
      }
    );
    $("#input_name").val("");//給完資料後清空value
    $("#input_price").val("");
    showlist();
    /*顯示showlist()後-添加新增li動畫*/
    var buyitem_new=shoplist.list.length-1;/*最後新增的一個項目*/
    $("#buyitem_"+buyitem_new).css("animation","ani1 0.6s 1");
  },
  // $(".addbtn").css("animation","ani2 0.6s 1");
);
//刪除項目 陣列.splice(位置,長度) 
//刪除資料->重新根據資料渲染清單
function remove_item(id){
  shoplist.list.splice(id,1);
  showlist();
}
/*進場動態*/
(function ($) {
    $("body").addClass('variant-strm_light');/*先綁隱藏的CSS*/
    $(document)
        .ready(function () {
          setTimeout(function () {
              $("body").removeClass("variant-strm_light");
          }, 1200);/*於1.2秒時拿掉隱藏用CSS*/
          setTimeout(function () {
              $("#items_list").removeClass("start");
          }, 2000);
          $("textarea").text(generateMixed());/* 預設開始/隨機字串 */
          var nowtime=0;
          setInterval(function(){// 時間的觸發更新/隨機字串
              nowtime=nowtime+1;
              $("textarea").text(generateMixed());
              $(".note-book").css("animation","ani1 0.3s 1");
          },3000);/*千分之1(毫秒)計算*/
          setInterval(function(){// 時間的觸發更新/移除css("animation","ani1 0.3s 1");
              $(".note-book").css("animation","");
          },3500);
        });
})(jQuery);

/*Js生成隨機數/隨機字串*/

function generateMixed() {
  var str = ["0早起的鳥兒有蟲吃","人天天都學到一點東西，而往往所學到的是發現昨日學到的是錯的。 —— B.V","人的潛能是一座無法估量的豐富的礦藏，只等著我們去挖掘。","永遠不讓「恐懼」阻止自己去做真心喜歡的事。","為了不讓生活留下遺憾和後悔，我們應該儘可能抓住一切改變生活的機會。","5早起的蟲子被鳥吃"];
  var mathRandom = Math.ceil(Math.random()*str.length-1);/* 0到字串長度(隨機)*/
  var res = "";
  
  for(var i = 0; i < str.length ; i ++) {
     var id = mathRandom;
     res = str[id];
  }
  return res;
}

/*
Math.ceil()執行向上舍入，即它總是將數值向上舍入為最接近的整數；
Math.floor()執行向下舍入，即它總是將數值向下舍入為最接近的整數；
Math.round()執行標準舍入，即它總是將數值四捨五入為最接近的整數(這也是我們在數學課上學到的捨入規則)。*/
/* Math.random()亂數方法。最小值是0 ，最大值是0.999999999999 永遠不會到1 */