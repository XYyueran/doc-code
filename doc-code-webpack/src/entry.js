import face from './face'
import content from './content'

import Button from './button';
require('./style.css')
require('./style1.css')
var info = require('./module.js')

var newinfo = () =>{ return info.name+'\'s age is '+info.age }
var button = ()=>(Button.button)
document.write(button())
Button.attacgEl()
document.write("it works module ")
document.write(newinfo())
document.write(` <p>${face} ${content}</p>`)