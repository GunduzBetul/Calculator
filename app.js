const display = document.querySelector('.calculator-input');  //hesaplamanın yapıldığı yerin classını aldık
const keys = document.querySelector('.calculator-keys');  //ilgili kapsayıcı elemanın classını aldık

let displayValue = '0';   //kullanıcının değer girdiğinde değişeceği kısım
let firstValue = null;
let operator = null;  //operatör bilgisi
let waitingForSecondValue = false; //ikinci bilgiyi girdiğimizde ondan önce bir operatöre tıklayıp tıklamadığımızı kontrol ediyor

updateDisplay();  // güncellenen değeri vermek için

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {   //butonlara tıkladığımızda devreye girer harici bir yere tıklamamız işe yaramicak
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;  //buton dışında bir yere tıkladığımızda ona işletme dedik

    switch(value) {  // tek değerde çağırmak için switch case yapısını kullandık
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);  // yukarıda tanımladığımız için sadece value değerini verdik
            break;  // aşağıda ki caseler tekrar kontrol edilmesin diye break değerini giriyoruz
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:  // herhangi bir duruma uymadığında updateDisplay çalışıcak
            inputNumber(element.value);        
    }
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {  //operatörü güncellliyor
        operator = nextOperator;
        return;
    }

    if (firstValue === null) { 
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;  //iki değeri toplamak için
    } else if (operator === '-') {
        return first - second;  //birinciden ikinciyi çıkartmak için
    } else if (operator === '*') {
        return first * second;  //iki değeri çarp
    } else if (operator === '/') {
        return first / second;  //iki değeri böl
    }
    return second;
}

function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0'? num: displayValue + num;  //sıfıra eşitse nan bilgisini arttır
    }                                                                  //sıfıra eşit değilse butona tıklanmıştır sonuna ekle

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {  //daha önce nokto aperatörüne tıklayıp tıklamadığımızı kontrol eder
        displayValue += '.';
    }
}

function clear() {  // AC butonuna tıkladığımızda önceki işlemimizi sıfırlıyor
    displayValue = '0';
}