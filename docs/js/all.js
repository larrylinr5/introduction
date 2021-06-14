// var xhr = new XMLHttpRequest(); 

// //格式、要讀取的網址、同步非同步
// //格式 => get(讀取資料)、post(傳送資料到伺服器)
// var xhr = new XMLHttpRequest();
// xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
// xhr.send(null);
// xhr.onload = function () {
//     data = JSON.parse(xhr.responseText)['result']['records'];
//     console.log('取回的資料',data)
// }


var data;
var travelList = document.querySelector('.travel-list');
var areaTitle = document.querySelector('.area-title');

var select = document.querySelector('.form-control');
var area = ['全部景點', '三民區', '美濃區', '大樹區', '小港區', '六龜區', '仁武區', '內門區', '左營區', '田寮區', '甲仙區', '杉林區', '岡山區', '前金區', '前鎮區', '苓雅區', '茂林區', '茄萣區', '梓官區', '新興區', '楠梓區', '鼓山區', '旗津區', '鳳山區'];

var hotArea = document.querySelector('.hot-area-list');

var body = document.body;


// 下拉選單行政區
function getOption() {
    var areaLen = area.length;
    var str = '';
    for (var i = 0; i < areaLen; i++) {
        var areaName = area[i];
        var str = document.createElement('option');
        str.textContent = areaName;
        str.setAttribute('value', areaName);
        select.appendChild(str);
    }
}



// 使用 AJAX
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
xhr.send(null);
xhr.onload = function () {
    data = JSON.parse(xhr.responseText)['result']['records'];
    console.log('取回的資料',data)
    showList(); // 執行取得景點資料
}


function showList(e) {
    var temp = [];
    var str = '';

    var select;

    if (!e) {
        select = area[0]
    } else if (e.target.nodeName === 'A') {
        e.preventDefault();
        select = e.target.innerHTML;
    }
    else {
        select = e.target.value;
    }

    for (var i = 0; i < data.length; i++) {

        if (select === data[i]["Zone"]) {
            areaTitle.innerHTML = data[i]["Zone"];
            temp.push(data[i]);

        } else if (select === area[0]) {
            areaTitle.innerHTML = area[0];
            temp.push(data[i]);

        } else if (temp.length === 0) {
            areaTitle.innerHTML = '您選擇的行政區沒有景點';
        }
    }

    for (var j = 0; j < temp.length; j++) {
        str +=
            '<li><div class="img-box" style="background-image: url(' +
            temp[j]["Picture1"] +
            ');"></div>'+
            '<div class="text-box">'+
            '<ul >'+
            '<li><h4 class="travel-title">' +
            temp[j]['Name'] + '&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;' +temp[j]["Zone"] +
            '</h4></li >'+
            '<li><img src="images/icons_clock.png" alt="">' +
            temp[j]['Opentime'] +
            '</li ><li><img src="images/icons_pin.png" alt="">' +
            temp[j]['Add'] +
            '</li><li><img src="images/icons_phone.png" alt="">' +
            temp[j]['Tel'] +
            
            '</li></ul></div></li >';
    }
    travelList.innerHTML = str;
}




hotArea.addEventListener('click', showList);
select.addEventListener('change', showList);

getOption();