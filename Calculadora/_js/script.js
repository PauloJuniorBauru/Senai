let display = '';
let result = '';
let save_op = '';
let show = document.querySelector('div.calc');
let hist = document.querySelector('div.hist');

const button = {
    number(n) {
        display += (save_op == 'π') ? ` × ${n}` : n;
        result += (save_op == 'π') ? `*${n}` : n;
        
        show.innerHTML = display;
    },
    operator(op) {
        if (display[display.length -2] != op && display[display.length -1] != op) { 
            // Removendo espaço de alguns operadores       
            display += (op != '(' && op != ')' && op != '√' && op != 'π') ? ` ${op} ` : op; 

            show.innerHTML = display;

            if (save_op == '√' && op != 'π') 
                result += `)`;

            // if (show.innerHTML == 0 && op == `x <sup>y</sup>`) {
            //     display = `0<sup>☐</sup>`;
            //     result = `Math.pow(0,`;
            // } 
            
            // if (op == `x <sup>2</sup>`) {
            //     display = `${display}<sup>2</sup>`;
            // }
            save_op = op;

            switch (op) { 
                case '(':
                    result += `(`;
                    break;

                case ')':
                    result += `)`;
                    break;

                // case `x <sup>2</sup>`:  
                //     if (isNaN(result.charAt(result.length -2)) == false) {
                //         result += `Math.pow(${result}, ${2})`;
                //     }
                //     else {
                //         const g1 = result.slice(0,result.length -1);
                //         const g2 = result.slice(1, result.length);
                //         result = g2;
                        
                //         console.log(result);
                //     }
                //     break;

                // case `x <sup>y</sup>`:
                //     if (result.indexOf('Math') == -1) {
                //         const p = display.indexOf('<');
                //         const n = display.substring(p, 0);                   
                    
                //         result += `Math.pow(${n},`;
                //     }                    
                //     break;

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
                    result = '';
                    display = '';
                    show.innerHTML = '0';
                    hist.innerHTML = '';
                    break;
                case 'π':
                    result += (isNaN(result[result.length - 1]) == false) ? `*${Math.PI}` : Math.PI;
                    break;
            }
        }
    },
    equal() {
        if (save_op == '√' && isNaN(display[display.length -1]) == false) {
            result += `)`;
        }

        display += '=';
        hist.innerHTML = display;
        
        result = eval(result);
        show.innerHTML = result;
        display = result;
        save_op = '';
        console.log(`Result = ${result}`); // Apagar Depois ==================== 
        // console.log(`Display = ${display}`); // Apagar Depois ====================     
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