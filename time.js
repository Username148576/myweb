var start_time;
var m,hr;
var clock = setInterval(run , 1);
var user;

const firebaseConfig = {
    apiKey: "AIzaSyBVsDnvhCmqV8vU46H20zveHyov_AKpCRE",
    authDomain: "test-2626b.firebaseapp.com",
    projectId: "test-2626b",
    storageBucket: "test-2626b.appspot.com",
    messagingSenderId: "415410992744",
    appId: "1:415410992744:web:944608993e3ca437786ddd",
    measurementId: "G-D5EEW2C6PE"
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore().collection('results')

function start() {
    user=me.value;
    if(user === "undefined"){
        window.alert("請先選擇身分");
    }
    else{
        var d = new Date();
		start_time = d.getTime();
    }
}

async function record() {
    const timeRef = await db.get();
    var t1=0,t2=0,t3=0,h1,m1,h2,m2,h3,m3;
    timeRef.forEach((doc) => {
        if(doc.data().name==='便便'){
            t1+=(doc.data().minute);
        }
        else if(doc.data().name==='鄒宜璇'){
            t2+=(doc.data().minute);
        }
        else if(doc.data().name==='劉豐萱'){
            t3+=(doc.data().minute);
        }
      });
    h1=Math.floor(t1/60);
    m1=t1%60;
    h2=Math.floor(t2/60);
    m2=t2%60;
    h3=Math.floor(t3/60);
    m3=t3%60;
    document.getElementById("record1").innerText = "便便 :" + h1 + ":" + m1 ;
    document.getElementById("record2").innerText = "鄒宜璇 :" + h2 + ":" + m2 ;
    document.getElementById("record3").innerText = "劉豐萱 :" + h3 + ":" + m3 ;
}

function run() {
    user=me.value;
    if(me.value!="undefined")document.getElementById("hi").innerText = "hello " + user + " let's start to code" ;
	var d = new Date();
	var now = d.getTime();
	var ms = now-start_time;
	var nms = Math.floor((ms%1000/10)).toString().padStart(2, 0);
	var s = Math.floor(ms/1000);
	var ns = (s%60).toString().padStart(2, 0);
	m = Math.floor(s/60);
	var nm = (m%60).toString().padStart(2, 0);
	hr = Math.floor(m/60);
	var nhr = (hr%24).toString().padStart(2, 0);
    document.getElementById("demo").innerText = nhr + ":" + nm + ":" + ns + "." + nms;
}

function stop() {
	if(start_time === undefined)
	{
		window.alert("貼心小提醒\n start:開始 stop:結束\n 請先開始再結束");
	}
	else if(m<5)
	{
		window.alert("少於五分鐘將不被記錄");
	}
	else{
    start_time=undefined;
    user=me.value;
    db.add({
        name: user,
        minute: m
  })}
}
