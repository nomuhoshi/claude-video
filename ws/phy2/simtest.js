function sm(a,b,x){var t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
function U(x){var a=(x-0.40)/0.085,b=(x-0.66)/0.075;return Math.exp(-a*a)-Math.exp(-b*b)+800*Math.pow(Math.max(0,x-0.86),2)+400*Math.pow(Math.max(0,0.06-x),2);}
function F(x){var h=1e-4;return -(U(x+h)-U(x-h))/(2*h);}
var L=[0.5,2.771,5.188,10.188,12.388,15.588,17.588,19.588,21.807], dur=25.6;
var dt=1/240,n=Math.ceil(dur/dt)+2,k=0.101;
var kicks=[[L[2]+0.1,0.30],[L[2]+3.0,0.36],[L[3]+0.15,0.56],[L[7]+0.5,0.30],[L[8]+0.4,0.34]],ki=0;
var x=0.10,v=0,out=[];
for(var i=0;i<n;i++){var t=i*dt;
 if(ki<kicks.length&&t>=kicks[ki][0]&&x<0.16&&v<0.02){v=kicks[ki][1];console.log('kick',ki,t.toFixed(2));ki++;}
 else if(ki<kicks.length&&t>=kicks[ki][0]+3){x=0.10;v=kicks[ki][1];console.log('teleport kick',ki,t.toFixed(2));ki++;}
 var gam=0.10+0.9*sm(0.52,0.60,x);
 var a=k*F(x)-gam*v; v+=a*dt; x+=v*dt; if(x<0.04){x=0.04;v=Math.abs(v);} if(x>0.88){x=0.88;v=-Math.abs(v);}
 if(i%120===0) out.push(t.toFixed(1)+':'+x.toFixed(3));
}
console.log(out.join(' '));
