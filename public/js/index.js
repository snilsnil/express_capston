var imageURLs = ["img/LOZBOTW.png", "img/supermario.png", "img/LOZSS.png"];
var videoURLs = ["video/LOZBOTW.mp4", "video/supermario.mp4", "video/LOZSS.mp4"];

var gmname =new Array();
gmname[0]="젤다의 전설 : 브레스 오브 더 와일드";
gmname[1]="슈퍼 마리오브라더스";
gmname[2]="젤다의 전설 : 스카이워드 소드";

var gmstory=new Array();
gmstory[0]="대재앙이라고 불리는 재해가 일어나 하이랄 왕국은 멸망했다…….<br>그로부터 100년 후, 주인공 링크는 지하유적에서 오랜 잠으로부터<br> 깨어나 신비한 목소리에 이끌려 대지로 발을 내딛는다.";
gmstory[1]="버섯들이 사는 평화로운 왕국은 어느 날 강력한 마법을 다루는<br>큰 거북 쿠파 일족의 침략을 받게 되었습니다.<br>얌전한 버섯 일족은 모두 쿠파의 마법으로 바위나 벽돌, 포자로<br>모습이 변해버리고, 버섯 왕국은 사라지게 되었습니다.<br>버섯들에게 걸린 마법을 풀고 되살릴 수 있는 것은<br>버섯 왕국의 피치공주뿐입니다.<br>당신이 피치공주를 구하여 마법을 풀어주세요.";
gmstory[2]="아주 먼 옛날 사악한 존재가 모든 소원과 욕망을 이루는<br>트라이포스를 얻기 위해 전쟁을 일으켰고, 그 때문에 여신은<br>트라이포스를 지키기 위해 살아남은 사람들과 운해 너머로 대지를 띄웠다.<br>그 이후 어느 날 스카이로프트의 기사학교에 다니는 링크는 소꿉친구 젤다와<br>의식을 끝마치고 같이 하늘을 날던중, 젤다가 이상한 검은 폭풍에 빨려들어가<br> 상상 속에만 존재하던 대지로 떨어지는데...<br>";




var randomIndex = Math.floor(Math.random() * imageURLs.length);



function getImageTag() {
var img = '<img id=\"main_image\" src=\"';
img += imageURLs[randomIndex];
img += '\" alt=\"Some alt text\" align=\"top\" />';
return img;
}

function getVideoTag() {
	var video ='<video id=\"vdio\" muted autoplay loop>'; 
	video +='<source src=\"';
	video += videoURLs[randomIndex];
	video += '\" type=\"video/mp4\">';
	video += '</video>';
	return video;
	}

function getGM() {
	var gm ='<div id=\"gm_story\"><strong><span>'; 
	gm+=gmname[randomIndex];
	gm+= '</span></strong><br><br>';
	gm+='<p style=\"padding-left:20px;\">';
	gm+= gmstory[randomIndex];
	gm+='</p>';
	gm+= '</div>';
	return gm;
	}
