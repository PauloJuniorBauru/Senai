let display = '';
let result = '';
let save_op = '';
let exp = '';
let base = '';
let show = document.querySelector('div.calc');
let hist = document.querySelector('div.hist');

const button = {
    number(n) {
        if (display.indexOf('<small>') != -1 && save_op == 'x <small>y</small>') {
            exp += n;            
            display = `${base}<small>${exp}</small>`;
            result = `Math.pow(${base}, ${exp})`; 
        }
        else {
            display += (save_op == 'π') ? ` × ${n}` : n;
            result += (save_op == 'π') ? `*${n}` : n;
        }
        
        show.innerHTML = display;
    },
    operator(op) {
        if (display[display.length -2] != op && display[display.length -1] != op) { 
            
            if (show.innerHTML == 0 && op == `x <small>y</small>`) {
                base = 0;
                display = `${base}<small>?</small>`;
            } 
            else if (op == `x <small>y</small>`) {
                base = display;
                display = `${base}<small>?</small>`;
            }
            else if (show.innerHTML == 0 && op == `x!`) {
                base = 0;
                display = `${base}!`;
            } 
            else if (show.innerHTML != 0 && op == `x!`) {
                base = display;
                display = `${base}!`;
            } 
            else if (save_op == '√' && op != 'π') 
                result += `)`;
            else {
                // Removendo espaço de alguns operadores       
                display += (op != '(' && op != ')' && op != '√' && op != 'π') ? ` ${op} ` : op; 
            }
            
            save_op = op;            
            show.innerHTML = display;            

            switch (op) { 
                case '(':
                    result += `(`;
                    break;

                case ')':
                    result += `)`;
                    break;

                case `x <small>y</small>`:
                    result = `Math.pow(${base}, ${exp})`;                     
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
                    
                case 'mod':
                    result += `%`;
                    break;  
                
                case '÷':
                    result += `/`;
                    break;  
                    
                case '√':
                    result += `Math.sqrt(`;
                    break;

                case 'C':
                    display = '';
                    result = '';
                    save_op = '';
                    exp = '';
                    show.innerHTML = '0';
                    hist.innerHTML = '';
                    break;
                case 'π':
                    result += (isNaN(result[result.length - 1]) == false) ? `*${Math.PI}` : Math.PI;
                    break;

                case `x!`:
                    function fatorial(n) {
                        let fat = 1;
                        for (let i = n; i > 1; i--) {
                            fat *= i;
                        }
                        return fat;
                    }; 
                    
                    result = fatorial(base);
                    break;
            }
        }
    },
    equal() {
        if (save_op == '√' && isNaN(display[display.length -1]) == false) {
            result += `)`;
        }
        else if (save_op == `x <small>y</small>`) {
            result = `Math.pow(${base}, ${exp})`; 
        }
        else if (display.indexOf('√π') != -1) {
            result += `)`;
        }
        
        display += '=';
        hist.innerHTML = display;

        console.log(result); // Apagar Depois ==================== 
        
        result = eval(result);
        show.innerHTML = result;
        display = result;
        save_op = '';
        exp = '';
        console.log(`Result = ${result}`); // Apagar Depois ==================== 
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