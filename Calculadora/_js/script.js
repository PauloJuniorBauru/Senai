let save_op = '';
let display = '';
let result = '';
let show = document.querySelector('div.calc');
let hist = document.querySelector('div.hist');

const button = {
    number(n) {
        display += n;
        result += n;
        
        show.innerHTML = display;
    },
    operator(op) {
        if (display[display.length -2] != op) { 
            if (save_op == '√') {
                result += `)`;
            }

            save_op = op;  
            display += (op != '(' && op != ')') ? ` ${op} ` : op; // Espaço entre números, mas não entre parênteses        
            show.innerHTML = display;

            switch (op) { 
                case '(':
                    result += `(`;
                    break;

                case ')':
                    result += `)`;
                    break;

                case '+':
                    result += `+`;
                    break;   
                
                case '−':
                    result += `-`;
                    break;   
                
                case '×':
                    result += `*`;
                    break;   
                
                case '÷':
                    result += `/`;
                    break;  
                    
                case '√':
                    result += `Math.sqrt(`;
                    break;

                case 'C':
                    result = '';
                    display = '';
                    show.innerHTML = '0';
                    hist.innerHTML = '';
                    break;
            }
        }
    },
    equal() {
        if (save_op == '√') {
            result += `)`;
        }

        display += '=';
        hist.innerHTML = display;
        
        result = eval(result);
        show.innerHTML = result;
        display = result;
        console.log(eval(result)); // Apagar Depois ====================   
    }
}


// Event Listener 
const start = {    
    btnNum() {
        const num = document.querySelectorAll('.num');     
        for (let i = 0; i < num.length; i++) {
            num[i].addEventListener('click', () => {             
                button.number(num[i].innerHTML);  

                console.log(result); // Apagar Depois ====================   
            });
        }  
    },
    btnOperator() {
        const op = document.querySelectorAll('.op'); 
        for(let i = 0; i < op.length; i++) {
            op[i].addEventListener('click', () => {             
                button.operator(op[i].innerHTML); 

                console.log(result);  // Apagar Depois ====================      
            });
        } 
    },
    btnEqual() {
        const equal = document.querySelector('div.equal');
        equal.addEventListener('click', () => button.equal());
    }, 
    borderDisplay() {
        const border = document.querySelector('div.display');

        const btn = document.querySelectorAll('div.btn');
        for (let i = 0; i < btn.length; i++) {
            
            btn[i].addEventListener('mouseup', () => {
                border.style.borderColor = '#8ab4f8';
            });

            btn[i].addEventListener('mousedown', () => {
                border.style.borderColor = '#bdc1c6';
            });            
        }
    } 
}

start.btnNum();
start.btnOperator();
start.btnEqual();
start.borderDisplay();