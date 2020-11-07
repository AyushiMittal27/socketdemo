
let socket = io();

socket.on('connected', ()=>{
console.log("connected to "+socket.id)
})

$(function(){
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbox = $('#loginbox')
    let loginbtn =$('#loginbtn')
    let logindiv = $('#login-div')
    let chatDiv =$('#chat-div')
    let user=''



    sendbtn.click(function(){
        let msg = msgbox.val()
        socket.emit('send_msg' , {
            user : user,
            message :msgbox.val()})
    })
    
    loginbtn.click(function(){
        user= loginbox.val();
        logindiv.hide();
        chatDiv.show();
        socket.emit('login' , {
            user : user
        })
    })  


    socket.on('recv_msg' , function(data){
       msglist.append($('<li>' +data.user + ': '+ data.message +'</li>'))
    })
})