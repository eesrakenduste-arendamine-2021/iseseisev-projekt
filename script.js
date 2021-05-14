document.addEventListener('click', function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
      if (target.hasAttribute('data-target')) {
          var m_ID = target.getAttribute('data-target');
          document.getElementById(m_ID).classList.add('open');
          e.preventDefault();
      }
  }

  // Sulgeb modali nupust või taustale vajutades
  if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
      var modal = document.querySelector('[class="modal open"]');
      modal.classList.remove('open');
      e.preventDefault();
  }
}, false);

// Skoori süsteem
function changeName() {
    
    var q1 = document.getElementById("input1").value;
    document.getElementById("q1").innerHTML = q1;
}

let add1 = document.getElementById('increment1');
    let remove1 = document.getElementById('decrement1')
    let int1 = document.getElementById('number1');

    let i1 = 0;
    add1.addEventListener('click', function(){
        i1 += 100;
        int1.innerHTML = i1;
    });

    remove1.addEventListener('click', function(){
        i1 -= 100;
        int1.innerHTML = i1;
    });

let add2 = document.getElementById('increment2');
    let remove2 = document.getElementById('decrement2')
    let int2 = document.getElementById('number2');

    let i2 = 0;
    add2.addEventListener('click', function(){
        i2 += 100;
        int2.innerHTML = i2;
    });

    remove2.addEventListener('click', function(){
        i2 -= 100;
        int2.innerHTML = i2;
    });

let add3 = document.getElementById('increment3');
    let remove3 = document.getElementById('decrement3')
    let int3 = document.getElementById('number3');

    let i3 = 0;
    add3.addEventListener('click', function(){
        i3 += 100;
        int3.innerHTML = i3;
    });

    remove3.addEventListener('click', function(){
        i3 -= 100;
        int3.innerHTML = i3;
    });
    // Q1
    var q1 = document.getElementById('q1');
    var btnQ1 = document.getElementById('btnq1');
    var Q1 = document.getElementById('Q1');
    btnQ1.onclick = function(){
    q1.textContent = Q1.value;};
    // Q2
    var q2 = document.getElementById('q2');
    var btnQ2 = document.getElementById('btnq2');
    var Q2 = document.getElementById('Q2');
    btnQ2.onclick = function(){
    q2.textContent = Q2.value;};
    // Q3
    var q3 = document.getElementById('q3');
    var btnQ3 = document.getElementById('btnq3');
    var Q3 = document.getElementById('Q3');
    btnQ3.onclick = function(){
    q3.textContent = Q3.value;};
    // Q4
    var q4 = document.getElementById('q4');
    var btnQ4 = document.getElementById('btnq4');
    var Q4 = document.getElementById('Q4');
    btnQ4.onclick = function(){
    q4.textContent = Q4.value;};
    // Q5
    var q5 = document.getElementById('q5');
    var btnQ5 = document.getElementById('btnq5');
    var Q5 = document.getElementById('Q5');
    btnQ5.onclick = function(){
    q5.textContent = Q5.value;};



    // 1
    var v1 = document.getElementById('v1');
    var btnv1 = document.getElementById('btnv1');
    var V1 = document.getElementById('V1');
    btnv1.onclick = function(){
    v1.textContent = V1.value;};
    var a1 = document.getElementById('a1');
    var btna1 = document.getElementById('btna1');
    var A1 = document.getElementById('A1');
    btna1.onclick = function(){
    a1.textContent = A1.value;};
    // 2
    var v2 = document.getElementById('v2');
    var btnv2 = document.getElementById('btnv2');
    var V2 = document.getElementById('V2');
    btnv2.onclick = function(){
    v2.textContent = V2.value;};
    var a2 = document.getElementById('a2');
    var btna2 = document.getElementById('btna2');
    var A2 = document.getElementById('A2');
    btna2.onclick = function(){
    a2.textContent = A2.value;};
    // 3
    var v3 = document.getElementById('v3');
    var btnv3 = document.getElementById('btnv3');
    var V3 = document.getElementById('V3');
    btnv3.onclick = function(){
    v3.textContent = V3.value;};
    var a3 = document.getElementById('a3');
    var btna3 = document.getElementById('btna3');
    var A3 = document.getElementById('A3');
    btna3.onclick = function(){
    a3.textContent = A3.value;};
    // 4
    var v4 = document.getElementById('v4');
    var btnv4 = document.getElementById('btnv4');
    var V4 = document.getElementById('V4');
    btnv4.onclick = function(){
    v4.textContent = V4.value;};
    var a4 = document.getElementById('a4');
    var btna4 = document.getElementById('btna4');
    var A4 = document.getElementById('A4');
    btna4.onclick = function(){
    a4.textContent = A4.value;};
    // 5
    var v5 = document.getElementById('v5');
    var btnv5 = document.getElementById('btnv5');
    var V5 = document.getElementById('V5');
    btnv5.onclick = function(){
    v5.textContent = V5.value;};
    var a5 = document.getElementById('a5');
    var btna5 = document.getElementById('btna5');
    var A5 = document.getElementById('A5');
    btna5.onclick = function(){
    a5.textContent = A5.value;};
    // 6
    var v6 = document.getElementById('v6');
    var btnv6 = document.getElementById('btnv6');
    var V6 = document.getElementById('V6');
    btnv6.onclick = function(){
    v6.textContent = V6.value;};
    var a6 = document.getElementById('a6');
    var btna6 = document.getElementById('btna6');
    var A6 = document.getElementById('A6');
    btna6.onclick = function(){
    a6.textContent = A6.value;};
    // 7
    var v7 = document.getElementById('v7');
    var btnv7 = document.getElementById('btnv7');
    var V7 = document.getElementById('V7');
    btnv7.onclick = function(){
    v7.textContent = V7.value;};
    var a7 = document.getElementById('a7');
    var btna7 = document.getElementById('btna7');
    var A7 = document.getElementById('A7');
    btna7.onclick = function(){
    a7.textContent = A7.value;};
    // 8
    var v8 = document.getElementById('v8');
    var btnv8 = document.getElementById('btnv8');
    var V8 = document.getElementById('V8');
    btnv8.onclick = function(){
    v8.textContent = V8.value;};
    var a8 = document.getElementById('a8');
    var btna8 = document.getElementById('btna8');
    var A8 = document.getElementById('A8');
    btna8.onclick = function(){
    a8.textContent = A8.value;};
    // 9
    var v9 = document.getElementById('v9');
    var btnv9 = document.getElementById('btnv9');
    var V9 = document.getElementById('V9');
    btnv9.onclick = function(){
    v9.textContent = V9.value;};
    var a9 = document.getElementById('a9');
    var btna9 = document.getElementById('btna9');
    var A9 = document.getElementById('A9');
    btna9.onclick = function(){
    a9.textContent = A9.value;};
    // 10
    var v10 = document.getElementById('v10');
    var btnv10 = document.getElementById('btnv10');
    var V10 = document.getElementById('V10');
    btnv10.onclick = function(){
    v10.textContent = V10.value;};
    var a10 = document.getElementById('a10');
    var btna10 = document.getElementById('btna10');
    var A10 = document.getElementById('A10');
    btna10.onclick = function(){
    a10.textContent = A10.value;};
    // 11
    var v11 = document.getElementById('v11');
    var btnv11 = document.getElementById('btnv11');
    var V11 = document.getElementById('V11');
    btnv11.onclick = function(){
    v11.textContent = V11.value;};
    var a11 = document.getElementById('a11');
    var btna11 = document.getElementById('btna11');
    var A11 = document.getElementById('A11');
    btna11.onclick = function(){
    a11.textContent = A11.value;};
    // 12
    var v12 = document.getElementById('v12');
    var btnv12 = document.getElementById('btnv12');
    var V12 = document.getElementById('V12');
    btnv12.onclick = function(){
    v12.textContent = V12.value;};
    var a12 = document.getElementById('a12');
    var btna12 = document.getElementById('btna12');
    var A12 = document.getElementById('A12');
    btna12.onclick = function(){
    a12.textContent = A12.value;};
    // 13
    var v13 = document.getElementById('v13');
    var btnv13 = document.getElementById('btnv13');
    var V13 = document.getElementById('V13');
    btnv13.onclick = function(){
    v13.textContent = V13.value;};
    var a13 = document.getElementById('a13');
    var btna13 = document.getElementById('btna13');
    var A13 = document.getElementById('A13');
    btna13.onclick = function(){
    a13.textContent = A13.value;};
    // 14
    var v14 = document.getElementById('v14');
    var btnv14 = document.getElementById('btnv14');
    var V14 = document.getElementById('V14');
    btnv14.onclick = function(){
    v14.textContent = V14.value;};
    var a14 = document.getElementById('a14');
    var btna14 = document.getElementById('btna14');
    var A14 = document.getElementById('A14');
    btna14.onclick = function(){
    a14.textContent = A14.value;};
    // 15
    var v15 = document.getElementById('v15');
    var btnv15 = document.getElementById('btnv15');
    var V15 = document.getElementById('V15');
    btnv15.onclick = function(){
    v15.textContent = V15.value;};
    var a15 = document.getElementById('a15');
    var btna15 = document.getElementById('btna15');
    var A15 = document.getElementById('A15');
    btna15.onclick = function(){
    a15.textContent = A15.value;};
    // 16
    var v16 = document.getElementById('v16');
    var btnv16 = document.getElementById('btnv16');
    var V16 = document.getElementById('V16');
    btnv16.onclick = function(){
    v16.textContent = V16.value;};
    var a16 = document.getElementById('a16');
    var btna16 = document.getElementById('btna16');
    var A16 = document.getElementById('A16');
    btna16.onclick = function(){
    a16.textContent = A16.value;};
    // 17
    var v17 = document.getElementById('v17');
    var btnv17 = document.getElementById('btnv17');
    var V17 = document.getElementById('V17');
    btnv17.onclick = function(){
    v17.textContent = V17.value;};
    var a17 = document.getElementById('a17');
    var btna17 = document.getElementById('btna17');
    var A17 = document.getElementById('A17');
    btna17.onclick = function(){
    a17.textContent = A17.value;};
    // 18
    var v18 = document.getElementById('v18');
    var btnv18 = document.getElementById('btnv18');
    var V18 = document.getElementById('V18');
    btnv18.onclick = function(){
    v18.textContent = V18.value;};
    var a18 = document.getElementById('a18');
    var btna18 = document.getElementById('btna18');
    var A18 = document.getElementById('A18');
    btna18.onclick = function(){
    a18.textContent = A18.value;};
    // 19
    var v19 = document.getElementById('v19');
    var btnv19 = document.getElementById('btnv19');
    var V19 = document.getElementById('V19');
    btnv19.onclick = function(){
    v19.textContent = V19.value;};
    var a19 = document.getElementById('a19');
    var btna19 = document.getElementById('btna19');
    var A19 = document.getElementById('A19');
    btna19.onclick = function(){
    a19.textContent = A19.value;};
    // 20
    var v20 = document.getElementById('v20');
    var btnv20 = document.getElementById('btnv20');
    var V20 = document.getElementById('V20');
    btnv20.onclick = function(){
    v20.textContent = V20.value;};
    var a20 = document.getElementById('a20');
    var btna20 = document.getElementById('btna20');
    var A20 = document.getElementById('A20');
    btna20.onclick = function(){
    a20.textContent = A20.value;};
    // 21
    var v21 = document.getElementById('v21');
    var btnv21 = document.getElementById('btnv21');
    var V21 = document.getElementById('V21');
    btnv21.onclick = function(){
    v21.textContent = V21.value;};
    var a21 = document.getElementById('a21');
    var btna21 = document.getElementById('btna21');
    var A21 = document.getElementById('A21');
    btna21.onclick = function(){
    a21.textContent = A21.value;};
    // 22
    var v22 = document.getElementById('v22');
    var btnv22 = document.getElementById('btnv22');
    var V22 = document.getElementById('V22');
    btnv22.onclick = function(){
    v22.textContent = V22.value;};
    var a22 = document.getElementById('a22');
    var btna22 = document.getElementById('btna22');
    var A22 = document.getElementById('A22');
    btna22.onclick = function(){
    a22.textContent = A22.value;};
    // 23
    var v23 = document.getElementById('v23');
    var btnv23 = document.getElementById('btnv23');
    var V23 = document.getElementById('V23');
    btnv23.onclick = function(){
    v23.textContent = V23.value;};
    var a23 = document.getElementById('a23');
    var btna23 = document.getElementById('btna23');
    var A23 = document.getElementById('A23');
    btna23.onclick = function(){
    a23.textContent = A23.value;};
    // 24
    var v24 = document.getElementById('v24');
    var btnv24 = document.getElementById('btnv24');
    var V24 = document.getElementById('V24');
    btnv24.onclick = function(){
    v24.textContent = V24.value;};
    var a24 = document.getElementById('a24');
    var btna24 = document.getElementById('btna24');
    var A24 = document.getElementById('A24');
    btna24.onclick = function(){
    a24.textContent = A24.value;};
    // 25
    var v25 = document.getElementById('v25');
    var btnv25 = document.getElementById('btnv25');
    var V25 = document.getElementById('V25');
    btnv25.onclick = function(){
    v25.textContent = V25.value;};
    var a25 = document.getElementById('a25');
    var btna25 = document.getElementById('btna25');
    var A25 = document.getElementById('A25');
    btna25.onclick = function(){
    a25.textContent = A25.value;};