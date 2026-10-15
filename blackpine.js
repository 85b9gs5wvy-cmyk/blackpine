// @ts-nocheck
let GEN = 0;
export function bootSurvival(THREE, root, opts) {
  const gen = ++GEN;
  const T = THREE;
  const $ = (id) => root.querySelector("#" + id);
  const __t0 = performance.now(); const __mark = (n) => { (window.__times = window.__times || {})[n] = Math.round(performance.now() - __t0); };
  const _Lamb = T.MeshLambertMaterial;
  function LMat(p){ if(p&&p.flatShading){ p=Object.assign({},p); delete p.flatShading; } const m=new _Lamb(p); m.flatShading=false; return m; }
function polish(t){t.magFilter=T.LinearFilter;t.minFilter=T.LinearMipmapLinearFilter;t.generateMipmaps=true;t.anisotropy=Math.min(16,ren.capabilities.getMaxAnisotropy()||1);t.needsUpdate=true;return t}
root.innerHTML='<div class="ui" id="stats"></div>\n<div class="ui" id="clock"></div>\n<div class="ui" id="rate"></div>\n<div class="ui" id="raid"></div>\n<div class="ui" id="hint">Drag to look · WASD or the stick to move<br>Tap the world or Use to gather, shoot, and place<br>Tap the clock to change day speed</div>\n<div class="ui" id="cross"></div>\n<div class="ui" id="wbar"></div>\n<div class="ui" id="prompt"></div>\n<div class="ui" id="msg"></div>\n<div class="ui" id="hurt"></div><div class="ui" id="hit"></div>\n<div class="ui" id="js"><div id="kn"></div></div>\n<button class="ui" id="act" type="button">Use / Fire</button>\n<div class="ui" id="hot"></div><div class="ui" id="ammo"></div>\n<div class="ui" id="fx"></div>\n<div class="ui" id="toasts"></div>\n<div class="ui" id="tip"></div>\n<button class="ui ib" id="spr" type="button">Sprint</button><button class="ui ib" id="bagb" type="button">Bag</button><button class="ui ib" id="chb" type="button">Cheats</button><canvas class="ui" id="mm" width="100" height="100"></canvas><div class="ui" id="cht">CHEATS ON</div>\n<div class="ui" id="pbk"></div><div class="ui" id="panel"><div id="phd"><div id="tabs"><button type="button" data-t="bag">Inventory</button><button type="button" data-t="wear">Clothing</button><button type="button" data-t="craft">Crafting</button><button type="button" data-t="stat">Status</button><button data-t="research" id="rtab" style="display:none">Research</button></div><button type="button" id="pclose" aria-label="Close (Esc)"><kbd>Esc</kbd><span>Close</span></button></div><div id="pbody"><div id="pc"></div><aside id="pside"></aside></div></div>\n<div class="ui" id="cheat"></div>\n<div class="ui" id="over"><h1>YOU DIED</h1><div id="why"></div><button type="button" id="wake">Wake up</button></div>';
const scene=new T.Scene(),cam=new T.PerspectiveCamera(72,1,.1,450),IS_MOBILE=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),ren=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
cam.rotation.order='YXZ';scene.add(cam);ren.setPixelRatio(Math.min(devicePixelRatio||1,1.35)*(IS_MOBILE?.75:1));ren.domElement.className='world';root.prepend(ren.domElement);
const MK=[],MKC=['#ff4d4d','#ffb020','#38d46a','#33a8ff','#b86bff','#ff6bd0'];let mkN=0;
let FOVB=72,VK=1,mapOpen=false;let attOpen=false,attTarget=null,adsHeld=false,adsLerp=0,tacLightOn=true;
function rs(){const w=root.clientWidth||innerWidth,h=root.clientHeight||innerHeight;ren.setSize(w,h);const a=w/h;cam.aspect=a;FOVB=Math.min(100,Math.max(72,2*Math.atan(Math.tan(35*Math.PI/180)/a)*180/Math.PI));cam.fov=FOVB;VK=Math.min(1,Math.tan(FOVB*Math.PI/360)*a/1.28);cam.updateProjectionMatrix()}window.addEventListener('resize',rs);rs();
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=rng(11),B=760,REAL_DAY=86400,REF_PACE=144,PACES=[1,3,5,10,15,20,30,60,120];
const hash=(x,z)=>{const s=Math.sin(x*127.1+z*311.7)*43758.5453;return s-Math.floor(s)};
function vn(x,z){const xi=Math.floor(x),zi=Math.floor(z),xf=x-xi,zf=z-zi,u=xf*xf*(3-2*xf),v=zf*zf*(3-2*zf);return hash(xi,zi)*(1-u)*(1-v)+hash(xi+1,zi)*u*(1-v)+hash(xi,zi+1)*(1-u)*v+hash(xi+1,zi+1)*u*v}
function fbm(x,z){let a=.5,f=1,s=0;for(let i=0;i<4;i++){s+=a*vn(x*f+i*17,z*f+i*31);a*=.5;f*=2}return s}
function Hraw(x,z){const r=Math.hypot(x,z)/900*(1+.4*(vn(x*.004+9,z*.004)-.5)),m=Math.max(0,1-Math.pow(r,2.2));return m*(2.5+fbm(x*.012,z*.012)*9)-(1-m)*6}
let H=Hraw;
// biomes: 0 pine forest, 1 autumn woods, 2 meadow, 3 dry scrub
const BIOME_N=['Pine forest','Autumn woods','Meadow','Dry scrub'],MMB=[[58,92,50],[146,102,46],[104,142,66],[164,144,88]];
const bsm=(a,b,v)=>{const q=Math.max(0,Math.min(1,(v-a)/(b-a)));return q*q*(3-2*q)};
function biomeW(x,z){const wx=x+(vn(x*.011+4,z*.011+9)-.5)*70,wz=z+(vn(x*.011+31,z*.011+2)-.5)*70;
 let m=vn(wx*.0030+50,wz*.0030-20)*.62+vn(wx*.0095+3,wz*.0095+8)*.38,tp=vn(wx*.0034-70,wz*.0034+80)*.62+vn(wx*.0105+12,wz*.0105-6)*.38;
 const k=Math.max(0,1-Math.hypot(x,z)/170);m+=(.85-m)*k;tp+=(.2-tp)*k;
 const a=bsm(.33,.53,m),b=bsm(.44,.64,tp);return[a*(1-b),a*b,(1-a)*(1-b),(1-a)*b]}
function biomeAt(x,z){const w=biomeW(x,z);let b=0;for(let i=1;i<4;i++)if(w[i]>w[b])b=i;return b}
const BD={tree:[1,.92,.38,.28],bush:[.55,.85,1,.58],hemp:[.68,.88,1.15,.62],rock:[.55,.45,.4,1.15],pineI:[1,.35,.08,.08],spruceI:[.95,.22,.05,.04],leafI:[.12,.32,.92,.12],autI:[.04,1.15,.12,.05],aspenI:[.08,.95,.28,.04],birI:[.22,.48,.95,.02],scrubI:[0,.08,.1,1.15],grass:[.78,.88,1.1,.28],dry:[0,.18,.1,1.1]};
function bDens(k,x,z){const w=biomeW(x,z),d=BD[k];let s=0;for(let i=0;i<4;i++)s+=w[i]*d[i];if(k==='tree'||k.endsWith('I'))s*=.2+.8*bsm(.28,.55,fbm(x*.017+5,z*.017));return s}
function treeKindAt(x,z){const b=biomeAt(x,z),r=R();
 if(b===0)return r<.54?'pine':r<.86?'spruce':r<.95?'birch':'leaf';
 if(b===1)return r<.46?'aut':r<.76?'aspen':r<.9?'birch':'pine';
 if(b===2)return r<.48?'birch':r<.86?'leaf':r<.94?'aspen':'pine';
 return r<.5?'scrub':r<.84?'snag':r<.93?'pine':'leaf'}

const TN=160,TS=1680,HG=new Float32Array((TN+1)*(TN+1));
function ground(x,z){const gx=(x/TS+.5)*TN,gy=(.5-z/TS)*TN;if(gx<=0||gy<=0||gx>=TN||gy>=TN)return Hraw(x,z);const ix=gx|0,iy=gy|0,tx=gx-ix,ty=gy-iy,W=TN+1,h00=HG[iy*W+ix],h10=HG[iy*W+ix+1],h01=HG[(iy+1)*W+ix],h11=HG[(iy+1)*W+ix+1];if(tx+ty<=1)return h00*(1-tx-ty)+h01*ty+h10*tx;return h01*(1-tx)+h11*(tx+ty-1)+h10*(1-ty)}
const LP={x:0,z:0};
// lights + sky
const hemi=new T.HemisphereLight(0xcfd8d8,0x3a3a2a,.8),sun=new T.DirectionalLight(0xfff0d0,.7);sun.position.set(40,80,30);scene.add(hemi,sun);
scene.fog=new T.FogExp2(0x9aa8a6,.0072);scene.background=new T.Color(0x8eb4c9);
let terrMesh=null;
// terrain
{const g=new T.PlaneGeometry(TS,TS,TN,TN);g.rotateX(-Math.PI/2);const p=g.attributes.position,c=[],a=new T.Color(0x3e5230),b=new T.Color(0x6e6842),s=new T.Color(0xcbb992),rk=new T.Color(0x726e68),sn=new T.Color(0xe4e2dc),m=new T.Color();
const BA=[new T.Color(0x2d4828),new T.Color(0x6e4e24),new T.Color(0x527d36),new T.Color(0x96824e)],BB=[new T.Color(0x4e6638),new T.Color(0xa66628),new T.Color(0x8eb04c),new T.Color(0xc2ab6e)],BC=[new T.Color(0x1e351c),new T.Color(0xb84a22),new T.Color(0xa8c65c),new T.Color(0x7a6842)],BT=new T.Color();
for(let iy=0;iy<=TN;iy++)for(let ix=0;ix<=TN;ix++)HG[iy*(TN+1)+ix]=Hraw((ix/TN-.5)*TS,(.5-iy/TN)*TS);
for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i),ix=Math.round((x/TS+.5)*TN),iy=Math.round((.5-z/TS)*TN),y=HG[iy*(TN+1)+ix];p.setY(i,y);const n=(Math.sin(x*.31)*Math.cos(z*.27)+1)/2,n2=vn(x*.045+19,z*.045-11);const bw=biomeW(x,z);m.setRGB(0,0,0);for(let q=0;q<4;q++){BT.copy(BA[q]).lerp(BB[q],n*.78);if(n2>.62)BT.lerp(BC[q],(n2-.62)*1.6);m.r+=BT.r*bw[q];m.g+=BT.g*bw[q];m.b+=BT.b*bw[q]}if(y<.65)m.lerp(s,Math.min(1,(.95-y)/1.1));const sl=Math.min(1,Math.hypot(Hraw(x+8,z)-y,Hraw(x,z+8)-y)/2.35);if(sl>.38&&y>.6)m.lerp(rk,Math.min(1,(sl-.38)*2.3));if(y>7.1)m.lerp(sn,Math.min(1,(y-7.1)/2.1));const blot=hash((x/20)|0,(z/20)|0);if(y>.7&&y<7){if(blot<.24)m.lerp(new T.Color(0x22381c),.38*(bw[0]+bw[2])+bw[1]*.18);else if(blot>.78)m.lerp(new T.Color(0xb49448),.32*(bw[1]+bw[3])+bw[2]*.22)}c.push(m.r,m.g,m.b)}
function groundAlbedo(){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d'),img=g.createImageData(256,256),d=img.data;
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){const n=hash(x*.17,y*.19),n2=hash(x*.05+3,y*.06),blot=hash((x/9)|0,(y/7)|0),spec=hash((x*3)%251,(y*5)%251);let v=168+n*48+n2*28+(blot-.5)*36;if(spec>.9)v-=48;else if(spec<.05)v+=26;if(((x*13+y*9)%17)===0)v-=22;const i=(y*256+x)*4,grain=Math.max(96,Math.min(236,v));d[i]=grain+8;d[i+1]=grain-2;d[i+2]=grain-16;d[i+3]=255}
 g.putImageData(img,0,0);g.globalAlpha=.55;for(let i=0;i<340;i++){const x=(hash(i,2)*256)|0,y=(hash(6,i)*256)|0,w=i%7===0?5:i%3===0?3:2;g.fillStyle=i%4?'rgba(48,36,24,.62)':'rgba(226,214,186,.48)';g.fillRect(x,y,w,w-1)}g.globalAlpha=.35;for(let i=0;i<40;i++){const x=(hash(i+9,3)*220)|0,y=(hash(8,i+2)*220)|0;g.fillStyle='rgba(30,28,24,.55)';g.beginPath();g.ellipse(x,y,10+hash(i,i)*18,6+hash(i+1,4)*8,hash(i,5)*3,0,6.3);g.fill()}g.globalAlpha=1;
 const soft=document.createElement('canvas');soft.width=soft.height=128;const sg=soft.getContext('2d');sg.imageSmoothingEnabled=true;sg.drawImage(c,0,0,128,128);g.imageSmoothingEnabled=true;g.drawImage(soft,0,0,256,256);const t=polish(new T.CanvasTexture(c));t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(48,48);t.colorSpace=T.SRGBColorSpace;return t}
g.setAttribute('color',new T.Float32BufferAttribute(c,3));g.computeVertexNormals();terrMesh=new T.Mesh(g,LMat({map:groundAlbedo(),vertexColors:true}));scene.add(terrMesh);H=(x,z)=>ground(x,z);__mark('terrain')}
const WM=new T.ShaderMaterial({transparent:true,uniforms:{uT:{value:0},uO:{value:new T.Vector2()},uDeep:{value:new T.Color(0x0b3b57)},uShallow:{value:new T.Color(0x2f9aa8)},uSun:{value:new T.Vector3(0,1,0)},uSunI:{value:1},uSky:{value:new T.Color()},uFog:{value:new T.Color()},uFogD:{value:.0072},uL:{value:1}},
vertexShader:`uniform float uT;uniform vec2 uO;varying vec3 vP;varying vec3 vN;
void main(){vec3 p=position;vec3 q=p+vec3(uO.x,0.,uO.y);
 float a=sin(q.x*.35+uT*1.1)*.18,b=sin(q.z*.5-uT*1.4+q.x*.1)*.14,c=sin((q.x+q.z)*.9+uT*2.)*.05;
 float dx=cos(q.x*.35+uT*1.1)*.063+cos((q.x+q.z)*.9+uT*2.)*.045,dz=cos(q.z*.5-uT*1.4+q.x*.1)*.07+cos((q.x+q.z)*.9+uT*2.)*.045;
 p.y+=a+b+c;vN=normalize(vec3(-dx,1.,-dz));vP=(modelMatrix*vec4(p,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vP,1.);}`,
fragmentShader:`uniform vec3 uDeep,uShallow,uSun,uSky,uFog;uniform float uFogD,uSunI,uL;varying vec3 vP;varying vec3 vN;
void main(){vec3 V=normalize(cameraPosition-vP),N=normalize(vN);
 float fr=pow(1.-max(dot(N,V),0.),3.);
 vec3 col=mix(uDeep,uShallow,.4+.35*N.x)*uL;col=mix(col,uSky,fr*.55);
 float sp=pow(max(dot(reflect(-uSun,N),V),0.),80.)*uSunI;col+=vec3(1.,.95,.8)*sp;
 float d=length(cameraPosition-vP),f=clamp(1.-exp(-uFogD*uFogD*d*d),0.,1.);
 gl_FragColor=vec4(mix(col,uFog,f),.93);}`});
const WMesh=new T.Mesh(new T.PlaneGeometry(900,900,80,80).rotateX(-Math.PI/2),WM);WMesh.frustumCulled=false;scene.add(WMesh);
const moon=new T.DirectionalLight(0x8899cc,0);scene.add(moon);
const disc=(c,s)=>{const m=new T.Mesh(new T.SphereGeometry(s,12,8),new T.MeshBasicMaterial({color:c,fog:false}));scene.add(m);return m},sunM=disc(0xfff2c0,14),moonM=disc(0xdfe6f5,9);
const sparr=[];for(let i=0;i<700;i++){const a=Math.random()*6.283,b=Math.acos(Math.random()*1.8-.9);sparr.push(420*Math.sin(b)*Math.cos(a),420*Math.cos(b),420*Math.sin(b)*Math.sin(a))}
const stars=new T.Points(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(sparr,3)),new T.PointsMaterial({size:1.8,sizeAttenuation:false,transparent:true,fog:false,depthWrite:false}));scene.add(stars);
function precipTex(kind){const c=document.createElement('canvas');c.width=32;c.height=kind==='rain'?96:32;const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);
 if(kind==='rain'){const grd=g.createLinearGradient(0,0,0,96);grd.addColorStop(0,'rgba(255,255,255,0)');grd.addColorStop(.2,'rgba(226,236,244,.15)');grd.addColorStop(.55,'rgba(236,244,250,.95)');grd.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=grd;g.fillRect(14,0,3,96)}
 else{g.fillStyle='rgba(255,255,255,.92)';g.beginPath();g.arc(16,16,8,0,6.283);g.fill()}
 return polish(new T.CanvasTexture(c))}
function makePrecip(n,color,size,kind){const pos=new Float32Array(n*3),spd=new Float32Array(n);for(let i=0;i<n;i++){pos[i*3]=(Math.random()-.5)*40;pos[i*3+1]=Math.random()*24;pos[i*3+2]=(Math.random()-.5)*40;spd[i]=.55+Math.random()}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));const mat=new T.PointsMaterial({color,size,map:precipTex(kind),transparent:true,opacity:0,depthWrite:false,sizeAttenuation:true,alphaTest:.05});const p=new T.Points(g,mat);p.frustumCulled=false;p.visible=false;cam.add(p);return{p,pos,spd,n,g,mat}}
const rainFx=makePrecip(780,0xd5e4ee,.9,'rain'),snowFx=makePrecip(520,0xf7f8fb,.34,'snow');
const cW=new T.Color(0xe8895a);
function sky2(d){const a=2*Math.PI*(t-.25),sx=Math.cos(a),sy=Math.sin(a),ds=Math.min(1,Math.max(0,(sy+.1)/.4)),w=Math.max(0,1-Math.abs(sy)*4);
 tmp.lerp(cW,w*.35);scene.background.copy(tmp);scene.fog.color.copy(tmp);
 sun.position.set(sx*100,sy*100,30);sun.intensity=.32+Math.max(0,sy)*.85;moon.position.set(-sx*100,-sy*100,-30);moon.intensity=Math.max(0,-sy)*.35;
 const u=WM.uniforms,up=sy>0;u.uT.value=age;WMesh.position.set(cam.position.x,0,cam.position.z);u.uO.value.set(cam.position.x,cam.position.z);u.uSun.value.set(up?sx:-sx,up?sy:-sy,up?.3:-.3).normalize();u.uSunI.value=up?1:.25;u.uSky.value.copy(tmp);u.uFog.value.copy(tmp);u.uL.value=.22+.78*ds;
 stars.material.opacity=1-ds;stars.position.copy(cam.position);
 sunM.position.set(cam.position.x+sx*350,cam.position.y+sy*350,cam.position.z+105);sunM.visible=sy>-.08;
 moonM.position.set(cam.position.x-sx*350,cam.position.y-sy*350,cam.position.z-105);moonM.visible=sy<.08}
// props
const things=[],LOGS=[],M=c=>LMat({color:c,flatShading:true});
const mTrunk=M(0x4a3626),mTrunk2=M(0x5c4030),mLeafD=M(0x1b3320),mLeafM=M(0x2e4b2c),mLeafL=M(0x4c7838),mRock=M(0x77777a),mRock2=M(0x5c5c60),mMoss=M(0x4a6236),mBush=M(0x3a552c),mBush2=M(0x2a421f),mBush3=M(0x5a7a40),mBerry=M(0xa8232b);
const gTrunk=new T.CylinderGeometry(.18,.32,2.7,6),gCone=new T.ConeGeometry(1,1.15,7),gRock=new T.DodecahedronGeometry(.45,0),gBush=new T.IcosahedronGeometry(.55,0),gBerry=new T.SphereGeometry(.07,5,4),gBranch=new T.CylinderGeometry(.045,.08,.95,4),gBlade=new T.ConeGeometry(.045,.62,4);
function newAcc(){return{pos:[],col:[],uv:[],idx:[],base:0}}
function bakeGeo(geo,matrix,color,acc,tile){const p=geo.attributes.position,uvA=geo.attributes.uv,idx=geo.index,c=new T.Color(color),v=new T.Vector3(),n=p.count;
 if(tile==null){if(geo===gTrunk||geo===gBranch)tile=(c.r>.65&&c.g>.62)?1:0;else if(geo===gCone)tile=2;else tile=3}
 const u0=(tile&1)?.54:.04,v0=(tile>>1)?.04:.54,us=.42,vs=.42;
 for(let i=0;i<n;i++){v.fromBufferAttribute(p,i);const lx=v.x,ly=v.y,lz=v.z;v.applyMatrix4(matrix);
  const shade=.9+hash((v.x*13.7)|0,(v.y*19.3+v.z*11.1)|0)*.18;
  acc.pos.push(v.x,v.y,v.z);acc.col.push(Math.min(1,c.r*shade),Math.min(1,c.g*shade),Math.min(1,c.b*shade));
  let u=uvA?uvA.getX(i):(Math.atan2(lx,lz)/6.283+.5),vv=uvA?uvA.getY(i):((ly+1.5)/3);
  u=u-Math.floor(u);vv=vv-Math.floor(vv);acc.uv.push(u0+u*us,v0+vv*vs)}
 if(idx){for(let i=0;i<idx.count;i++)acc.idx.push(acc.base+idx.getX(i))}else{for(let i=0;i<n;i++)acc.idx.push(acc.base+i)}acc.base+=n}
function accGeo(acc){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(acc.pos,3));g.setAttribute('color',new T.Float32BufferAttribute(acc.col,3));g.setAttribute('uv',new T.Float32BufferAttribute(acc.uv,2));g.setIndex(acc.idx);g.computeVertexNormals();return g}
function M4(x,y,z,rx,ry,rz,sx,sy,sz){const m=new T.Matrix4();m.makeTranslation(x||0,y||0,z||0);m.multiply(new T.Matrix4().makeRotationFromEuler(new T.Euler(rx||0,ry||0,rz||0,'XYZ')));m.multiply(new T.Matrix4().makeScale(sx==null?1:sx,sy==null?1:sy,sz==null?1:sz));return m}
function propAlbedo(){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
 // Q0 (top-left 0..128, 0..128): furrowed conifer & oak bark
 g.fillStyle='#c8beae';g.fillRect(0,0,128,128);
 for(let x=0;x<128;x+=2){const v=165+((hash(x,1.1)*60)|0);g.fillStyle=`rgb(${v},${v-6},${v-14})`;g.fillRect(x,0,2,128)}
 for(let i=0;i<140;i++){const x=(hash(i,2.3)*124)|0,y=(hash(3.7,i)*116)|0,h=10+((hash(i,5.1)*26)|0);g.fillStyle=i%3===0?'rgba(58,46,34,.55)':'rgba(238,228,210,.38)';g.fillRect(x,y,2+(i%2),h)}
 // Q1 (top-right 128..256, 0..128): paper birch & aspen white bark with dark lenticel stripes
 g.fillStyle='#f2efe8';g.fillRect(128,0,128,128);
 for(let y=0;y<128;y+=2){const v=228+((hash(y,4.2)*24)|0);g.fillStyle=`rgb(${v},${v-2},${v-7})`;g.fillRect(128,y,128,2)}
 for(let i=0;i<165;i++){const x=130+((hash(i,7.1)*112)|0),y=(hash(i,8.4)*124)|0,w=6+((hash(i,3.2)*18)|0),h=i%7===0?3:1.6;g.fillStyle=i%5===0?'rgba(42,38,34,.78)':'rgba(78,72,64,.55)';g.fillRect(x,y,w,h)}
 // Q2 (bottom-left 0..128, 128..256): conifer pine & spruce needle clusters
 g.fillStyle='#b8c4b4';g.fillRect(0,128,128,128);
 for(let i=0;i<220;i++){const x=8+hash(i,9.1)*112,y=136+hash(2.7,i)*112,a=hash(i,6.3)*6.28;g.strokeStyle=i%3===0?'rgba(44,62,40,.62)':i%2===0?'rgba(232,244,226,.48)':'rgba(95,120,86,.5)';g.lineWidth=1.6;g.beginPath();for(let k=-2;k<=2;k++){g.moveTo(x,y);g.lineTo(x+Math.cos(a+k*.28)*9,y+Math.sin(a+k*.28)*9)}g.stroke()}
 // Q3 (bottom-right 128..256, 128..256): dappled broadleaf canopy & rock mineral grain
 g.fillStyle='#c4c8be';g.fillRect(128,128,128,128);
 for(let i=0;i<180;i++){const x=134+hash(i,4.8)*116,y=134+hash(6.1,i)*116,rx=4+hash(i,2.9)*9,ry=3+hash(i,8.2)*6;g.fillStyle=i%4===0?'rgba(62,68,58,.48)':i%3===0?'rgba(244,246,236,.45)':'rgba(138,146,132,.42)';g.beginPath();g.ellipse(x,y,rx,ry,hash(i,1.9)*3.14,0,6.28);g.fill()}
 const t=polish(new T.CanvasTexture(c));t.wrapS=t.wrapT=T.ClampToEdgeWrapping;t.colorSpace=T.SRGBColorSpace;return t}
function pineGeo(seed){const acc=newAcc(),leaf=[0x18301a,0x254824,0x34622e,0x203e22,0x2d5629,0x3f6e36];
 bakeGeo(gTrunk,M4(0,1.42,0,0,seed,0,1.08,1.18,1.08),0x4e3624,acc,0);
 bakeGeo(gTrunk,M4(0,.08,0,0,seed*.5,0,1.88,.28,1.88),0x3b291b,acc,0);
 for(let i=0;i<4;i++){const a=seed+i*1.57+.3;bakeGeo(gBranch,M4(Math.cos(a)*.34,.24,Math.sin(a)*.34,.35,a,1.08,1.15,.55,1.15),0x3d2b1d,acc,0)}
 for(let i=0;i<5;i++){const a=seed+i*1.25;bakeGeo(gBranch,M4(Math.cos(a)*.28,1.35+i*.34,Math.sin(a)*.28,.18,a,1.18,.88,.68,.88),0x3d2c1e,acc,0)}
 for(let i=0;i<6;i++){const sc=1.72-i*.24,y=1.92+i*.58;bakeGeo(gCone,M4((hash(seed,i)-.5)*.06,y,(hash(i,seed)-.5)*.06,(hash(seed+i,2)-.5)*.05,seed+i*.52,0,sc,.82+(i%2)*.14,sc),leaf[i%leaf.length],acc,2);
  if(i<4){const a=seed+i*1.7;bakeGeo(gCone,M4(Math.cos(a)*sc*.28,y-.14,Math.sin(a)*sc*.28,.12,a+1.1,.08,sc*.58,.52,sc*.58),leaf[(i+2)%leaf.length],acc,2)}}
 return accGeo(acc)}
function spruceGeo(seed){const acc=newAcc(),leaf=[0x1a3832,0x244b42,0x2f5e52,0x1e4038,0x386b5c,0x295247,0x427868];
 bakeGeo(gTrunk,M4(0,1.62,0,0,seed,0,.86,1.35,.86),0x3e2d22,acc,0);
 bakeGeo(gTrunk,M4(0,.06,0,0,0,0,1.58,.26,1.58),0x2e2118,acc,0);
 for(let i=0;i<7;i++){const sc=1.42-i*.16,y=1.65+i*.48;bakeGeo(gCone,M4(0,y,0,0,seed+i*.65,0,sc,.74,sc),leaf[i%leaf.length],acc,2);
  const sc2=sc*.78;bakeGeo(gCone,M4(0,y+.22,0,0,seed+i*.65+.4,0,sc2,.62,sc2),leaf[(i+3)%leaf.length],acc,2)}
 return accGeo(acc)}
function leafGeo(seed,pal,tk,tile){pal=pal||[0x284c26,0x487436,0x1d381c,0x3a6432,0x588640];const acc=newAcc(),tCol=tk||0x583c28,bTile=tile!=null?tile:(tCol>0xa0a0a0?1:0);
 bakeGeo(gTrunk,M4(0,1.42,0,.03,seed,.04,.68,1.18,.68),tCol,acc,bTile);
 bakeGeo(gTrunk,M4(0,.06,0,0,seed,0,1.58,.26,1.58),bTile===1?0x5c5850:0x3e2c1c,acc,bTile);
 for(let i=0;i<4;i++){const a=seed+i*1.57;bakeGeo(gBranch,M4(Math.cos(a)*.44,2.28+(i%2)*.18,Math.sin(a)*.44,.52,a,.78,1.22,.62,1.22),tCol,acc,bTile)}
 const blobs=[[0,3.18,0,1.22,pal[0]],[.78,2.72,.22,.78,pal[1]],[-.68,2.78,-.24,.74,pal[2]],[.18,3.68,-.12,.64,pal[3]],[-.22,2.52,.58,.62,pal[4]],[.52,3.25,-.52,.58,pal[1]],[-.54,3.28,.46,.56,pal[3]],[0,2.38,-.64,.52,pal[2]]];
 for(const b of blobs)bakeGeo(gBush,M4(b[0],b[1],b[2],seed*.2,seed+b[0],.08,b[3],b[3]*.8,b[3]),b[4],acc,3);return accGeo(acc)}
function birchGeo(seed){const acc=newAcc(),pal=[0x78a644,0x9ec458,0x5c8834,0xb8d468,0x86b24c];
 bakeGeo(gTrunk,M4(-.08,1.52,0,.04,seed,.07,.48,1.28,.48),0xe2ded2,acc,1);
 bakeGeo(gTrunk,M4(.16,1.22,.06,-.06,seed+1.2,-.11,.36,1.02,.36),0xd8d3c6,acc,1);
 bakeGeo(gTrunk,M4(0,.04,0,0,seed,0,1.22,.24,1.22),0x48443e,acc,0);
 for(let i=0;i<4;i++){const a=seed+i*1.55;bakeGeo(gBranch,M4(Math.cos(a)*.34,2.25+i*.18,Math.sin(a)*.34,.42,a,.68,.88,.55,.88),0xdad5c8,acc,1)}
 const blobs=[[-.12,3.28,0,1.02,pal[0]],[.56,2.86,.18,.68,pal[1]],[-.58,2.92,-.2,.64,pal[2]],[.14,3.82,-.08,.58,pal[3]],[.38,2.35,.32,.54,pal[4]],[-.36,3.48,.36,.52,pal[1]]];
 for(const b of blobs)bakeGeo(gBush,M4(b[0],b[1],b[2],seed*.2,seed+b[0],0,b[3],b[3]*.86,b[3]),b[4],acc,3);return accGeo(acc)}
function aspenGeo(seed){const acc=newAcc(),pal=[0xdca226,0xeec244,0xc4781e,0xf4d65e,0xd08c24];
 bakeGeo(gTrunk,M4(0,1.65,0,.02,seed,.03,.46,1.38,.46),0xe6e2d6,acc,1);
 bakeGeo(gTrunk,M4(0,.05,0,0,0,0,1.18,.24,1.18),0x4a463e,acc,0);
 for(let i=0;i<4;i++){const a=seed+i*1.57;bakeGeo(gBranch,M4(Math.cos(a)*.28,2.2+i*.26,Math.sin(a)*.28,.35,a,.62,.82,.5,.82),0xd8d4c8,acc,1)}
 const blobs=[[0,2.85,0,.92,pal[0]],[.42,3.32,.16,.76,pal[1]],[-.38,3.45,-.18,.72,pal[2]],[0,3.96,0,.64,pal[3]],[.32,2.45,-.28,.62,pal[4]],[-.3,2.55,.32,.58,pal[1]],[0,4.35,0,.44,pal[3]]];
 for(const b of blobs)bakeGeo(gBush,M4(b[0],b[1],b[2],seed*.18,seed+b[1],0,b[3]*.88,b[3]*1.05,b[3]*.88),b[4],acc,3);return accGeo(acc)}
function scrubGeo(seed){const acc=newAcc(),pal=[0x6e7840,0x868c4e,0x586232,0x989a5c,0x747c44];
 bakeGeo(gTrunk,M4(0,.98,0,.14,seed,.18,.58,.82,.58),0x786248,acc,0);
 bakeGeo(gTrunk,M4(.24,1.72,.08,-.12,seed+.8,-.28,.44,.66,.44),0x6e5840,acc,0);
 for(let i=0;i<3;i++){const a=seed+i*2.09;bakeGeo(gBranch,M4(Math.cos(a)*.52,1.92+(i%2)*.18,Math.sin(a)*.52,.65,a,.95,1.28,.58,1.28),0x68523a,acc,0)}
 const pads=[[0,2.35,0,1.18,.34,pal[0]],[.86,2.18,.28,.88,.28,pal[1]],[-.78,2.24,-.32,.84,.28,pal[2]],[.28,2.58,-.48,.76,.26,pal[3]],[-.32,2.02,.58,.68,.25,pal[4]]];
 for(const p of pads)bakeGeo(gBush,M4(p[0],p[1],p[2],0,seed+p[0],0,p[3],p[4],p[3]),p[5],acc,3);return accGeo(acc)}
function rockGeo(seed){const acc=newAcc(),n=4+(seed*1.7|0)%2;for(let i=0;i<n;i++){const a=seed+i*1.65,sc=.58+((i*5+3)%7)*.09;bakeGeo(gRock,M4(Math.cos(a)*sc*.82,sc*.22,Math.sin(a)*sc*.62,seed*.4+i,i*1.1,.3+i*.2,sc*1.08,sc*(.44+i*.08),sc*.94),i?i%2?0x827e78:0x58544e:0x6c6762,acc,3)}bakeGeo(gBush,M4(.06,.48,.02,0,seed,0,.46,.15,.38),0x4c6636,acc,3);return accGeo(acc)}
function bushGeo(seed){const acc=newAcc();for(let i=0;i<7;i++){const a=seed+i*.9,sc=i?.78+(i%3)*.22:1.62;bakeGeo(gBush,M4(Math.cos(a)*sc*.62,.16+sc*.48,Math.sin(a)*sc*.55,0,a,.18,sc,sc*.74,sc*.96),0xffffff,acc,3)}for(let i=0;i<4;i++){const a=seed+i*1.6;bakeGeo(gBranch,M4(Math.cos(a)*.28,.1,Math.sin(a)*.2,.9,a,.25,1,.42,.7),0x8a6240,acc,0)}return accGeo(acc)}
function snagGeo(){const acc=newAcc();bakeGeo(gTrunk,M4(0,1.15,0,.08,.4,.07,1.02,.84,.95),0x685240,acc,0);bakeGeo(gTrunk,M4(0,.05,0,0,.2,0,1.62,.26,1.62),0x4a3828,acc,0);bakeGeo(gBranch,M4(.32,1.68,.06,.12,.2,.82,.85,.52,.8),0x584434,acc,0);bakeGeo(gBranch,M4(-.28,1.42,-.12,-.18,2.1,-.76,.75,.46,.75),0x523e2e,acc,0);bakeGeo(gCone,M4(-.05,2.08,0,2.6,.2,.15,.28,.26,.28),0x3e2c1e,acc,0);return accGeo(acc)}
function grassCardGeo(){const w=.92,h=.78,pos=[],uv=[],idx=[];const push=rx=>{const c=Math.cos(rx),s=Math.sin(rx),b=pos.length/3,pts=[[-w/2,0],[w/2,0],[w/2,h],[-w/2,h]],uvs=[[0,0],[1,0],[1,1],[0,1]];for(let i=0;i<4;i++){pos.push(pts[i][0]*c,pts[i][1],pts[i][0]*s);uv.push(uvs[i][0],uvs[i][1])}idx.push(b,b+1,b+2,b,b+2,b+3)};push(0);push(1.05);push(2.15);const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g}
function tuftTex(){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.clearRect(0,0,128,128);g.fillStyle='rgba(42,32,18,.55)';g.beginPath();g.ellipse(64,116,46,10,0,0,6.3);g.fill();const cols=['#163014','#24521c','#3d7a2e','#67a044','#1a3c16','#8cbc5c'];for(let i=0;i<16;i++){const x=14+(i*7)%100,lean=(i%2?1:-1)*(6+(i%5)*2),top=8+(i%4)*10;g.fillStyle=cols[i%cols.length];g.beginPath();g.moveTo(x,122);g.quadraticCurveTo(x+lean*.35,70,x+lean,top);g.quadraticCurveTo(x+lean+4,36,x+8,122);g.closePath();g.fill()}const t=polish(new T.CanvasTexture(c));t.colorSpace=T.SRGBColorSpace;return t}
function leafAlbedo(){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle='#2f5a28';g.fillRect(0,0,128,128);for(let i=0;i<90;i++){const x=hash(i,1.3)*128,y=hash(2.1,i)*128;g.fillStyle=i%4===0?'#1a3a16':i%3===0?'#6ea24a':'#3e7434';g.beginPath();g.ellipse(x,y,7+hash(i,3)*14,4+hash(i,4)*8,hash(i,5)*3,0,6.3);g.fill()}g.strokeStyle='rgba(18,36,12,.55)';g.lineWidth=1.2;for(let i=0;i<14;i++){g.beginPath();g.moveTo(hash(i,9)*128,hash(i,8)*128);g.quadraticCurveTo(hash(i,4)*128,hash(i+2,2)*128,hash(i+3,6)*128,hash(i+1,7)*128);g.stroke()}const t=polish(new T.CanvasTexture(c));t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1.6,1.6);t.colorSpace=T.SRGBColorSpace;return t}
const PINEG=[0.2,1.7,3.4].map(pineGeo),SPRUCEG=[0.6,2.2,3.8].map(spruceGeo),LEAFG=[0.4,2.1,4.2].map(s=>leafGeo(s)),ROCKG=[0.3,1.5,2.7].map(rockGeo),BUSHG=[0.6,2.4,3.8].map(bushGeo),SNAGG=snagGeo(),GRASSG=grassCardGeo();
const AUTP=[[0xb8441c,0xd98228,0x8e2a1c,0xe4ad32,0xa8421c],[0xd09828,0xe4be4c,0xb86220,0xeed068,0xc07428],[0x9e321e,0xc85c26,0x782218,0xd9862a,0xb04420]],LEAFAG=[0.5,2.3,4.0].map((s,i)=>leafGeo(s,AUTP[i])),BIRCHG=[0.7,2.6,3.9].map(birchGeo),ASPENG=[0.9,2.4,4.1].map(aspenGeo),SCRUBG=[0.4,1.9,3.5].map(scrubGeo);
const mProp=LMat({map:propAlbedo(),vertexColors:true}),mGrass=new T.MeshLambertMaterial({map:tuftTex(),transparent:true,alphaTest:.4,side:T.DoubleSide,color:0xffffff}),mFoliage=LMat({map:leafAlbedo(),vertexColors:true});
const mGrassDry=new T.MeshLambertMaterial({map:mGrass.map,transparent:true,alphaTest:.4,side:T.DoubleSide,color:0xd9c27c});
function propMesh(geo){return new T.Mesh(geo,mProp)}
// distance LOD: full model up close, a cheap proxy at mid range, nothing far out (fog hides it by then)
const LODC=new Map();
function paintGeo(g,c,tile){const n=g.attributes.position.count,a=new Float32Array(n*3),uv=new Float32Array(n*2),uv0=g.attributes.uv,t=tile==null?3:tile,u0=(t&1)?.54:.04,v0=(t>>1)?.04:.54;for(let i=0;i<n;i++){a[i*3]=c.r;a[i*3+1]=c.g;a[i*3+2]=c.b;const u=uv0?uv0.getX(i):.5,v=uv0?uv0.getY(i):.5;uv[i*2]=u0+(u-Math.floor(u))*.42;uv[i*2+1]=v0+(v-Math.floor(v))*.42}g.setAttribute('color',new T.BufferAttribute(a,3));g.setAttribute('uv',new T.BufferAttribute(uv,2));return g}
function mergeGeos(gs){const P=[],N=[],C=[],U=[];for(let g of gs){g=g.index?g.toNonIndexed():g;for(const v of g.attributes.position.array)P.push(v);for(const v of g.attributes.normal.array)N.push(v);for(const v of g.attributes.color.array)C.push(v);if(g.attributes.uv)for(const v of g.attributes.uv.array)U.push(v);else for(let i=0;i<g.attributes.position.count;i++)U.push(.75,.25)}const r=new T.BufferGeometry();r.setAttribute('position',new T.Float32BufferAttribute(P,3));r.setAttribute('normal',new T.Float32BufferAttribute(N,3));r.setAttribute('color',new T.Float32BufferAttribute(C,3));r.setAttribute('uv',new T.Float32BufferAttribute(U,2));return r}
function proxyFor(geo,kind){let p=LODC.get(geo);if(p)return p;geo.computeBoundingBox();const b=geo.boundingBox,sx=b.max.x-b.min.x,sy=b.max.y-b.min.y,sz=b.max.z-b.min.z,cx=(b.max.x+b.min.x)/2,cz=(b.max.z+b.min.z)/2,col=geo.attributes.color,avg=new T.Color(.25,.3,.2);
 if(col&&col.count){let r=0,g=0,bl=0;for(let i=0;i<col.count;i++){r+=col.getX(i);g+=col.getY(i);bl+=col.getZ(i)}avg.setRGB(r/col.count,g/col.count,bl/col.count)}
 const trunk=new T.Color(kind==='birch'||kind==='aspen'?.82:.25,kind==='birch'||kind==='aspen'?.8:.18,kind==='birch'||kind==='aspen'?.74:.12),W=Math.max(sx,sz);
 if(kind==='pine'||kind==='spruce'){const h=sy*.82,c=new T.ConeGeometry(W*.42,h,5);c.translate(cx,b.min.y+sy*.12+h/2,cz);p=paintGeo(c,avg,2)}
 else if(kind==='snag'){const c=new T.CylinderGeometry(W*.12,W*.2,sy,5);c.translate(cx,b.min.y+sy/2,cz);p=paintGeo(c,trunk,0)}
 else if(kind==='rock'){const c=new T.IcosahedronGeometry(1,0);c.scale(sx/2,sy/2,sz/2);c.translate(cx,b.min.y+sy/2,cz);p=paintGeo(c,avg,3)}
 else{const t=new T.CylinderGeometry(W*.05,W*.07,sy*.5,5);t.translate(cx,b.min.y+sy*.25,cz);const c=new T.IcosahedronGeometry(1,0);c.scale(W*.5,sy*.32,W*.5);c.translate(cx,b.min.y+sy*.68,cz);p=mergeGeos([paintGeo(t,trunk,kind==='birch'||kind==='aspen'?1:0),paintGeo(c,avg,3)])}
 LODC.set(geo,p);return p}
function lodMesh(geo,kind,d1,d2){const l=new T.LOD();l.addLevel(propMesh(geo),0);l.addLevel(propMesh(proxyFor(geo,kind)),d1||85);l.addLevel(new T.Object3D(),d2||260);return l}
const TK_GEO={pine:PINEG,spruce:SPRUCEG,leaf:LEAFG,aut:LEAFAG,birch:BIRCHG,aspen:ASPENG,scrub:SCRUBG};
function treeGroup(kind,s){const g=new T.Group(),arr=TK_GEO[kind],geo=kind==='snag'?SNAGG:(arr?arr[(R()*arr.length)|0]:PINEG[(R()*PINEG.length)|0]),lk=kind==='snag'?'snag':kind==='pine'||kind==='spruce'||!kind?'pine':kind==='birch'||kind==='aspen'?'birch':'leaf';g.add(lodMesh(geo,lk));g.scale.setScalar(s);g.rotation.set((R()-.5)*.06,R()*6.28,(R()-.5)*.06);g.userData.uses=kind==='snag'?2:3;g.userData.rad=.32+s*.18;g.userData.tk=kind||'pine';if(kind==='snag')g.userData.yield={wood:28};return g}
function place(n,k,f,minD){let i=0;while(i<n){const x=(R()*2-1)*B,z=(R()*2-1)*B,y=H(x,z);if(BD[k]&&R()>bDens(k,x,z))continue;if(y<(k==='tree'||k==='bush'?1.2:.5)||y>(k==='tree'||k==='bush'?7:9)||Math.hypot(x,z)<minD)continue;const o=f(x,y,z);o.position.set(x,y,z);o.userData.k=k;scene.add(o);things.push(o);o.updateMatrix();o.traverse(c=>{c.updateMatrix();c.matrixAutoUpdate=false});i++}}
place(1400,'tree',(x,y,z)=>treeGroup(treeKindAt(x,z),.78+R()*.9),5);
place(560,'rock',()=>{const g=new T.Group();g.add(lodMesh(ROCKG[(R()*ROCKG.length)|0],'rock',70,220));g.scale.setScalar(.62+R()*1.2);g.rotation.y=R()*6;g.userData.uses=2;g.userData.rad=.48+g.scale.x*.2;return g},4);
function hempGeo(seed){
 const acc=newAcc();
 // Rich soil root mound
 bakeGeo(gRock,M4(0,.04,0,0,seed,0,.55,.22,.55),0x3e2d1e,acc,3);
 // 3 fibrous green stalks + radiating palmate leaf blades + golden bast fiber tops
 const stalks=[[0,0,.98,0,0],[.14,.08,.82,.12,-.08],[-.13,-.09,.78,-.10,.09]];
 for(let s=0;s<stalks.length;s++){
  const [sx,sz,sh,rx,rz]=stalks[s];
  bakeGeo(gBranch,M4(sx,sh*.46,sz,rx,seed+s,rz,.95,sh,.95),0x48782c,acc,2);
  bakeGeo(gCone,M4(sx,sh*.94,sz,rx,seed+s,rz,.16,.28,.16),0xc8b464,acc,3);
  for(let k=0;k<4;k++){
   const h=sh*(.28+k*.17),sc=.36+(3-k)*.08;
   for(let j=0;j<5;j++){
    const a=seed+k*1.1+j*1.256,lx=sx+Math.cos(a)*sc*.42,lz=sz+Math.sin(a)*sc*.42;
    bakeGeo(gBlade,M4(lx,h,lz,Math.sin(a)*1.05,a,-Math.cos(a)*1.05,1.85,sc*1.45,1.35),j%2?0x3a7d2c:0x56983c,acc,2);
   }
  }
 }
 return accGeo(acc);
}
const HEMPG=[0.3,1.7,3.1].map(hempGeo);
function mkHemp(){
 const g=new T.Group();
 g.add(new T.Mesh(HEMPG[(R()*HEMPG.length)|0],mProp));
 g.userData.uses=1;g.userData.rad=.35;
 g.rotation.y=R()*6.28;g.scale.setScalar(1.05+R()*.35);
 return g;
}
place(260,'bush',()=>{const g=new T.Group();g.add(new T.Mesh(BUSHG[(R()*BUSHG.length)|0],mFoliage));const f=new T.Group();for(let i=0;i<8;i++){const q=new T.Mesh(gBerry,mBerry);q.position.set((Math.random()-.5)*1.15,.55+Math.random()*.7,(Math.random()-.5)*1.15);q.scale.setScalar(.85+Math.random()*.45);f.add(q)}g.add(f);g.userData.f=f;g.userData.ready=0;g.userData.uses=2;g.rotation.y=R()*6;g.scale.setScalar(1.45+R()*.6);return g},4);
place(380,'hemp',()=>mkHemp(),4);
// state
const S={health:100,hunger:85,thirst:85,energy:90,warmth:70},P={x:0,z:0,y:1.7};
const CH={on:false,god:false,inf:false,peace:false,free:false,fly:false,fast:false,freeze:false,ts:1},ch=k=>CH.on&&CH[k];let GATHER=window.__bpGather||.5,CRAFT=.65;function dropN(n){if(!(n>0))return 0;return Math.max(1,Math.round(n*GATHER))}function costN(n){return Math.max(1,Math.round(n*CRAFT))}
let faceYaw=0;const SP={x:0,z:0};(function(){let best=null,bs=1e9,tree=null;for(const o of things){if(o.userData.k!=='tree')continue;const x=o.position.x+4.6,z=o.position.z+0.7,h=H(x,z);if(h<1.8||h>5.2)continue;const s=Math.hypot(x,z);if(s<30||s>220)continue;if(s<bs){bs=s;best=[x,z];tree=o}}if(best&&tree){P.x=LP.x=SP.x=best[0];P.z=LP.z=SP.z=best[1];P.y=H(best[0],best[1])+1.7;const dx=tree.position.x-best[0],dz=tree.position.z-best[1];faceYaw=Math.atan2(-dx,-dz);SP.tx=tree.position.x;SP.tz=tree.position.z}})();
{const Rg=rng(101),logG=new T.CylinderGeometry(.15,.22,2.6,6);for(let i=0;i<70;i++){const x=(Rg()*2-1)*B,z=(Rg()*2-1)*B,y=H(x,z);if(y<1.25||y>6||Math.hypot(x-P.x,z-P.z)<14)continue;const m=new T.Mesh(logG,Rg()<.5?mTrunk:mTrunk2);m.position.set(x,y+.16,z);m.rotation.set(.08,Rg()*6,1.5708);scene.add(m);LOGS.push(m)}}
let pace=5;try{const sp=+localStorage.getItem('blackpine-pace');if(PACES.includes(sp))pace=sp}catch(e){}
function dayLenLabel(){const mins=Math.round(1440/pace);return mins>=90?(Math.round(mins/6)/10)+'h day':mins+'m day'}
function setPace(v){if(!PACES.includes(v))return;pace=v;try{localStorage.setItem('blackpine-pace',String(pace))}catch(e){}say('Day speed '+pace+'× real time. One day lasts about '+dayLenLabel().replace(' day','')+'.')}
$('clock').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();setPace(PACES[(PACES.indexOf(pace)+1)%PACES.length])});
let yaw=faceYaw,pitch=-.08,t=.32,age=0,days=0,dead=false,msgT=0,fires=[],chOpen=false,lastMv=0,saveAcc=0,demise='',demiseT=-99;let raidPhase='calm',raidWarned=-1,raidSpawned=-1,raidSawDark=false,raidTryAt=0,CLAIM=null,claimMesh=null,siegeAnchor={x:0,z:0,live:true};const RT={scavenge:0,hunt:0,build:0,blood:0,heat:0,quiet:0};const RANKS=['Unmarked','Drifter','Scavenger','Marked','Raider','Warlord'];const SAVEK='blackpine-save-v1';
const DIFFS={
 easy:   {n:'Easy',   raidMul:.6, cap:24,hp:.6, arm:.5, grow:.03,dmg:.7, acc:.82,tier:-1,heavy:.6, sTgt:2,night:100,nightMax:1,camp:.7, campResp:240,sight:.85,sortie:480,party:2,wTier:1, sHp:1.3},
 medium: {n:'Medium', raidMul:1,  cap:60,hp:.8, arm:.65,grow:.05,dmg:1,  acc:1,  tier:0, heavy:1,  sTgt:3,night:55, nightMax:2,camp:1,  campResp:180,sight:1,  sortie:300,party:2,wTier:0, sHp:1},
 hard:   {n:'Hard',   raidMul:1.4,cap:64,hp:1,  arm:.8, grow:.07,dmg:1.25,acc:1.12,tier:1, heavy:1.3, sTgt:4,night:38, nightMax:3,camp:1.25,campResp:120,sight:1.2, sortie:200,party:3,wTier:0, sHp:.9},
 extreme:{n:'Extreme',raidMul:2,  cap:72,hp:1.2,arm:1,  grow:.09,dmg:1.6, acc:1.25,tier:2, heavy:1.7, sTgt:5,night:22, nightMax:4,camp:1.5, campResp:75, sight:1.4, sortie:120,party:4,wTier:-1,sHp:.75}
};
let DIFFK=(()=>{let k=opts&&opts.difficulty;if(!k&&opts&&(opts.saveData||opts.cont)){try{const raw=opts.saveData?(typeof opts.saveData==='string'?JSON.parse(opts.saveData):opts.saveData):((window.__bpSaveStore&&typeof window.__bpSaveStore.latestRaw==='function'&&window.__bpSaveStore.latestRaw())||JSON.parse(localStorage.getItem(SAVEK)||'null'));k=raw&&raw.diff}catch(e){}}return DIFFS[k]?k:'medium'})();
let DF=DIFFS[DIFFK];
// Share of a hit that gets through a raider's heavy build (hv) and armor (ak). DF.arm eases both on lower modes; the .4 floor stops anyone becoming a sponge.
function foeMit(hv,ak){return Math.max(.4,1-(1-hv*ak)*DF.arm)}
let REPLAY=0;const BLOG=[];let rateKey='';let actx=null;let raidChat=0;
const WXNAME={clear:'Clear',overcast:'Overcast',rain:'Rain',storm:'Storm',fog:'Fog',snow:'Snow'};
const WXSAY={clear:'The sky clears.',overcast:'Clouds cover the pines.',rain:'Rain moves in. Stand in it to drink. A roof keeps the fire alive.',storm:'Storm. Turbines howl. Lightning hunts the open ground.',fog:'Fog settles. The trees close in.',snow:'Snow. You slow down, and the cold bites harder.'};
let wx='clear',wxT=42,wxBolt=8,boltT=0,shake=0,hurtFx=0,throwCd=0,blastN=0;
const defs={health:['♥','#c4453c','Health'],hunger:['🍖','#e0a04a','Food'],thirst:['💧','#3f9bd1','Water'],energy:['⚡','#d6e35a','Stamina'],warmth:['🌡','#e07a3d','Temp']};
for(const k in defs)$('stats').insertAdjacentHTML('beforeend',`<div class="st" style="--c:${defs[k][1]}"><b title="${defs[k][2]}">${defs[k][0]}</b><em id="n_${k}">100</em><div><i id="b_${k}"></i></div></div>`);
function note(text,col,ms,ico2){const box=$('toasts');if(!box)return;const d=document.createElement('div');d.className='toast note';if(col)d.style.setProperty('--c',col);
 if(ico2){const i=document.createElement('i');i.textContent=ico2;d.appendChild(i)}const sp=document.createElement('span');sp.textContent=text;d.appendChild(sp);box.prepend(d);
 const all=box.querySelectorAll('.note');for(let k=4;k<all.length;k++)all[k].remove();
 setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),450)},ms||(text.length>70?7000:4500))}
function say(m){const t=performance.now();if(say._m===m&&t-say._t<2500)return;say._m=m;say._t=t;note(m,'#9aa0a5')}
const FX_SKIP={'⚡':1,'🌱':1,'🛡':1,'🔥':1,'☠Raiders':1,'🔒':1},FX_WATCH={'☾Raid':1,'⚠Heat':1},FX_LOUD={'🥶':1,'🏜':1,'💀':1,'☠Raid':1,'🐺':1,'⚠Cupboard':1},fxSeen=new Map();let fxInit=false;
function fxNotify(list){const now=performance.now(),cur=new Set();
 for(const x of list){const k=x[0]+String(x[1]).split(' ')[0];cur.add(k);if(FX_SKIP[k]||FX_SKIP[x[0]])continue;const p=fxSeen.get(k);
  if(!fxInit){fxSeen.set(k,{t:now,text:x[1]});continue}
  if(!p||(FX_WATCH[k]&&p.text!==x[1])||(FX_LOUD[k]||FX_LOUD[x[0]])&&now-p.t>60000){note(x[1],x[2],5200,x[0]);fxSeen.set(k,{t:now,text:x[1]})}else p.text=x[1]}
 for(const k of fxSeen.keys())if(!cur.has(k))fxSeen.delete(k);fxInit=true}
say('Find water, food and wood. Stamina comes back while you still have food. Barrels only sit along the roads. Days run at '+pace+'× — tap the clock to change it.');
// input
const keys={};
const holdOf=e=>{const map={KeyW:'w',KeyA:'a',KeyS:'s',KeyD:'d',ShiftLeft:'shift',ShiftRight:'shift',ArrowUp:'arrowup',ArrowDown:'arrowdown',ArrowLeft:'arrowleft',ArrowRight:'arrowright',KeyE:'e',KeyR:'r',KeyI:'i',KeyTab:'tab',Escape:'escape'};return map[e.code]||(e.key||'').toLowerCase()};
function clearInput(){for(const k in keys)keys[k]=0;fireHeld=false}
const onBlurClear=()=>{if(gen===GEN)clearInput()},onVis=()=>{if(document.hidden)onBlurClear()};window.addEventListener('blur',onBlurClear);document.addEventListener('visibilitychange',onVis);
window.addEventListener('keydown',e=>{if(gen!==GEN)return;if(e.ctrlKey||e.metaKey||e.altKey){clearInput();return}if(e.code==='Backquote'){e.preventDefault();return toggleCheat()}const k=holdOf(e);if(k==='tab'||k.startsWith('arrow'))e.preventDefault();keys[k]=1;if(k==='e'&&!e.repeat){trigger(true,true);fireHeld=false}if(k==='r'&&!e.repeat)reload();if(k==='t'&&!e.repeat)cycleAmmo();if(k==='m'&&!e.repeat){e.preventDefault();toggleMap()}if(k==='i'||k==='tab'){e.preventDefault();if(mapOpen)toggleMap();togglePanel()}if(k==='v'&&!e.repeat){e.preventDefault();toggleAttUI()}if(k==='g'&&!e.repeat&&!attOpen){e.preventDefault();dropHeldSlot(!!e.shiftKey)}if(k==='f'&&!e.repeat&&!attOpen){tacLightOn=!tacLightOn;blip(tacLightOn?620:380,.04,'triangle');say('Tactical attachment '+(tacLightOn?'ON':'OFF')+'.')}if(k==='z'&&!e.repeat&&!attOpen)adsHeld=!adsHeld;if(k==='escape'){if(attOpen)closeAttUI();if(mapOpen)toggleMap();if(open)togglePanel();if(chOpen)toggleCheat()}if(k>='1'&&k<='6'&&!e.repeat)selSlot(+k-1)});
window.addEventListener('keyup',e=>{if(gen!==GEN)return;if(e.key==='Meta'||e.key==='Control'||e.key==='Alt')return clearInput();keys[holdOf(e)]=0});
let sprT=false,windTold=false;const sprB=$('spr');sprB.addEventListener('pointerdown',e=>{e.preventDefault();sprT=!sprT;if(sprT)say(S.hunger<=0?'Empty stomach. You can sprint until the bar is gone, and it will not come back until you eat.':'Sprint on. Stamina comes back as long as you have food.')});
let jv={x:0,y:0},jid=null;const js=$('js');
function jm(e){const r=js.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,m=Math.min(1,Math.hypot(dx,dy)/45),a=Math.atan2(dy,dx);jv={x:Math.cos(a)*m,y:Math.sin(a)*m};$('kn').style.transform=`translate(${jv.x*38}px,${jv.y*38}px)`}
js.addEventListener('pointerdown',e=>{jid=e.pointerId;js.setPointerCapture(jid);jm(e)});
js.addEventListener('pointermove',e=>{if(e.pointerId===jid)jm(e)});
const jend=e=>{if(e.pointerId===jid){jid=null;jv={x:0,y:0};$('kn').style.transform=''}};js.addEventListener('pointerup',jend);js.addEventListener('pointercancel',jend);
let lid=null,lx=0,ly=0,downX=0,downY=0,dragged=false;const cv=ren.domElement;
root.tabIndex=0;
let noLock=false;document.addEventListener('pointerlockerror',()=>{noLock=true;setTimeout(()=>{if(gen===GEN)noLock=false},1500)});
document.addEventListener('pointerlockchange',()=>{if(gen!==GEN)return;if(document.pointerLockElement!==cv){lid=null;fireHeld=false;if(!open&&!chOpen&&!dead)say('Paused. Click to look around again.')}});
cv.addEventListener('contextmenu',e=>e.preventDefault());window.addEventListener('pointerup',e=>{if(gen===GEN&&e.button===2)adsHeld=false});
function lookLock(want){root.classList.toggle('menu',!!(open||chOpen||mapOpen||attOpen));if(want){if(dead||open||chOpen||mapOpen||attOpen||noLock||document.pointerLockElement===cv)return;try{const p=cv.requestPointerLock();if(p&&typeof p.catch==='function')p.catch(()=>{noLock=true;setTimeout(()=>{if(gen===GEN)noLock=false},1500)})}catch(_){noLock=true}}else if(document.pointerLockElement===cv){try{document.exitPointerLock()}catch(_){}}}
cv.addEventListener('pointerdown',e=>{const ms=e.pointerType==='mouse';if(e.button===2){if(!open&&!chOpen&&!attOpen&&!dead&&gunOf())adsHeld=true;return}if(lid!==null&&!ms)return;lid=e.pointerId;lx=downX=e.clientX;ly=downY=e.clientY;dragged=false;try{cv.setPointerCapture(lid)}catch(_){}try{root.focus({preventScroll:true})}catch(_){}
 const locked=document.pointerLockElement===cv;
 if(locked&&!open&&!chOpen&&!dead){trigger(true);return}
 if(ms&&!noLock&&!locked&&!open&&!chOpen){try{const p=cv.requestPointerLock();if(p&&typeof p.catch==='function')p.catch(()=>{noLock=true;setTimeout(()=>{if(gen===GEN)noLock=false},1500)})}catch(_){noLock=true}}});
document.addEventListener('mousemove',e=>{if(gen!==GEN)return;if(document.pointerLockElement===cv&&!open&&!chOpen&&!dead){if(Math.abs(e.movementX)>300||Math.abs(e.movementY)>300)return;mdx+=e.movementX;mdy+=e.movementY;yaw-=e.movementX*.0025*(window.__bpSens||1);pitch=Math.max(-1.3,Math.min(1.3,pitch-e.movementY*.0025*(window.__bpSens||1)*(window.__bpInv?-1:1)))}});
cv.addEventListener('pointermove',e=>{if(e.pointerId!==lid||document.pointerLockElement===cv)return;if(Math.hypot(e.clientX-downX,e.clientY-downY)>6)dragged=true;mdx+=e.clientX-lx;mdy+=e.clientY-ly;yaw-=(e.clientX-lx)*.005*(window.__bpSens||1);pitch=Math.max(-1.3,Math.min(1.3,pitch-(e.clientY-ly)*.005*(window.__bpSens||1)*(window.__bpInv?-1:1)));lx=e.clientX;ly=e.clientY});
const lend=e=>{if(e.pointerId!==lid)return;const locked=document.pointerLockElement===cv;const tap=!dragged&&!open&&!chOpen&&!locked&&!dead;lid=null;fireHeld=false;if(tap){trigger(true);fireHeld=false}};cv.addEventListener('pointerup',lend);cv.addEventListener('pointercancel',lend);
$('act').addEventListener('pointerdown',()=>trigger(true));['pointerup','pointerleave','pointercancel'].forEach(ev=>$('act').addEventListener(ev,()=>{fireHeld=false}));
// actions
const NEAR=[];let cullT=0;const ray=new T.Raycaster();ray.far=4.5;
function target(){ray.setFromCamera({x:0,y:0},cam);const h=ray.intersectObjects(NEAR,true);for(const i of h){let o=i.object;while(o&&!o.userData.k)o=o.parent;if(o){if(o.userData.k==='bush'&&o.userData.ready>0)continue;if(o.userData.k==='crate'&&o.userData.cd>0)continue;return o}break}return null}
function closestUse(){let b=null,bd=2.5;const fx=-Math.sin(yaw),fz=-Math.cos(yaw);for(const o of NEAR){const k=o.userData.k;if(k!=='tree'&&k!=='rock'&&k!=='bush'&&k!=='hemp'&&k!=='junk'&&k!=='barrel'&&k!=='sulfur'&&k!=='ore'&&k!=='crate'&&k!=='dev'&&k!=='settler'&&k!=='raider'&&k!=='drop'&&k!=='recycler')continue;if(k==='bush'&&o.userData.ready>0)continue;if(k==='crate'&&o.userData.cd>0)continue;const dx=o.position.x-P.x,dz=o.position.z-P.z,d=Math.hypot(dx,dz)||1;if(d>2.4)continue;const facing=(dx*fx+dz*fz)/d;if(facing<0.2&&d>1.25)continue;if(d<bd){bd=d;b=o}}return b}
const canDrink=()=>H(P.x,P.z)<-.5;
const RN=[],RESP={tree:60,rock:90,junk:120,barrel:160,sulfur:110,ore:110,hemp:45},gSt=new T.CylinderGeometry(.3,.4,.5,6);
function remove(o){const i=things.indexOf(o);if(i<0)return;o.matrixAutoUpdate=true;things.splice(i,1);const k=o.userData.k,n={o,k,st:'fall',t:0,timer:RESP[k],r0:o.rotation.clone(),s0:o.scale.clone()};
 if(k==='tree'){n.stump=new T.Mesh(gSt,mTrunk);n.stump.position.copy(o.position);n.stump.position.y+=.25;n.stump.scale.setScalar(o.scale.x*.9);scene.add(n.stump)}RN.push(n)}
function nodeTick(dt){for(let i=RN.length-1;i>=0;i--){const n=RN[i],o=n.o;
 if(n.st==='fall'){n.t+=dt/.8;const e=Math.min(1,n.t);if(n.k==='tree')o.rotation.x=n.r0.x+e*e*1.35;o.scale.copy(n.s0).multiplyScalar(Math.max(.001,1-e*e*e));if(e>=1){n.st='wait';o.visible=false}}
 else if(n.st==='wait'){if((n.timer-=dt)<=0){n.st='grow';n.t=0;o.rotation.copy(n.r0);o.visible=true;if(n.stump)scene.remove(n.stump)}}
 else{n.t+=dt/1.4;const e=Math.min(1,n.t),q=1+2.7*Math.pow(e-1,3)+1.7*Math.pow(e-1,2);o.scale.copy(n.s0).multiplyScalar(Math.max(.001,q));
  if(e>=1){o.scale.copy(n.s0);o.userData.uses=o.userData.farm?(n.k==='tree'?2:3):(n.k==='tree'?3:2);things.push(o);RN.splice(i,1)}}}}
let swingD=.38,swingKind='rock',swingHit=0,slashDir=1;
function startSwing(kind,didHit,dur){
 const s=SL[sel],id=s?s.id:'rock';
 const tl=ITEMS[id]&&ITEMS[id].tool;
 swingKind=kind||(id==='chainsaw'?'saw':id==='jackhammer'?'drill':tl==='hatchet'?'chop':tl==='pickaxe'?'mine':id==='hammer'?'hammer':tl==='rock'?'rock':'use');
 const tf=(ITEMS[id]&&ITEMS[id].tier===2)?.78:1;
 swingD=dur||(swingKind==='saw'?.17:swingKind==='drill'?.12:tf*(swingKind==='mine'?.44:swingKind==='rock'?.42:swingKind==='chop'?.40:.35));
 swing=swingD;swingHit=didHit?1:0;
 {const ti=ITEMS[id];if(ti&&ti.tool)toolCd=ti.cd||TOOLCD[ti.tier||0]}
 camK+=swingKind==='saw'||swingKind==='drill'?.004:swingKind==='mine'?.012:swingKind==='rock'?.010:.006;
}
function impactSurfaceFx(kind,ox,oy,oz){
 const{f,r,u}=vb(), d=ox!=null?Math.min(1.6,Math.hypot(ox-P.x,oz-P.z)):1.15;
 const hx=P.x+f[0]*d,hy=P.y-.12+f[1]*d,hz=P.z+f[2]*d,q=Math.random;
 camK-=.018;camR+=(q()-.5)*.024;shake=Math.max(shake,.014);
 if(kind==='tree'||kind==='wood'){
  blip(135,.055,'triangle');blip(240,.03,'square');
  for(let i=0;i<8;i++)fxAdd(1,i%2?0x8a623a:0x5c3e22,hx+(q()-.5)*.22,hy+(q()-.5)*.2,hz+(q()-.5)*.22,-f[0]*(1.2+q()*1.8)+(q()-.5)*2.4,1.2+q()*2.2,-f[2]*(1.2+q()*1.8)+(q()-.5)*2.4,.48+q()*.25,.028+q()*.025,.014,.045,9.2,.32);
 }else if(kind==='rock'||kind==='ore'||kind==='sulfur'){
  blip(190,.045,'square');blip(820,.028,'triangle');
  const col=kind==='sulfur'?0xe8c838:kind==='ore'?0xb87333:0x8a8e94;
  for(let i=0;i<8;i++)fxAdd(1,i%3===0?col:0x6e7278,hx+(q()-.5)*.24,hy+(q()-.5)*.2,hz+(q()-.5)*.24,-f[0]*(1.5+q()*2.2)+(q()-.5)*2.8,1.4+q()*2.5,-f[2]*(1.5+q()*2.2)+(q()-.5)*2.8,.52+q()*.25,.026+q()*.022,.022,.028,9.8,.42);
  for(let i=0;i<5;i++)fxAdd(0,0xffdc72,hx,hy,hz,-f[0]*(2.5+q()*3)+(q()-.5)*3.6,1.8+q()*2.8,-f[2]*(2.5+q()*3)+(q()-.5)*3.6,.18+q()*.1,.012,.012,.012,6.5);
 }else{
  blip(260,.045,'sawtooth');blip(540,.025,'square');
  for(let i=0;i<6;i++)fxAdd(0,i%2?0xffd268:0x9aa0a6,hx+(q()-.5)*.2,hy+(q()-.5)*.2,hz+(q()-.5)*.2,(q()-.5)*3.2,1.2+q()*2.4,(q()-.5)*3.2,.28,.018,.018,.018,8);
 }
}
function meleeAct(){const s=SL[sel],M=s&&ITEMS[s.id].mel;if(!M)return false;if(mCd>0)return true;
 const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let best=null,bd=M.reach+.6;
 for(const o of NEAR){const a=o.userData.a;if(!a||a.hp<=0)continue;const dx=o.position.x-P.x,dz=o.position.z-P.z,d=Math.hypot(dx,dz)||1;if(d>bd)continue;if((dx*fx+dz*fz)/d<.6&&d>1)continue;if(!turretSees({x:P.x,y:P.y-1.7,z:P.z},a))continue;bd=d;best=o}
 if(!best){const t=target();if(t&&!t.userData.a&&(t.userData.k==='crate'||t.userData.k==='dev'||t.userData.k==='drop'||t.userData.k==='recycler'||t.userData.k==='hemp'||t.userData.k==='bush'||t.userData.k==='junk'||t.userData.k==='barrel'))return false}
 mCd=M.cd;mSt=M.st;mD=M.cd*1.12;mT=mD;slashDir=-slashDir;swingHit=best?1:0;
 camK+=M.st==='smash'?.014:M.st==='thrust'?.008:.006;
 blip(M.st==='smash'?110:M.st==='thrust'?195:285,.065,'sawtooth');
 if(best){const slot=sel;setTimeout(()=>{if(dead||sel!==slot||SL[slot]!==s)return;const a=best.userData.a;if(!a||a.hp<=0)return;if(Math.hypot(best.position.x-P.x,best.position.z-P.z)>M.reach+1.2)return;hit(best,M);hitMark();camK-=.02;camR+=slashDir*.018;shake=Math.max(shake,.018);hitFx(best.position.x,best.position.y+1,best.position.z,true)},mD*380)}
 else S.energy=Math.max(0,S.energy-1);
 return true}
function act(){if(dead)return;{const s=SL[sel];if(s&&(ITEMS[s.id].bd||ITEMS[s.id].dv))return buildAct(s)}{const hi=heldIt();if(hi&&hi.tool&&toolCd>0)return}if(tool('hammer')&&hammerTarget())return hammerAct();if(meleeAct())return;const o=target()||closestUse();
 if(!o){
  const chip=toolPiece();if(chip&&(tool('hatchet')||tool('pickaxe')||tool('rock')))return chopPiece(chip);
  if(canDrink()){S.thirst=Math.min(100,S.thirst+30);return say('You drink the water.')}
  if(useSlot(sel))return;
  // Always play a physical air-swing when holding a Rock, Hatchet, Pickaxe, or Hammer even if nothing is in reach!
  const s=SL[sel],id=s&&s.id;
  if(heldIt()&&heldIt().tool){
   if(swing<=0){startSwing(null,false);blip(id==='pickaxe'?145:id==='rock'?160:185,.05,'sine');S.energy=Math.max(0,S.energy-.5)}
   return;
  }
  return say('Nothing in reach.');
 }
 if(o.userData.k==='recycler')return openRecycler(o.userData.rc);
 if(o.userData.k==='drop')return pickupDropObject(o);
 if(o.userData.k==='dev'){const d=o.userData.d;if(d&&d.t==='tc'&&d.owner!=='you'&&(tool('hatchet')||tool('pickaxe')||tool('rock'))){startSwing(null,true);impactSurfaceFx('wood',d.x,d.y,d.z);d.hp-=(tool('pickaxe')?24:tool('hatchet')?16:8)*TMUL[toolTier()];wbPoke(d);wear();pokeBase(d.x,d.z);if(d.hp<=0){killDev(d);say('Their tool cupboard is down. You can build here now.')}else say('You chop the cupboard. '+Math.max(0,Math.ceil(d.hp))+' left.');return}return devAct(o)}
 if(o.userData.k==='crate')return openCrate(o);
 startSwing(null,true);
 if(o.userData.a){hitFx(o.position.x,o.position.y+1,o.position.z,true);camK-=.016;return hit(o)}
 S.energy=Math.max(0,S.energy-(toolTier()>=3?.4:toolTier()===2?1.4:2));const k=o.userData.k;
 if(k==='tree'){const h=tool('hatchet'),rk=tool('rock');if(!h&&!rk)return say('You need a rock or hatchet to chop trees.');const n=dropN(ty('tree'));if(!room('wood',n))return say('Inventory full.');impactSurfaceFx('tree',o.position.x,o.position.y,o.position.z);if(give('wood',n)){if(h)wear();if(--o.userData.uses<=0)remove(o)}}
 else if(k==='junk'||k==='barrel'){
  if(k==='barrel'&&!tool('hatchet')&&!tool('pickaxe')&&!tool('rock')&&!(SL[sel]&&ITEMS[SL[sel].id]&&ITEMS[SL[sel].id].mel))return say('You need a tool or melee weapon to break open barrels.');
  const raw=k==='barrel'?barrelLoot(o.userData.kind):loot(),L={};
  for(const q in raw)if(raw[q]){
   // Guaranteed 2-6 Scrap on barrels (never scaled below raw[q])
   L[q]=(k==='barrel'&&q==='scrap')?Math.max(raw[q],dropN(raw[q])):dropN(raw[q]);
  }
  for(const q in L)if(L[q]&&!room(q,L[q]))return say('Inventory full.');
  impactSurfaceFx('metal',o.position.x,o.position.y,o.position.z);
  for(const q in L)if(L[q])give(q,L[q]);
  RT.scavenge+=k==='barrel'?.28:.4;bumpHeat(.05);if(k==='barrel')wear();if(--o.userData.uses<=0)remove(o);
 }
 else if(k==='rock'){const h=tool('pickaxe'),rk=tool('rock');if(!h&&!rk)return say('You need a rock or pickaxe to mine stone.');const ns=dropN(ty('stone'));if(!room('stone',ns))return say('Inventory full.');impactSurfaceFx('rock',o.position.x,o.position.y,o.position.z);if(give('stone',ns)){if(h){const no=dropN(ty('rockOre'));if(room('ore',no))give('ore',no)}if(Math.random()<(h?.42+.12*(toolTier()-1):0)){const nu=dropN(h?1+(Math.random()*2|0):1);if(room('sulfur',nu))give('sulfur',nu)}if(h)wear();if(--o.userData.uses<=0)remove(o)}}
 else if(k==='sulfur'){const h=tool('pickaxe'),rk=tool('rock');if(!h&&!rk)return say('You need a pickaxe or rock to mine sulfur.');const n=dropN(ty('sulf'));if(!room('sulfur',n))return say('Inventory full.');impactSurfaceFx('sulfur',o.position.x,o.position.y,o.position.z);if(give('sulfur',n)){if(h)wear();if(--o.userData.uses<=0)remove(o)}}
 else if(k==='ore'){const h=tool('pickaxe'),rk=tool('rock');if(!h&&!rk)return say('You need a pickaxe or rock to mine ore.');const n=dropN(ty('ore')),ns=dropN(ty('oreS'));if(!room('ore',n)||!room('stone',ns))return say('Inventory full.');impactSurfaceFx('ore',o.position.x,o.position.y,o.position.z);if(give('ore',n)){give('stone',ns);if(h)wear();if(--o.userData.uses<=0)remove(o)}}
 else if(k==='hemp'){
  const nc=Math.max(2,dropN(4)),nf=Math.max(3,dropN(6));
  if(!room('cloth',nc)||!room('fiber',nf))return say('Inventory full.');
  startSwing('use',false,.30);blip(340,.04,'triangle');
  give('cloth',nc);give('fiber',nf);
  RT.scavenge+=.15;remove(o);
 }
 else{const nb=dropN(3),nf=Math.max(2,dropN(3)),nc=Math.max(1,dropN(2));if(!room('berry',nb))return say('Inventory full.');if(give('berry',nb)){if(room('fiber',nf))give('fiber',nf);if(room('cloth',nc))give('cloth',nc);o.userData.ready=45;o.userData.f.visible=false}}}
// ===== INVENTORY SYSTEM =====
const ITEMS={
 wood:{n:'Wood',i:'🪵',max:1000,d:'Basic crafting material.'},
 stone:{n:'Stone',i:'🪨',max:1000,d:'Used to make tools.'},
 fiber:{n:'Plant Fiber',i:'🌿',max:200,d:'Stringy fibre from bushes. Makes bandages.'},
 berry:{n:'Berries',i:'🍓',max:20,use:'Eat',d:'Restores 12 food. Eating is what lets stamina come back.',fx:()=>{S.hunger=Math.min(100,S.hunger+12);S.energy=Math.min(100,S.energy+8)}},
 bandage:{n:'Bandage',i:'🩹',max:5,use:'Apply',d:'Restores 25 health.',fx:()=>S.health=Math.min(100,S.health+25)},
 hatchet:{n:'Stone Hatchet',i:'🪓',max:1,dur:40,tool:'hatchet',d:'Equip in hotbar. Needed to chop trees: 4 wood each.'},
 pickaxe:{n:'Stone Pickaxe',i:'⛏',max:1,dur:40,tool:'pickaxe',d:'Equip in hotbar. Needed to mine stone, ore and sulfur. Rocks give 3 stone.'},
 rock:{n:'Rock',i:'🪨',max:1,tool:'rock',d:'Your starter tool. Chops trees for 2 wood and chips rocks for 1 stone, slowly. Never breaks. Use it to get wood and stone for a hatchet and pickaxe.'},
 campfire:{n:'Campfire',i:'🔥',max:5,use:'Place',d:'Place in front of you. Burns for about half a day at whatever speed the clock is set to.',fx:()=>campfire()},bedroll:{n:'Bedroll',i:'🛏',max:1,use:'Place',d:'Where you wake. The tenth-night crew still goes for your tool cupboard first.',fx:()=>placeClaim()}
};
const REC=[{out:'hatchet',q:1,need:{wood:4,stone:3}},{out:'pickaxe',q:1,need:{wood:4,stone:4}},{out:'campfire',q:1,need:{wood:4}},{out:'bandage',q:1,need:{fiber:3}},{out:'bedroll',q:1,need:{cloth:10,rope:1,fiber:6}}];
let curBox=null;const SL=new Proxy(Array(54).fill(null),{get(t,k){const i=typeof k==='string'?+k:NaN;return i>=30&&i<54?(curBox?curBox.sl[i-30]:null):t[k]},set(t,k,v){const i=typeof k==='string'?+k:NaN;if(i>=30&&i<54){if(curBox)curBox.sl[i-30]=v;return true}t[k]=v;return true}});// 0-5 hotbar, 6-29 bag, 30+ open container
let sel=0,pick=null,tab='bag',open=false,fxS='',lq=-1;let craftSel=null,eqPick=null,CHV=null,fxQ=-1;const EQS=[['head','Head','⛑'],['chest','Chest','🦺'],['legs','Legs','🛡'],['feet','Feet','🥾']],EQB={head:15,chest:35,legs:15,feet:5};
// ===== TOOL TIERS: Rock (0), Stone (1), Metal (2), Powered (3) =====
Object.assign(ITEMS,{
 metal_hatchet:{n:'Metal Hatchet',i:'🪓',max:1,dur:130,tool:'hatchet',tier:2,d:'Tier 2 axe with a forged steel head. Swings faster and drops much more wood than stone. Hold Use to keep chopping.'},
 chainsaw:{n:'Chainsaw',i:'🪚',max:1,dur:450,tool:'hatchet',tier:3,cd:.13,d:'Tier 3 axe. A petrol chainsaw that tears through trees. Hold Use to cut. The fastest wood gatherer, and it cuts walls and raiders too.'},
 metal_pickaxe:{n:'Metal Pickaxe',i:'⛏',max:1,dur:130,tool:'pickaxe',tier:2,d:'Tier 2 pickaxe with a forged steel head. Swings faster and mines more stone, ore and sulfur. Hold Use to keep mining.'},
 jackhammer:{n:'Jackhammer',i:'🛠',max:1,dur:450,tool:'pickaxe',tier:3,cd:.11,d:'Tier 3 pickaxe. A pneumatic jackhammer that pulverises rock. Hold Use to drill. The fastest stone, ore and sulfur miner.'}
});
ITEMS.hatchet.tier=1;ITEMS.hatchet.d='Tier 1 axe. Equip it in the hotbar to chop trees. Hold Use to keep swinging.';
ITEMS.pickaxe.tier=1;ITEMS.pickaxe.d='Tier 1 pickaxe. Equip it in the hotbar to mine stone, ore and sulfur. Hold Use to keep swinging.';
ITEMS.rock.d+=' Hold Use to keep swinging.';
REC.push({out:'metal_hatchet',q:1,need:{metal:24,wood:6}},{out:'metal_pickaxe',q:1,need:{metal:28,wood:6}},
 {out:'chainsaw',q:1,need:{metal:60,gears:4,pipe:2,spring:2,scrap:30}},{out:'jackhammer',q:1,need:{metal:70,gears:5,pipe:3,spring:3,scrap:40}});
// yields per swing by tool tier [rock, stone, metal, powered]
const TOOLTY={tree:[2,4,7,12],stone:[1,3,5,9],ore:[2,4,6,10],oreS:[1,2,3,5],sulf:[2,4,6,10],rockOre:[0,2,3,5]},TOOLCD=[.6,.5,.38,.13],CMUL=[1,1,1.5,.7],TMUL=[1,1,1.7,2.4];
let toolCd=0,engT=0;
const heldIt=()=>{const q=SL[sel];return q?ITEMS[q.id]:null};
const toolTier=()=>{const it=heldIt();return it&&it.tool?(it.tier||0):0};
const ty=k=>TOOLTY[k][toolTier()];
const cnt=id=>SL.slice(0,30).reduce((a,s)=>a+(s&&s.id===id?s.n:0),0);
function room(id,n){let r=0;const m=ITEMS[id].max;for(const s of SL.slice(0,30)){if(!s)r+=m;else if(s.id===id)r+=m-s.n}return r>=n}
function give(id,n,quiet){if(!room(id,n)){say('Inventory full.');return false}
 const m=ITEMS[id].max;let left=n;
 for(const s of SL.slice(0,30))if(s&&s.id===id&&left>0){const a=Math.min(m-s.n,left);s.n+=a;left-=a}
 for(let i=0;i<30&&left>0;i++)if(!SL[i]){const a=Math.min(m,left);SL[i]={id,n:a,dur:ITEMS[id].dur,mag:ITEMS[id].gun?0:undefined};left-=a}
 if(!quiet)toast(id,n);render();return true}
function take(id,n){for(let i=29;i>=0&&n>0;i--){const s=SL[i];if(s&&s.id===id){const a=Math.min(s.n,n);s.n-=a;n-=a;if(!s.n)SL[i]=null}}render()}
function toolPiece(){const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let best=null,bd=2.35;for(const c of ALLC){if(!(c.piece&&c.hp>0)&&!(c.d&&c.d.hp>0&&!c.d.open&&!c.d._gone))continue;const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2,dx=cx-P.x,dz=cz-P.z,d=Math.hypot(dx,dz)||1;if(d>2.2)continue;if((dx*fx+dz*fz)/d<0.05&&d>1.2)continue;if(d<bd){bd=d;best=c}}return best}
function chopPiece(c){startSwing(null,true);impactSurfaceFx('wood',(c.x0+c.x1)/2,c.y||1,(c.z0+c.z1)/2);const pk=tool('pickaxe'),dmg=(pk?22:14)*TMUL[toolTier()]*(c.d?1.15:1);wear();
 const own=c.owner||(c.d&&c.d.owner),cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2;
 if(c.d){c.d.hp-=dmg;wbPoke(c.d);if(own==='npc')pokeBase(cx,cz);if(c.d.hp<=0){const was=c.d.t;killDev(c.d);say(was==='tc'?'Tool cupboard destroyed. Privilege dropped.':was==='door'?'The door gives.':'It breaks.')}else say(c.d.t==='tc'?'You work the cupboard.':'You work the door.');return}
 c.hp-=dmg;for(const o of ALLC)if(o.mesh===c.mesh)o.hp=c.hp;wallDmg(c,1);wbPoke(c);if(own==='npc')pokeBase(cx,cz);if(c.hp<=0)smashPiece(c);else say(pk?'The pick bites the wall.':'You chop the wall.')}
function roofed(x,z){const cx=Math.round(x/C),cz=Math.round(z/C);if(!FD.has(key(cx,cz)))return false;for(let L=0;L<6;L++)if(RF.has(key(cx,cz,L)))return true;return false}
function precipAt(x,z){if(wx!=='rain'&&wx!=='storm'&&wx!=='snow')return 0;return roofed(x,z)?0:1}
function wxSlow(){if(wx==='snow'&&precipAt(P.x,P.z))return .84;if(wx==='storm'&&precipAt(P.x,P.z))return .93;return 1}
function rollWx(){const night=dl()<.28;const bag=night?['fog','fog','snow','rain','overcast','clear','storm']:['clear','clear','overcast','rain','rain','fog','snow','storm'];let n=bag[Math.random()*bag.length|0];if(n===wx)n=bag[(bag.indexOf(n)+3)%bag.length];return n}
function fallPrecip(sys,dt,fall,wind){const a=sys.pos;for(let i=0;i<sys.n;i++){a[i*3]+=wind*dt;a[i*3+1]-=fall*sys.spd[i]*dt;if(a[i*3+1]<0||a[i*3]>22||a[i*3]<-22){a[i*3]=(Math.random()-.5)*40;a[i*3+1]=16+Math.random()*8;a[i*3+2]=(Math.random()-.5)*40}}sys.g.attributes.position.needsUpdate=true}
const wxTint=new T.Color(),boltWhite=new T.Color(0xeef4ff);
function tintWeather(dt){const hex=wx==='storm'?0x3e4c58:wx==='rain'?0x6d7c86:wx==='fog'?0xc5cdc8:wx==='snow'?0xd5dde4:wx==='overcast'?0x8a9398:0;const amt=wx==='clear'?0:wx==='overcast'?.4:wx==='fog'?.7:wx==='snow'?.5:wx==='rain'?.58:.74;
 if(hex){wxTint.setHex(hex);scene.background.lerp(wxTint,amt);scene.fog.color.copy(scene.background)}
 const fd=wx==='fog'?.03:wx==='storm'?.017:wx==='rain'?.0125:wx==='snow'?.0135:wx==='overcast'?.009:.0072;
 scene.fog.density+=(fd-scene.fog.density)*Math.min(1,dt*1.4);
 const wet=wx==='rain'||wx==='storm',flake=wx==='snow';
 rainFx.p.visible=wet;snowFx.p.visible=flake;rainFx.mat.opacity=wet?(wx==='storm'?.72:.5):0;snowFx.mat.opacity=flake?.85:0;
 if(wet)fallPrecip(rainFx,dt,wx==='storm'?18:13,wx==='storm'?7:3.2);if(flake)fallPrecip(snowFx,dt,4.2,1.4);
 const u=WM.uniforms;u.uFog.value.copy(scene.fog.color);u.uFogD.value=scene.fog.density;u.uSky.value.copy(scene.background)}
function lightningAt(x,z){const y=Math.max(H(x,z),0),m=new T.Mesh(new T.BoxGeometry(.22,46,.22),new T.MeshBasicMaterial({color:0xe7f1ff}));m.position.set(x,y+22,z);scene.add(m);
 const l=new T.PointLight(0xd7e7ff,6,36);l.position.set(x,y+8,z);scene.add(l);setTimeout(()=>{scene.remove(m);scene.remove(l);m.geometry.dispose();m.material.dispose()},110);
 const dist=Math.hypot(P.x-x,P.z-z);if(dist<7.5&&precipAt(P.x,P.z))hurtP(18+Math.random()*16,'Lightning');else if(dist<22)shake=Math.max(shake,(1-dist/22)*.28);blip(48,.22,'square')}
function weatherTick(dt,fwd){const step=Math.min(dt*(fwd||0)*(pace/REF_PACE),.5);if(step<=0)return;wxT-=step;if(wxT<=0){wx=rollWx();wxT=55+Math.random()*70;say(WXSAY[wx]);wxBolt=2+Math.random()*4}
 if(wx==='storm'){wxBolt-=step;if(wxBolt<=0){wxBolt=5+Math.random()*8;boltT=.16;const ang=Math.random()*6.28,r=8+Math.random()*34;lightningAt(P.x+Math.cos(ang)*r,P.z+Math.sin(ang)*r)}}}
function ensureStarter(){const has=id=>SL.slice(0,30).some(s=>s&&s.id===id);if(!has('rock')&&!(has('hatchet')&&has('pickaxe')))give('rock',1,true)}
function wear(){const s=SL[sel];if(s&&ITEMS[s.id].tool==='rock')return;if(s&&--s.dur<=0){SL[sel]=null;say(ITEMS[s.id].n+' broke!')}render()}
function tool(k){const s=SL[sel];return s&&ITEMS[s.id].tool===k?s:null}
function toast(id,n){const d=document.createElement('div');d.className='toast';d.innerHTML='+'+n+' '+ico(id)+' '+ITEMS[id].n;$('toasts').prepend(d);setTimeout(()=>d.remove(),2600)}
function useSlot(i){const s=SL[i];if(!s||dead||!ITEMS[s.id].use)return false;if(ITEMS[s.id].fx()===false)return false;startSwing('use',false,.34);if(--s.n<=0)SL[i]=null;render();return true}
function selSlot(i){if(i===sel&&SL[i]&&ITEMS[SL[i].id].use)useSlot(i);else{sel=i;const q=SL[i];if(q&&(ITEMS[q.id].bd||ITEMS[q.id].dv))say('Aim and press Use to place. Green ghost = valid.');else if(q&&q.id==='wire')say('Wire tool: Use on one device, then on another.');else if(q&&ITEMS[q.id].plant)say('Aim at a wall and press Use to set the charge.');else if(q&&ITEMS[q.id].nade)say(q.id==='satchel'?'Use throws it. It sticks to the first wall.':'Use / Fire to throw.');else if(q&&q.id==='launcher')say('Loads rockets. Use / Fire to launch.');else if(q&&ITEMS[q.id].mel)say('Use / Fire to swing. Aim at what you want to hit.');else if(q&&ITEMS[q.id].gun)say('Use / Fire to shoot. R reloads. T swaps ammo.')}render()}
function canPlace(i,s){if(!s)return true;if(i<30)return true;if(!curBox||i-30>=curBox.sl.length)return false;if(curBox.t==='tc')return s.id==='wood'||s.id==='stone'||s.id==='metal';if(curBox.t==='furnace'){const k=i-30;return k<3&&(s.id==='ore'||s.id==='wood'||s.id==='fuel')}if(curBox.t==='recycler')return i-30<3&&!!RY[s.id];return true}
function move(a,b,quiet){if(a===b)return true;const x=SL[a],y=SL[b];if((x&&!canPlace(b,x))||(y&&!canPlace(a,y))){if(!quiet){if(curBox&&curBox.t==='tc')say('The cupboard only holds wood, stone and metal. That is the upkeep.');else if(curBox&&curBox.t==='furnace')say('Furnace inputs take Metal Ore, Wood and Low Grade Fuel. The output slots are take-only.');else say('That slot will not take it.')}return false}if(x&&y&&x.id===y.id&&ITEMS[x.id].max>1){const m=Math.min(ITEMS[x.id].max-y.n,x.n);y.n+=m;x.n-=m;if(!x.n)SL[a]=null}else{SL[a]=y;SL[b]=x}return true}
function xferPick(){if(pick===null||!SL[pick])return;if(!curBox)return say('Open a box, furnace or cupboard first.');const dest=[];if(pick>=30)for(let i=0;i<30;i++)dest.push(i);else for(let i=0;i<curBox.sl.length;i++)dest.push(30+i);for(const b of dest){if(!SL[pick])break;const y=SL[b];if(!y||(y.id===SL[pick].id&&ITEMS[y.id].max>1&&y.n<ITEMS[y.id].max))move(pick,b,true)}if(!SL[pick])pick=null;else say('No room for the rest.')}
function xferAll(dir){if(!curBox)return;const src=[],dest=[];if(dir==='take'){for(let i=0;i<curBox.sl.length;i++)src.push(30+i);for(let i=0;i<30;i++)dest.push(i)}else{for(let i=6;i<30;i++)src.push(i);for(let i=0;i<curBox.sl.length;i++)dest.push(30+i)}for(const a of src){if(!SL[a])continue;for(const b of dest){if(!SL[a])break;const y=SL[b];if(!y||(y.id===SL[a].id&&ITEMS[y.id].max>1&&y.n<ITEMS[y.id].max))move(a,b,true)}}}
function clickSlot(i){if(!open)return selSlot(i);eqPick=null;
 if(pick===null||!SL[pick]||pick===i){if(pick===i)pick=null;else{if(i<6)sel=i;pick=SL[i]?i:null}}
 else if(!SL[i]||SL[i].id===SL[pick].id){const from=pick;if(move(from,i))pick=SL[from]?from:(SL[i]?i:null)}
 else{if(i<6)sel=i;pick=i}
 render()}
function dragDrop(i,one){const q=SL[i];if(!q||dead)return;const n=one?1:q.n;tossItemFromPlayer(q,n);q.n-=n;if(q.n<=0)SL[i]=null;pick=null;eqPick=null;render();persist()}
function dragStart(ev,i,el){const x0=ev.clientX,y0=ev.clientY;let g=null;
 const inUI=e=>{const t=document.elementFromPoint(e.clientX,e.clientY);return !!(t&&t.closest&&t.closest('#panel,#hot'))};
 const at=e=>{const t=document.elementFromPoint(e.clientX,e.clientY);return t&&t.closest?t.closest('.slot[data-i]'):null};
 const mv=e=>{if(!g&&Math.hypot(e.clientX-x0,e.clientY-y0)>6){g=document.createElement('div');g.className='slot dragg';g.innerHTML=el.innerHTML;g.style.cssText='position:fixed;z-index:9;pointer-events:none;width:'+el.offsetWidth+'px;height:'+el.offsetHeight+'px';root.appendChild(g);el.classList.add('src');hideTip()}
  if(g){g.style.left=e.clientX-g.offsetWidth/2+'px';g.style.top=e.clientY-g.offsetHeight/2+'px';root.querySelectorAll('.slot.tgt').forEach(n=>n.classList.remove('tgt'));const t=at(e);if(t&&+t.dataset.i!==i)t.classList.add('tgt');g.classList.toggle('out',!t&&!inUI(e))}};
 const off=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',cx)};
 const up=e=>{off();if(!g)return clickSlot(i);g.remove();const t=at(e);if(t&&+t.dataset.i!==i){const d=+t.dataset.i;pick=null;eqPick=null;if(move(i,d))pick=SL[d]?d:(SL[i]?i:null)}else if(!t&&!inUI(e))return dragDrop(i,!!e.shiftKey);render()};
 const cx=()=>{off();if(g)g.remove();render()};
 addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',cx)}
function sEl(i){const s=SL[i],it=s&&ITEMS[s.id],d=document.createElement('div');d.className='slot'+(i===sel&&i<6?' on':'')+(pick===i?' pk':'');
 d.innerHTML=(i<6?'<small>'+(i+1)+'</small>':(i>=30&&curBox&&(isInd(curBox.t)||curBox.t==='recycler')?'<small>'+(i-30<3?'IN':'OUT')+'</small>':''))+(s?ico(s.id)+(it.gun?'<em>'+(s.mag||0)+'</em>':s.n>1?'<em>'+s.n+'</em>':'')+(s.dur?'<u style="width:'+(s.dur/it.dur*46)+'px"></u>':''):'');
 d.dataset.i=i;d.onpointerdown=ev=>{hideTip();if(!open||!SL[i]||ev.button>0)return clickSlot(i);dragStart(ev,i,d)};
 if(s&&it){const show=ev=>{const tip=$('tip');if(!tip)return;tip.innerHTML='<b>'+it.i+' '+it.n+'</b><p>'+it.d+'</p>';tip.style.display='block';const x=Math.min((innerWidth||390)-220,(ev.clientX||0)+12),y=Math.max(8,(ev.clientY||0)-78);tip.style.left=x+'px';tip.style.top=y+'px'};const showM=ev=>{if(ev.pointerType==='touch'||open)return hideTip();show(ev)};d.onpointerenter=showM;d.onpointermove=showM;d.onpointerleave=hideTip;d.onpointercancel=hideTip;d.onpointerup=ev=>{if(ev.pointerType==='touch')hideTip()}}
 return d}
const VD={health:'Damage taken. Bandages and food restore it.',hunger:'Eat to keep stamina regenerating.',thirst:'Drink to stay hydrated.',energy:'Spent sprinting and fighting.',warmth:'Stay near a campfire when it is cold.'};
function vit(k){const v=Math.round(S[k]),col=defs[k][1],low=v<(k==='warmth'?35:25);return '<div class="vit'+(low?' low':'')+'"><div class="vh"><span>'+defs[k][0]+' '+defs[k][2]+'</span><b>'+(k==='warmth'?tempWord(v)+' · ':'')+v+'</b></div><div class="bar"><i style="width:'+v+'%;background:'+(typeof col==='string'&&col[0]==='#'?col:'#cd412b')+'"></i></div><small>'+(VD[k]||'')+'</small></div>'}
function sortBag(){const all=[];for(let i=6;i<30;i++)if(SL[i]){all.push(SL[i]);SL[i]=null}all.sort((a,b)=>ITEMS[a.id].n.localeCompare(ITEMS[b.id].n)||b.n-a.n);const out=[];for(const q of all){const m=ITEMS[q.id].max,t=m>1&&out.find(o=>o.id===q.id&&o.n<m);if(t){const a=Math.min(m-t.n,q.n);t.n+=a;q.n-=a}if(q.n>0)out.push(q)}out.forEach((q,i)=>SL[6+i]=q)}
const CATS=['Components','Building','Electrical','Survival','Weapons','Clothing'];let craftCat='Survival';
const isDoor=t=>t==='door'||t==='metal_door'||t==='hq_door',isWin=t=>t==='window_bars'||t==='embrasure',isBox=t=>t==='box'||t==='box_s'||t==='box_l',isInd=t=>t==='furnace'||t==='refinery'||t==='pump_jack'||t==='quarry';
const COMP=['gears','circuit','charcoal','powder','explosives','leather','crude','targeting_computer','cctv'],ELEC=['solar','wind','battery','lamp','heater','switch','turret','wire'],BLD=['door','metal_door','hq_door','window_bars','embrasure','water_collector','bed','box_s','box','box_l','tc','furnace','refinery','pump_jack','quarry','workbench','spike','snap','barricade'],SURV=['medkit','hatchet','pickaxe','metal_hatchet','metal_pickaxe','chainsaw','jackhammer','spear','club','campfire','bandage','bedroll','bed','water_collector','cooked'];
function catOf(id){const it=ITEMS[id];if(it.arm)return 'Clothing';if(COMP.includes(id))return 'Components';if(ELEC.includes(id))return 'Electrical';if(it.bd||BLD.includes(id))return 'Building';if(SURV.includes(id))return 'Survival';return 'Weapons'}
const needWB=r=>{const c=catOf(r.out);return c==='Electrical'||c==='Weapons'||c==='Clothing'||['blade','sheet','propane','sewing_kit','tarp','fuse','pipe','spring','road_sign','semi_body','smg_body','explosives','targeting_computer','cctv','hq_door','gears','circuit','turret','metal_hatchet','metal_pickaxe','chainsaw','jackhammer'].includes(r.out)};
// Workbench tiers: three placeable benches. The best tier within 8 m counts.
const WB_TIERS={workbench:1,workbench2:2,workbench3:3};
const WB_T2=['pistol','shotgun','pump','smg','thompson','semi_body','smg_body','turret','targeting_computer','cctv','ammo_ap','ammo_inc','hq_door','snap'],WB_T3=['rifle','sar','ak','launcher','rocket','c4','explosives','chainsaw','jackhammer'];
const wbTier=()=>{let t=0;for(const d of devs){if(d._gone)continue;const k=WB_TIERS[d.t];if(k>t&&Math.hypot(P.x-d.x,P.z-d.z)<8)t=k}return t};
const nearWB=()=>wbTier()>0;
// Tier a recipe needs (0 = no bench). Everything that already needed a bench is Tier 1 unless listed above.
const wbNeed=r=>r.out==='workbench2'?1:r.out==='workbench3'?2:!needWB(r)?0:WB_T3.includes(r.out)?3:WB_T2.includes(r.out)?2:1;
const wbMsg=n=>n>1?'You need a Tier '+n+' Workbench in reach for that.':'You need a workbench in reach for that.';
REC.push({out:'gears',q:1,need:{metal:8,wood:2}});REC.push({out:'circuit',q:1,need:{metal:6,fiber:5}});
const RY={tech:{scrap:10,circuit:1},targeting_computer:{scrap:15,tech:1,circuit:2,metal:8},cctv:{scrap:8,circuit:1,gears:1,metal:4},explosives:{powder:6,sulfur:2,fuel:1},spring:{scrap:5,metal:6},sheet:{scrap:3,metal:8},pipe:{scrap:2,metal:6},semi_body:{scrap:8,metal:15},smg_body:{scrap:12,metal:20},gears:{metal:6},circuit:{metal:4,fiber:3},powder:{sulfur:1,charcoal:1},snap:{metal:6,gears:1},wire:{metal:2},turret:{metal:14,gears:2,circuit:1},rocket:{metal:6,powder:8}};
const RECYS=[];let ra=0;
function recyTick(){const dt=Math.min(.25,Math.max(0,age-ra));ra=age;for(const r of RECYS){const sl=r.sl,ii=sl.findIndex((q,i)=>i<3&&q&&RY[q.id]);if(ii<0){r.p=0;continue}r.p=(r.p||0)+dt;if(r.p<1.6)continue;const q=sl[ii],out=RY[q.id];
 const can=Object.keys(out).every(k=>{let sp=0;for(let i=3;i<6;i++){const o=sl[i];sp+=!o?ITEMS[k].max:o.id===k?ITEMS[k].max-o.n:0}return sp>=out[k]});if(!can)continue;r.p=0;
 for(const k in out){let left=out[k];for(let i=3;i<6&&left>0;i++){const o=sl[i];if(o&&o.id===k){const a=Math.min(ITEMS[k].max-o.n,left);o.n+=a;left-=a}}for(let i=3;i<6&&left>0;i++)if(!sl[i]){const a=Math.min(ITEMS[k].max,left);sl[i]={id:k,n:a};left-=a}}
 if(--q.n<=0)sl[ii]=null;if(open&&curBox===r)render(true)}}
function openRecycler(r){curBox=r;open=true;tab='bag';pick=null;render();lookLock(false);say('Recycler: drop components in, take the resources out.')}
function mkRecycler(x,z,ang,deckY){const g=new T.Group(),bx=(w,h,d,X,Y,Z,c)=>{const m=new T.Mesh(boxGeo(w,h,d),cmat(c));m.position.set(X,Y,Z);g.add(m);return m},ry=deckY!=null?deckY:G(x,z,H(x,z)+2),rc={t:'recycler',sl:Array(6).fill(null),x,z,y:ry,p:0};
 bx(1.5,1.7,1.1,0,.85,0,0x3d4a44);bx(1.66,.14,1.26,0,1.77,0,0xc4552a);bx(.9,.62,.06,0,.95,.58,0x0d0d0d);bx(1.52,.12,1.12,0,.3,0,0xc9b020);bx(.12,.5,.9,.82,1.1,0,0x2a3330);bx(.12,.5,.9,-.82,1.1,0,0x2a3330);
 g.position.set(x,rc.y,z);g.rotation.y=ang||0;g.userData={k:'recycler',rad:.92,rc};scene.add(g);things.push(g);RECYS.push(rc);
 const ca=Math.abs(Math.cos(ang||0)),sa=Math.abs(Math.sin(ang||0)),hx=(1.56*ca+1.16*sa)*.5,hz=(1.56*sa+1.16*ca)*.5;
 ALLC.push({x0:x-hx,x1:x+hx,z0:z-hz,z1:z+hz,y:rc.y,h:1.82,recy:1})}
function btn(l,f){const b=document.createElement('button');b.textContent=l;b.onpointerdown=f;return b}
function nearFire(){return fires.some(q=>Math.hypot(P.x-q.x,P.z-q.z)<7)||devs.some(d=>(d.t==='furnace'||d.t==='refinery')&&d.burn>0&&Math.hypot(P.x-d.x,P.z-d.z)<6)}
function priced(r){const o={};for(const k in r.need)o[k]=costN(r.need[k]);return o}
function craft(r){const fr=ch('free'),need=priced(r);if(RCOST[r.out]&&!BPK.has(r.out)&&!fr)return say('Locked. Research '+ITEMS[r.out].n+' at a Research Table or Workbench.');if(!fr&&!Object.keys(need).every(k=>cnt(k)>=need[k]))return;if(r.fire&&!nearFire()&&!fr)return say('Stand near a fire to cook.');if(wbNeed(r)>wbTier()&&!fr)return say(wbMsg(wbNeed(r)));if(!fr)for(const k in need)take(k,need[k]);if(!give(r.out,r.q)){if(!fr)for(const k in need)give(k,need[k],1);return}say('Crafted '+ITEMS[r.out].n)}
function effects(){const a=[];
 if(S.warmth<20)a.push(['🥶','Freezing','#2d6a9f']);else if(S.warmth<35)a.push(['❄','Cold','#4a86b5']);
 if(wx==='storm')a.push(['⛈','Storm','#3e4a54']);else if(wx==='rain')a.push(['🌧','Rain','#3f5a6a']);else if(wx==='snow')a.push(['🌨','Snow','#5a6874']);else if(wx==='fog')a.push(['🌫','Fog','#6a706c']);else if(wx==='overcast')a.push(['☁','Overcast','#4a5550']);
 if(fires.some(q=>Math.hypot(P.x-q.x,P.z-q.z)<7))a.push(['🔥','Warmed','#c4561f']);
 if(S.thirst<=0)a.push(['🏜','Dehydrated','#a33']);else if(S.thirst<25)a.push(['💧','Thirsty','#3f7fa8']);
 if(S.hunger<=0)a.push(['💀','Starving','#a33']);else if(S.hunger<25)a.push(['🍖','Hungry','#b87a24']);
 if(S.energy<20)a.push(['😮',S.hunger<=0?'Stamina stuck':'Winded','#6b6598']);
 if(devs.length)a.push(['⚡',Math.round(tg)+'W gen / '+Math.round(tu)+'W use  🔋'+Math.round(tb),'#4d6b2a']);if(WV.some(w=>Math.hypot(P.x-w.x,P.z-w.z)<25))a.push(['🐺','Wolves near','#7a4a22']);if(EN.length)a.push(['☠','Raiders '+EN.length,'#8a2222']);if(RN.length)a.push(['🌱','Regrowing '+RN.length,'#3d6b34']);if(armorRed()>0)a.push(['🛡','Armor '+Math.round(armorRed()*100)+'%','#4a5058']);{const dr=daysToRaid();a.push([dr?'☾':'☠',dr?'Raid in '+dr+'d':'Raid tonight',dr?'#3d4a38':'#8a2222']);}if(heatStars())a.push(['⚠','Heat '+heatStars(),'#8a3a22']);if(CLAIM)a.push([CLAIM.kind==='bed'?'🛏':'⚑',CLAIM.kind==='bed'?'Respawn Bed set':'Bedroll set','#6b4a2a']);const myTc=devs.find(d=>d.t==='tc'&&d.owner==='you'&&!d._gone);if(myTc)a.push([myTc.paid===false?'⚠':'🔒',myTc.paid===false?'Cupboard decaying':'Cupboard holds','#6b4a2a']);return a}
function hideTip(){const t=$('tip');if(t)t.style.display='none'}
const tipGuard=ev=>{const t=$('tip');if(!t||t.style.display==='none')return;if(ev.type!=='pointermove'||!(ev.target&&ev.target.closest&&ev.target.closest('.slot')))hideTip()};
window.addEventListener('pointermove',tipGuard);window.addEventListener('pointerdown',tipGuard);window.addEventListener('blur',tipGuard);document.addEventListener('mouseleave',tipGuard);document.addEventListener('visibilitychange',tipGuard);
// ===== BAG PANEL: grid on the left, details on the right, Esc / X to close =====
const kindOf=it=>it.arm?'Clothing':it.tool?'Tool':it.gun?'Weapon':it.use?'Consumable':'Resource';
function bpEl(t,c,h){const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function pbtn(l,f,cls){const b=btn(l,f);if(cls)b.className=cls;return b}
function boxInfo(){const b=curBox;if(!b)return '';
 if(b.t==='furnace')return '<p>Slots 1–3 take Metal Ore plus Wood or Low Grade Fuel. Slots 4–6 are the output. '+(b.burn>0?'🔥 Burning '+Math.ceil(b.burn)+'s':'Not burning')+'</p>';
 if(b.t==='refinery')return '<p>Slots 1–3: Crude Oil plus Wood or Low Grade Fuel. Slots 4–6: refined Low Grade Fuel (1 Crude Oil → 3 Low Grade Fuel). '+(b.burn>0?'🔥 Refining '+Math.ceil(b.burn)+'s':'Not burning')+'</p>';
 if(b.t==='pump_jack')return '<p>Slots 1–3: Low Grade Fuel. Slots 4–6: pumped Crude Oil (1 Fuel → 4–5 Crude Oil). '+(b.burn>0?'⛽ Pumping '+Math.ceil(b.burn)+'s':'Idle. Add Low Grade Fuel.')+'</p>';
 if(b.t==='quarry')return '<p>Slots 1–3: Low Grade Fuel. Slots 4–6: mined Stone, Metal Ore and Sulfur. '+(b.burn>0?'⛏ Mining '+Math.ceil(b.burn)+'s':'Idle. Add Low Grade Fuel.')+'</p>';
 if(b.t==='recycler')return '<p>Slots 1–3: drop in components (targeting computers, cameras, explosives, gears, circuits, powder, traps, turrets, wire, rockets, tech trash, springs, sheet, pipes, bodies). Slots 4–6: recovered resources and scrap, take-only. It runs while you stand nearby.</p>';
 if(b.t==='tc'){const c=b.cost||{},day=k=>Math.ceil((c[k]||0)*600);return '<p>Authorized. Privilege 26 m. Upkeep per day: wood '+day('wood')+', stone '+day('stone')+', metal '+day('metal')+'. '+(b.paid===false?'Decaying. Short on '+(b.short||'materials')+'.':'Supplied. The raid crew comes for this cupboard.')+'</p>'}
 if(b.t==='crate')return '<p>Take what you need. Drag a stack to your bag, or press Take all. Once it is empty the crate refills after a while.</p>';
 return '<p>Click a stack, then Transfer, or drag it across. Stacks of the same item combine up to their max.</p>'}
function sideEmpty(sd,msg){
 sd.appendChild(bpEl('div','sd-e','<span class="sd-i">☞</span><b>'+(msg||'Select an item')+'</b><p>'+(curBox&&tab==='bag'?'':'Click an item to read what it does. Drag it to move or stack it. Click an empty slot to move the selected item there.')+'</p>'));
 if(curBox&&tab==='bag'){const x=bpEl('div','sd-box','<b>'+(curBox.nm||NAMES[curBox.t])+'</b>'+boxInfo());sd.appendChild(x)}
 sd.appendChild(bpEl('div','sd-k','<span><kbd>Esc</kbd> close</span><span><kbd>I</kbd> bag</span><span><kbd>1–6</kbd> belt</span><span><kbd>G</kbd> drop</span>'))}
function sideItem(sd,id,s,acts){const it=ITEMS[id];
 sd.appendChild(bpEl('div','sd-h','<span class="big">'+ico(id)+'</span><div><b>'+it.n+'</b><small>'+kindOf(it)+(s&&it.max>1?' · Stack '+s.n+' / '+it.max:'')+(it.tier?' · Tier '+it.tier:'')+'</small></div>'));
 sd.appendChild(bpEl('p','sd-d',it.d));
 if(it.arm)sd.appendChild(bpEl('div','sd-s','<span>Cuts damage</span><b>'+EQB[it.arm]+'%</b>'));
 if(s&&it.gun)sd.appendChild(bpEl('div','sd-s','<span>Magazine</span><b>'+(s.mag||0)+'</b>'));
 if(s&&s.dur)sd.appendChild(bpEl('div','sd-s','<span>Durability</span><b>'+s.dur+' / '+it.dur+'</b>'));
 if(s&&s.dur)sd.appendChild(bpEl('div','bar','<i style="width:'+Math.round(s.dur/it.dur*100)+'%"></i>'));
 const r=bpEl('div','sd-a');for(const a of acts)r.appendChild(a);sd.appendChild(r)}
function bagItemActs(){const s=SL[pick],it=ITEMS[s.id],a=[];
 if(it.use)a.push(pbtn(it.use,()=>{useSlot(pick);if(!SL[pick])pick=null;render()},'pri'));
 if(it.gun)a.push(pbtn('Attachments',()=>{attTarget=SL[pick];if(pick<6)sel=pick;openAttUI()}));
 if(curBox)a.push(pbtn(pick>=30?'Take':'Store',()=>{xferPick();render()}));
 if(s.n>1)a.push(pbtn('Split',()=>{const e=SL.slice(0,30).findIndex(x=>!x);if(e<0)return say('No free slot.');const q=s.n>>1;s.n-=q;SL[e]={id:s.id,n:q,dur:s.dur,mag:s.mag};render()}));
 if(s.n>1)a.push(pbtn('Drop 1',()=>{tossItemFromPlayer(s,1);if(--s.n<=0){SL[pick]=null;pick=null}render();persist()}));
 a.push(pbtn(s.n>1?'Drop stack':'Drop',()=>{tossItemFromPlayer(s,s.n);SL[pick]=null;pick=null;render();persist()}));
 return a}
function igrid(from,to,cls){const g=bpEl('div','igrid'+(cls?' '+cls:''));for(let i=from;i<to;i++)g.appendChild(sEl(i));return g}
function bagUI(c,sd){
 if(curBox){c.appendChild(bpEl('div','ch2',(curBox.nm||NAMES[curBox.t])+' <span>'+curBox.sl.length+' slots</span>'));
  const g2=bpEl('div','igrid');for(let i=0;i<curBox.sl.length;i++)g2.appendChild(sEl(30+i));c.appendChild(g2);
  const mv=bpEl('div','row');mv.appendChild(btn('Take all',()=>{xferAll('take');pick=null;render()}));mv.appendChild(btn('Store bag',()=>{xferAll('store');pick=null;render()}));c.appendChild(mv)}
 c.appendChild(bpEl('div','ch2','Backpack <span>'+SL.slice(6,30).filter(Boolean).length+' / 24</span>'));c.appendChild(igrid(6,30));
 c.appendChild(bpEl('div','ch2','Belt <span>keys 1–6</span>'));c.appendChild(igrid(0,6,'belt'));
 const sr=bpEl('div','row');sr.appendChild(btn('Sort backpack',()=>{sortBag();pick=null;render()}));c.appendChild(sr);
 if(pick!==null&&SL[pick])sideItem(sd,SL[pick].id,SL[pick],bagItemActs());else sideEmpty(sd,curBox?'Open container':'Select an item')}
function craftUI(c,sd){
 const pr=bpEl('div','pills');for(const k of CATS){const pb=btn(k,()=>{craftCat=k;render()});if(k===craftCat)pb.className='on';pr.appendChild(pb)}c.appendChild(pr);
 const wbn=nearWB(),wst=bpEl('div','wbs '+(wbn?'ok':'no'),wbn?'Workbench Tier '+wbTier()+' in reach':'No workbench in reach. Electrical, weapons, clothing and components need one.');c.appendChild(wst);
 const list=REC.filter(x=>catOf(x.out)===craftCat&&!(ITEMS[x.out].bd&&ITEMS[x.out].bd.t!=='wood'));
 const can=r=>{const need=priced(r);return ch('free')||(!bpLocked(r.out)&&Object.keys(need).every(k=>cnt(k)>=need[k])&&(!r.fire||nearFire())&&wbNeed(r)<=wbTier())};
 for(const r of list){const it=ITEMS[r.out],need=priced(r),ok=can(r),e=bpEl('div','rc'+(craftSel===r.out?' on':'')+(ok?' go':' dim'));
  e.innerHTML='<span class="ic">'+ico(r.out)+'</span><div><b>'+it.n+(bpLocked(r.out)?' 🔒':'')+'</b><span class="cc">'+Object.keys(need).map(k=>'<span class="'+(cnt(k)>=need[k]?'ok':'no')+'">'+ITEMS[k].i+' '+cnt(k)+'/'+need[k]+'</span>').join('')+'</span></div><i class="dot"></i>';
  e.onpointerdown=()=>{craftSel=r.out;render()};c.appendChild(e)}
 const r=list.find(x=>x.out===craftSel);
 if(!r){sideEmpty(sd,'Pick a recipe');return}
 const it=ITEMS[r.out],need=priced(r),ok=can(r),lock=bpLocked(r.out),nb=wbNeed(r)>wbTier()&&!ch('free'),nf=r.fire&&!nearFire()&&!ch('free');
 const mx=ch('free')?99:Math.min(...Object.keys(need).map(k=>Math.floor(cnt(k)/need[k])));
 sd.appendChild(bpEl('div','sd-h','<span class="big">'+ico(r.out)+'</span><div><b>'+it.n+(r.q>1?' ×'+r.q:'')+'</b><small>'+catOf(r.out)+(it.tier?' · Tier '+it.tier:'')+'</small></div>'));
 sd.appendChild(bpEl('p','sd-d',it.d));
 if(it.arm)sd.appendChild(bpEl('div','sd-s','<span>Cuts damage</span><b>'+EQB[it.arm]+'%</b>'));
 sd.appendChild(bpEl('div','ch2','Needs'));
 sd.appendChild(bpEl('div','sd-n',Object.keys(need).map(k=>'<div class="'+(cnt(k)>=need[k]?'ok':'no')+'"><span>'+ico(k)+' '+ITEMS[k].n+'</span><b>'+cnt(k)+' / '+need[k]+'</b></div>').join('')));
 if(lock)sd.appendChild(bpEl('div','sd-w','Locked. Research it for '+RCOST[r.out]+' scrap at a Research Table, or '+Math.ceil(RCOST[r.out]*WB_RESEARCH_MULT)+' at a Tier '+rTier(r.out)+'+ Workbench.'));
 else if(nb)sd.appendChild(bpEl('div','sd-w',wbNeed(r)>1?'Needs a Tier '+wbNeed(r)+' Workbench in reach.':'Needs a workbench in reach.'));
 else if(nf)sd.appendChild(bpEl('div','sd-w','Stand near a fire to cook this.'));
 const a=bpEl('div','sd-a'),b1=pbtn('Craft',()=>craft(r),'pri');b1.disabled=!ok;a.appendChild(b1);
 if(it.max>1){const b5=pbtn('×5',()=>{for(let n=0;n<5;n++)craft(r);render()});b5.disabled=!ok||mx<5;a.appendChild(b5)}
 sd.appendChild(a)}
// ----- 3D character -----
function charInit(){if(CHV!==null)return CHV||null;
 const cv=document.createElement('canvas');cv.id='wcv';let rn;try{rn=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'low-power'})}catch(e){CHV=false;return null}
 rn.setClearColor(0x000000,0);const sc=new T.Scene(),cm=new T.PerspectiveCamera(28,1,.1,40);cm.position.set(0,1.02,5.1);cm.lookAt(0,.93,0);
 sc.add(new T.AmbientLight(0xb4b8c0,.95));const k=new T.DirectionalLight(0xfff0dc,1.05);k.position.set(2.5,3.5,4);sc.add(k);const rim=new T.DirectionalLight(0xe0642f,.9);rim.position.set(-3,2,-3);sc.add(rim);const fill=new T.DirectionalLight(0x6f8fb0,.35);fill.position.set(-3,1,3);sc.add(fill);
 const lam=(c)=>new T.MeshLambertMaterial({color:c}),pho=(c,sh)=>new T.MeshPhongMaterial({color:c,specular:0x666a6c,shininess:sh||40});
 const bx=(p,w,h,d,x,y,z,m)=>{const q=new T.Mesh(new T.BoxGeometry(w,h,d),m);q.position.set(x,y,z);p.add(q);return q};
 const fig=new T.Group();sc.add(fig);const body=new T.Group();fig.add(body);
 const skin=lam(0xd2a07a),hair=lam(0x2b2018),jacket=lam(0x7d3a26),jacket2=lam(0x5f2c1d),jeans=lam(0x3b4a5c),shoe=lam(0x2c2420),belt=lam(0x1d1b19),pack=lam(0x4a5636),strap=lam(0x2d3320);
 // legs
 const legs=[];for(const sx of[-1,1]){const lg=new T.Group();lg.position.set(sx*.115,.94,0);body.add(lg);bx(lg,.17,.46,.2,0,-.23,0,jeans);bx(lg,.15,.42,.18,0,-.67,0,jeans);lg.userData.shoe=bx(lg,.17,.09,.3,0,-.885,.045,shoe);legs.push(lg)}
 // torso
 bx(body,.37,.14,.23,0,.97,0,belt);const tor=new T.Group();tor.position.y=1.04;body.add(tor);bx(tor,.42,.5,.25,0,.25,0,jacket);bx(tor,.43,.05,.26,0,.05,0,jacket2);bx(tor,.06,.5,.26,0,.25,0,jacket2);bx(tor,.2,.08,.2,0,.52,0,jacket2);
 bx(tor,.1,.1,.1,0,.58,0,skin);
 const bp=bx(tor,.3,.38,.14,0,.28,-.2,pack);bx(tor,.32,.06,.15,0,.5,-.2,strap);bx(tor,.05,.4,.02,-.14,.28,.13,strap);bx(tor,.05,.4,.02,.14,.28,.13,strap);
 // head
 const hd=new T.Group();hd.position.set(0,1.72,0);body.add(hd);const hm=new T.Mesh(new T.SphereGeometry(.125,16,12),skin);hm.scale.set(1,1.1,1);hd.add(hm);
 const hc=new T.Mesh(new T.SphereGeometry(.132,16,10,0,6.2832,0,1.55),hair);hc.scale.set(1.02,1.1,1.05);hc.position.y=.012;hc.rotation.x=-.18;hd.add(hc);bx(hd,.17,.1,.1,0,-.08,.06,hair);
 bx(hd,.03,.025,.02,-.045,.01,.115,lam(0x15110d));bx(hd,.03,.025,.02,.045,.01,.115,lam(0x15110d));bx(hd,.04,.05,.04,0,-.03,.125,skin);
 // arms
 const arms=[];for(const sx of[-1,1]){const ar=new T.Group();ar.position.set(sx*.275,1.56,0);body.add(ar);bx(ar,.115,.3,.125,0,-.14,0,jacket);const el=new T.Group();el.position.y=-.3;ar.add(el);bx(el,.1,.27,.11,0,-.13,0,jacket);bx(el,.1,.05,.11,0,-.275,0,jacket2);bx(el,.085,.09,.09,0,-.34,0,skin);ar.rotation.z=sx*.09;arms.push([ar,el,sx])}
 // base footwear: low shoes shown when no boots
 const shoes=new T.Group();fig.add(shoes);shoes.visible=true;
 // worn gear
 const helmet=new T.Group();hd.add(helmet);const stl=pho(0x5b645d,50),stl2=pho(0x3c4540,30),tan=pho(0x7a5d3a,18);
 {const dome=new T.Mesh(new T.SphereGeometry(.158,18,12,0,6.2832,0,1.72),stl);dome.position.y=.02;dome.scale.set(1.02,1.08,1.08);helmet.add(dome);bx(helmet,.34,.03,.34,0,.0,0,stl2);bx(helmet,.04,.1,.3,0,.15,0,stl2);bx(helmet,.2,.04,.04,0,.035,.17,stl2);bx(helmet,.025,.07,.04,-.17,-.02,.05,stl2);bx(helmet,.025,.07,.04,.17,-.02,.05,stl2)}
 const vest=new T.Group();tor.add(vest);{bx(vest,.46,.4,.285,0,.27,0,stl2);bx(vest,.3,.26,.04,0,.3,.16,stl);bx(vest,.3,.22,.04,0,.31,-.15,stl);for(const sx of[-1,1]){bx(vest,.13,.07,.2,sx*.24,.5,0,stl);bx(vest,.1,.2,.02,sx*.1,.12,.145,stl2)}bx(vest,.47,.05,.29,0,.07,0,tan)}
 const pads=new T.Group();body.add(pads);
 const lgd=new T.Group();body.add(lgd);{for(const sx of[-1,1]){bx(lgd,.2,.24,.23,sx*.115,.76,.01,stl);bx(lgd,.19,.09,.22,sx*.115,.57,.03,stl2);bx(lgd,.17,.25,.2,sx*.115,.37,.015,stl);bx(lgd,.17,.03,.2,sx*.115,.5,.01,stl2)}}
 const boots=new T.Group();body.add(boots);{for(const sx of[-1,1]){bx(boots,.19,.2,.22,sx*.115,.17,-.005,tan);bx(boots,.19,.09,.33,sx*.115,.045,.04,lam(0x3a2c1c));bx(boots,.2,.02,.34,sx*.115,.0,.04,lam(0x15110d));bx(boots,.2,.03,.23,sx*.115,.28,-.005,lam(0x24201a))}}
 const sh=new T.Mesh(new T.CircleGeometry(.62,32),new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.32}));sh.rotation.x=-1.5708;sh.position.y=.003;sc.add(sh);
 const ring=new T.Mesh(new T.RingGeometry(.56,.6,48),new T.MeshBasicMaterial({color:0xe0642f,transparent:true,opacity:.75}));ring.rotation.x=-1.5708;ring.position.y=.006;sc.add(ring);
 // Legs hold shoes; armor boots cover them
 CHV={cv,rn,sc,cm,fig,body,legs,arms,hd,tor,shoes,helmet,vest,pads,lgd,boots,ry:.55,drag:false,vy:0,raf:0,t:0};
 let lx=0;cv.addEventListener('pointerdown',e=>{CHV.drag=true;lx=e.clientX;try{cv.setPointerCapture(e.pointerId)}catch(_){}});
 cv.addEventListener('pointermove',e=>{if(!CHV.drag)return;const d=e.clientX-lx;lx=e.clientX;CHV.ry+=d*.012;CHV.vy=d*.012});
 const end=()=>{CHV.drag=false};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);cv.addEventListener('lostpointercapture',end);
 return CHV}
function charSync(){const v=CHV;if(!v)return;v.helmet.visible=!!EQ.head;v.vest.visible=!!EQ.chest;v.lgd.visible=!!EQ.legs;v.boots.visible=!!EQ.feet;for(const l of v.legs)l.userData.shoe.visible=!EQ.feet}
function charLoop(now){const v=CHV;if(!v)return;v.raf=0;if(!open||tab!=='wear'||!v.cv.isConnected)return;
 const dt=Math.min(.05,Math.max(0,(now-(v.t||now))/1000));v.t=now;const dpr=Math.min(2,window.devicePixelRatio||1),w=v.cv.clientWidth,h=v.cv.clientHeight;
 if(w>0&&h>0&&(v.w!==w||v.h!==h)){v.w=w;v.h=h;v.rn.setPixelRatio(dpr);v.rn.setSize(w,h,false);v.cm.aspect=w/h;v.cm.fov=h/w>1.5?40:28;v.cm.updateProjectionMatrix()}
 if(!v.drag){v.ry+=dt*.5+v.vy;v.vy*=.92}const tt=now/1000;v.fig.rotation.y=v.ry;
 const br=Math.sin(tt*1.7);v.tor.scale.y=1+br*.008;v.hd.position.y=1.72+br*.004;v.hd.rotation.y=Math.sin(tt*.6)*.12;
 for(const[a,e,sx]of v.arms){a.rotation.x=Math.sin(tt*1.7+(sx>0?0:Math.PI))*.04;e.rotation.x=-.12-br*.02;a.rotation.z=sx*(.09+br*.01)}
 v.rn.render(v.sc,v.cm);v.raf=requestAnimationFrame(charLoop)}
function charStart(){const v=CHV;if(v&&!v.raf){v.t=0;v.raf=requestAnimationFrame(charLoop)}}
function wearUI(c,sd){
 const wrap=bpEl('div','wear'),vp=bpEl('div','wvp'),v=charInit();
 if(v){vp.appendChild(v.cv);charSync()}else vp.appendChild(bpEl('div','wnone','3D preview is not available on this device.'));
 vp.appendChild(bpEl('small','wh','Drag to turn'));
 const col=bpEl('div','wcol');
 for(const[sl,lb,gl]of EQS){const id=EQ[sl],it=id&&ITEMS[id],row=bpEl('div','eqr'+(eqPick===sl?' on':'')+(id?'':' mt'));
  row.innerHTML='<span class="slot eqs">'+(id?ico(id):'<i>'+gl+'</i>')+'</span><div><small>'+lb+' · −'+EQB[sl]+'%</small><b>'+(id?it.n:'Empty')+'</b></div>';
  row.onpointerdown=ev=>{if(ev.button>0)return;eqPick=eqPick===sl?null:sl;pick=null;render()};col.appendChild(row)}
 col.appendChild(bpEl('div','wsum','<span>Damage reduction</span><b>'+Math.round(armorRed()*100)+'%</b>'));
 wrap.appendChild(vp);wrap.appendChild(col);c.appendChild(wrap);
 const idx=[];for(let i=0;i<30;i++)if(SL[i]&&ITEMS[SL[i].id].arm)idx.push(i);
 c.appendChild(bpEl('div','ch2','In your bag <span>'+idx.length+' wearable</span>'));
 if(idx.length){const g=bpEl('div','igrid');for(const i of idx)g.appendChild(sEl(i));c.appendChild(g)}
 else c.appendChild(bpEl('p','wnone','Nothing to wear yet. Craft helmets, vests, leg guards and boots under Crafting › Clothing.'));
 if(eqPick&&EQ[eqPick]){const id=EQ[eqPick],sl=eqPick;sideItem(sd,id,null,[pbtn('Take off',()=>{unequip(sl);eqPick=null;render()},'pri')])}
 else if(eqPick)sideEmpty(sd,'Nothing on your '+EQS.find(q=>q[0]===eqPick)[1].toLowerCase());
 else if(pick!==null&&SL[pick])sideItem(sd,SL[pick].id,SL[pick],bagItemActs());
 else sideEmpty(sd,'Pick a piece of gear');
 charStart()}
function render(keepTip){
 if(keepTip!==true)hideTip();const h=$('hot');h.innerHTML='';for(let i=0;i<6;i++)h.appendChild(sEl(i));syncVM();
 $('bagb').textContent=open?'Close':'Bag';if(open&&chOpen){chOpen=false;renderCheat()}
 root.classList.toggle('bagopen',!!open);
 const pn=$('panel'),bk=$('pbk');
 if(!open){pn.style.display='none';bk.style.display='none';return}
 pn.style.display='flex';bk.style.display='block';
 {const rb=$('rtab'),nr=nearResearch();if(rb)rb.style.display=nr?'':'none';if(tab==='research'&&!nr)tab='bag'}
 root.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));
 pn.classList.toggle('nosd',tab==='research'||tab==='stat');pn.dataset.tab=tab;
 const c=$('pc'),sd=$('pside');c.innerHTML='';sd.innerHTML='';
 if(tab==='bag')bagUI(c,sd);
 else if(tab==='wear')wearUI(c,sd);
 else if(tab==='research')researchUI(c);
 else if(tab==='craft')craftUI(c,sd);
 else{c.innerHTML='<div class="vgrid">'+Object.keys(defs).map(vit).join('')+'</div><div class="srow"><span>Time survived</span><b>Day '+(days+1)+'</b></div><div class="chips">'+(effects().map(x=>'<span style="background:'+x[2]+'">'+x[0]+' '+x[1]+'</span>').join('')||'<span>No conditions</span>')+'</div>';armorUI(c);ratingUI(c)}}
function togglePanel(){if(attOpen)closeAttUI();hideTip();open=!open;pick=null;eqPick=null;if(!open)curBox=null;if(open&&chOpen){chOpen=false;renderCheat()}render();lookLock(!open)}
function uiTick(){recyTick();if(((age*2)|0)!==fxQ){fxQ=(age*2)|0;fxNotify(effects())}
 if(open&&tab==='stat'){const q=age*3|0;if(q!==lq){lq=q;render(true)}}}
$('bagb').addEventListener('pointerdown',togglePanel);$('chb').addEventListener('pointerdown',e=>{e.preventDefault();toggleCheat()});
root.querySelectorAll('#tabs button').forEach(b=>b.onpointerdown=()=>{tab=b.dataset.t;pick=null;eqPick=null;render()});
$('pclose').addEventListener('pointerdown',e=>{e.preventDefault();if(open)togglePanel()});$('pbk').addEventListener('pointerdown',e=>{e.preventDefault();if(open)togglePanel()});
// ===== BASE BUILDING + ELECTRICITY =====
const C=3,FH=3.25,BCAP=600,STR=new Map(),key=(a,b,c)=>a+','+b+(c?','+c:''),FD=new Map(),WL=new Map(),RF=new Map(),ALLC=[],DECKS=[],devs=[],wires=[];
let tg=0,tu=0,tb=0,wf=null,gh=null,ghId=null;
const TIER={wood:{n:'Wood',c:0x7a5a38,x:1},stone:{n:'Stone',c:0x8a8a86,x:1.6},metal:{n:'Metal',c:0x8f949c,x:2.2},hq:{n:'HQ Metal',c:0x3a4048,x:3.4}};
// Build in wood, then upgrade each piece with the Hammer: Wood > Stone > Metal > HQ Metal.
const TORD=['wood','stone','metal','hq'],HPT={wood:140,stone:260,metal:440,hq:900},PCS=[];
function upCost(p,t){const b=PT[p][2];if(t==='hq')return{metal:Math.round(b*TIER.hq.x),gears:Math.max(2,Math.ceil(b/8))};return{[t]:Math.round(b*TIER[t].x)}}
const _topT={};
function topTex(t){if(_topT[t])return _topT[t];const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
 const base={wood:[122,90,56],stone:[138,138,134],metal:[143,148,156],hq:[58,64,72]}[t];const sh=(k,a)=>'rgb('+base.map(v=>Math.max(0,Math.min(255,Math.round(v*k)))).join(',')+')';
 g.fillStyle=sh(1,0);g.fillRect(0,0,256,256);
 if(t==='wood'){const n=6,w=256/n;for(let i=0;i<n;i++){g.fillStyle=sh(.88+hash(i,1.7)*.24);g.fillRect(i*w,0,w,256);const jx=hash(i,5.1)*200+20;g.fillStyle='rgba(30,18,8,.55)';g.fillRect(i*w,jx,w,2);for(let k=0;k<14;k++){g.strokeStyle='rgba('+(hash(i,k)>.5?'40,26,12':'170,130,86')+',.18)';g.lineWidth=1;const x=i*w+4+hash(k,i+3)*(w-8);g.beginPath();g.moveTo(x,0);g.bezierCurveTo(x+4,80,x-4,170,x+2,256);g.stroke()}g.fillStyle='rgba(25,15,6,.7)';g.fillRect(i*w,0,2.5,256);for(const y of[10,246]){g.beginPath();g.arc(i*w+w/2,y,2.2,0,6.3);g.fillStyle='rgba(30,22,14,.8)';g.fill()}}}
 else if(t==='stone'){const rows=4,h=256/rows;for(let r=0;r<rows;r++){const cols=r%2?2:3,w=256/cols,off=r%2?-w/2:0;for(let k=-1;k<=cols;k++){g.fillStyle=sh(.86+hash(r*7+k,2.2)*.26);g.fillRect(off+k*w+2,r*h+2,w-4,h-4);for(let s=0;s<30;s++){g.fillStyle='rgba('+(hash(s,r+k)>.5?'255,255,255':'0,0,0')+',.06)';g.fillRect(off+k*w+hash(s,k+r*3)*w,r*h+hash(r,s+k)*h,3,3)}}}g.fillStyle='rgba(40,40,38,.9)';for(let r=0;r<=rows;r++)g.fillRect(0,r*h-2,256,4)}
 else{const n=2;const w=256/n;for(let i=0;i<n;i++)for(let j=0;j<n;j++){g.fillStyle=sh(.92+hash(i*3+j,4.4)*.16);g.fillRect(i*w+3,j*w+3,w-6,w-6);g.strokeStyle='rgba('+(t==='hq'?'230,191,85':'255,255,255')+',.16)';g.lineWidth=2;g.strokeRect(i*w+10,j*w+10,w-20,w-20);for(const[dx,dy]of[[16,16],[w-16,16],[16,w-16],[w-16,w-16]]){g.beginPath();g.arc(i*w+dx,j*w+dy,4,0,6.3);g.fillStyle=t==='hq'?'#e6bf55':'#4e5359';g.fill()}if(t==='metal'){g.strokeStyle='rgba(0,0,0,.14)';g.lineWidth=3;for(let k=-w;k<w*2;k+=18){g.beginPath();g.moveTo(i*w+20+k,j*w+20);g.lineTo(i*w+20+k+w-40,j*w+w-20);g.stroke()}}}g.fillStyle='rgba(10,12,14,.85)';g.fillRect(126,0,4,256);g.fillRect(0,126,256,4)}
 const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;polish(tx);return _topT[t]=LMat({map:tx})}
function addTop(g,t){const m=new T.Mesh(new T.PlaneGeometry(2.94,2.94),topTex(t));m.rotation.x=-Math.PI/2;m.position.y=.045;g.add(m)}
function tierDetail(b,bx){const t=b.t,p=b.p,S={wood:{seam:0x4a3622,trim:0x8f6e46,bolt:0x9a7a50},stone:{seam:0x5a5a56,trim:0xa8a8a0,bolt:0x9a9a94},metal:{seam:0x666b73,trim:0xb8bec6,bolt:0x4e5359},hq:{seam:0x14171b,trim:0xcdd4dc,bolt:0xe6bf55}}[t];
 if(p==='wall'){
  for(const y of[.75,1.5,2.25])bx(3.04,.07,.32,0,y,0,S.seam);
  if(t==='wood')for(const x of[-1,0,1])bx(.05,3,.3,x,1.5,0,S.seam);
  if(t==='stone'){const rc=[.375,1.125,1.875,2.625];rc.forEach((y,i)=>{const xs=i%2?[0]:[-.75,.75];for(const x of xs)bx(.05,.75,.28,x,y,0,S.seam)});bx(.14,3,.3,-1.46,1.5,0,S.trim);bx(.14,3,.3,1.46,1.5,0,S.trim)}
  if(t==='metal'||t==='hq'){for(const x of[-1.32,1.32])for(const y of[.4,1.1,1.9,2.6])bx(.11,.11,.31,x,y,0,S.bolt);bx(.05,3,.29,0,1.5,0,S.seam)}
  if(t==='hq'){bx(3.05,.14,.31,0,.07,0,S.trim);bx(3.05,.14,.31,0,2.93,0,S.trim);bx(.14,3,.31,-1.46,1.5,0,S.trim);bx(.14,3,.31,1.46,1.5,0,S.trim);bx(.9,.9,.31,0,1.5,0,S.seam);bx(.22,.22,.33,0,1.5,0,S.bolt)}
 }else if(p==='doorway'||p==='window'){
  bx(3.04,.1,.28,0,2.95,0,t==='wood'?S.seam:S.trim);
  if(t!=='wood'){bx(.1,3,.28,-1.5,1.5,0,S.trim);bx(.1,3,.28,1.5,1.5,0,S.trim)}
  if(t==='hq'){for(const x of[-1.05,1.05])for(const y of[.5,1.5,2.5])bx(.1,.1,.31,x,y,0,S.bolt)}
 }else if(p==='foundation'){
  bx(3.1,.14,3.1,0,-.05,0,t==='wood'?S.seam:S.trim);bx(3.1,.08,3.1,0,-.9,0,S.seam);bx(3.1,.08,3.1,0,-1.7,0,S.seam);
  for(const sx of[-1,1])for(const sz of[-1,1])bx(.24,2.34,.24,sx*1.44,-1.17,sz*1.44,t==='wood'?S.seam:S.trim);
 }else if(p==='roof'){
  if(t==='wood')for(const x of[-1,0,1])bx(.1,.09,3.12,x,3.3,0,S.seam);else bx(3.16,.08,3.16,0,3.3,0,S.trim);
  if(t==='hq')for(const x of[-1,0,1])bx(.1,.07,3.1,x,3.3,0,S.bolt);
 }}
const DORD=['door','metal_door','hq_door'],DHP={door:200,metal_door:450,hq_door:800,barricade:260};
function hammerTarget(){ray.setFromCamera({x:0,y:0},cam);const ms=[];for(let i=PCS.length-1;i>=0;i--){const r=PCS[i];if(!r.m.parent){PCS.splice(i,1);continue}if(r.owner==='you')ms.push(r.m)}for(const d of devs)if(!d._gone&&d.owner==='you'&&isDoor(d.t)&&d.m&&d.m.parent)ms.push(d.m);if(!ms.length)return null;const h=ray.intersectObjects(ms,true);for(const x of h){let o=x.object;while(o&&ms.indexOf(o)<0)o=o.parent;if(o){const r=PCS.find(q=>q.m===o);if(r)return r;const d=devs.find(q=>q.m===o&&isDoor(q.t));if(d)return{_door:1,d}}}return null}
function hammerLabel(){const r=hammerTarget();if(!r)return'Hammer: aim at a wall, floor, roof or door you built';if(r._door){const d=r.d,nt=DORD[DORD.indexOf(d.t)+1];if(!nt)return NAMES[d.t]+' (fully upgraded)';const c=DV[nt][2];return'Upgrade to '+NAMES[nt]+': '+Object.keys(c).map(k=>c[k]+' '+ITEMS[k].n+' ('+cnt(k)+')').join(', ')}const nm=PT[r.p][0],nt=TORD[TORD.indexOf(r.t)+1];if(!nt)return TIER[r.t].n+' '+nm+' (fully upgraded)';const c=upCost(r.p,nt);return'Upgrade '+nm+' to '+TIER[nt].n+': '+Object.keys(c).map(k=>c[k]+' '+ITEMS[k].n+' ('+cnt(k)+')').join(', ')}
function upgradeDoor(d,nt,quiet){const it=ITEMS[nt];if(!it)return;const old=d.m,m=mk(it,null);m.position.copy(old.position);m.rotation.copy(old.rotation);Object.assign(m.userData,{k:'dev',d});scene.add(m);scene.remove(old);const ti=things.indexOf(old);if(ti>=0)things[ti]=m;else things.push(m);d.m=m;d.t=nt;d.hp=d.maxHp=DHP[nt]||450;if(!quiet){startSwing('hammer',true,.34);RT.build+=.6;bumpHeat(.03);puffAt(old.position.x,old.position.y+1.1,old.position.z);blip(nt==='hq_door'?520:360,.12,'square');say('Door upgraded to '+NAMES[nt]+'.')}}
function upgradePiece(r,nt,quiet){const it=ITEMS[nt+'_'+r.p];if(!it)return;const old=r.m,m=mk(it,null);m.position.copy(old.position);m.rotation.copy(old.rotation);scene.add(m);scene.remove(old);for(const c of ALLC)if(c.mesh===old){c.mesh=m;c.tier=nt;c.hp=c.maxHp=HPT[nt]}r.m=m;r.t=nt;
 for(const e of BLOG)if(e.g&&e.g.k===r.k&&e.g.p===r.p)e.id=nt+'_'+r.p;
 if(!quiet){startSwing('hammer',true,.34);RT.build+=.6;bumpHeat(.03);puffAt(old.position.x,old.position.y+(r.p==='foundation'?.4:r.p==='roof'?3:1.4),old.position.z);blip(nt==='hq'?520:nt==='metal'?340:200,.12,'square');blip(120,.08,'sawtooth');say(PT[r.p][0]+' upgraded to '+TIER[nt].n+'.')}}
function hammerAct(){const r=hammerTarget();if(!r)return false;if(r._door){const d=r.d,nt=DORD[DORD.indexOf(d.t)+1];if(!nt){say('That door is already Armored HQ Metal.');return true}const c=DV[nt][2];if(!ch('free')){const lack=Object.keys(c).filter(k=>cnt(k)<c[k]);if(lack.length){say('Need '+lack.map(k=>(c[k]-cnt(k))+' more '+ITEMS[k].n.toLowerCase()).join(' and ')+' for '+NAMES[nt]+'.');return true}for(const k in c)take(k,c[k])}upgradeDoor(d,nt);return true}const nt=TORD[TORD.indexOf(r.t)+1];if(!nt){say('That '+PT[r.p][0].toLowerCase()+' is already HQ Metal. Nothing stronger.');return true}
 const c=upCost(r.p,nt);if(!ch('free')){const lack=Object.keys(c).filter(k=>cnt(k)<c[k]);if(lack.length){say('Need '+lack.map(k=>(c[k]-cnt(k))+' more '+ITEMS[k].n.toLowerCase()).join(' and ')+' for '+TIER[nt].n+'.');return true}for(const k in c)take(k,c[k])}
 upgradePiece(r,nt);return true}
const PT={foundation:['Foundation','⬜',30,'A 3 m base. Build these first; the first can go anywhere flat and dry.'],wall:['Wall','🧱',20,'Snaps to a foundation edge.'],doorway:['Doorway','🚪',20,'A wall with a gap. Add a door.'],window:['Window Wall','🪟',20,'A wall with an opening.'],roof:['Roof','🔺',20,'Covers a foundation cell. Sheltered cells stay warmer.'],stairs:['Stairs','🪜',25,'Climbs one floor in the direction you face. Leave the roof above it open.']};
for(const t in TIER)for(const p in PT){const id=t+'_'+p;ITEMS[id]={n:TIER[t].n+' '+PT[p][0],i:PT[p][1],max:10,bd:{t,p},d:PT[p][3]};REC.push({out:id,q:1,need:{[t==='hq'?'metal':t]:Math.round(PT[p][2]*TIER[t].x)}})}
const DV={
 solar:['Solar Panel','☀',{metal:15,wood:5,circuit:2},'Up to 20 W in daylight, 0 at night.'],
 wind:['Wind Turbine','🌬',{metal:25,wood:10,circuit:3},'At least 18 W, day and night, enough for four turrets. Storms spin it harder.'],
 battery:['Battery','🔋',{metal:15,stone:5,circuit:1},'Stores 600 units. Charges from surplus, covers shortfalls.'],
 lamp:['Lamp','💡',{metal:3,wood:2},'Uses 3 W.'],
 heater:['Heater','♨',{metal:10,stone:5},'Uses 10 W. Warms within 6 m.'],
 switch:['Switch','🎚',{metal:3},'Use to toggle. Off breaks the circuit through it.'],
 door:['Wooden Door','🚪',{wood:15,metal:2},'Sturdy timber door (200 HP). Fits a doorway. Use to open/close, or upgrade with a Hammer.'],
 metal_door:['Sheet Metal Door','🚪',{sheet:2,blade:1,metal:35},'Reinforced sheet-metal door with peep slot & keypad lock (450 HP). Crafted with Metal Sheets & Metal Blade.'],
 hq_door:['Armored HQ Door','🚪',{sheet:3,gears:3,spring:2,metal:80},'Vault-grade High-Quality Metal door with viewing hatch & wheel lock (800 HP). Fits a doorway.'],
 window_bars:['Reinforced Window','🪟',{wood:15,metal:20},'Window insert with steel bars & ballistic glass (300 HP). Fits a Window Wall.'],
 embrasure:['Window Embrasure','🛡',{road_sign:2,sheet:1,metal:20},'Armored steel window shutter with horizontal gun slits (480 HP). Crafted with Road Signs & Metal Sheet.'],
 water_collector:['Water Collector','💧',{wood:30,tarp:2,propane:1,rope:2},'Rainwater & dew catchment barrel (up to 100 water). Crafted with Tarps, an Empty Propane Tank & Rope. Press E to drink.'],
 box_s:['Small Box','📦',{wood:15},'6 slots. A little crate for tools and ammo. Use to open, then move items in and out.'],
 box:['Storage Box','📦',{wood:30},'12 slots. Use to open, then move items in and out.'],
 box_l:['Large Box','🗄',{wood:80,metal:10},'24 slots. A big reinforced chest for a base. Use to open, then move items in and out.'],
 furnace:['Furnace','🏭',{stone:40,wood:15,fuel:3},'Smelts Metal Ore into Metal Fragments. Burns wood or Low Grade Fuel (fuel lasts 3x longer).'],
 refinery:['Small Oil Refinery','🛢',{propane:1,sheet:2,pipe:2,blade:1,metal:20},'Refines Crude Oil into Low Grade Fuel (1 Crude Oil → 3 Low Grade Fuel). Crafted with an Empty Propane Tank, Metal Sheets, Pipes & Blade.'],
 pump_jack:['Pump Jack','⛽',{metal:60,gears:6,pipe:4,sheet:3,wood:40},'Industrial oil derrick. Runs on Low Grade Fuel and pumps Crude Oil out of the ground.'],
 quarry:['Mining Quarry','⛏',{wood:80,metal:50,gears:6,sheet:3,pipe:3},'Automated heavy mining rig. Runs on Low Grade Fuel and extracts Stone, Metal Ore, and Sulfur.'],
 turret:['Auto Turret','🎯',{metal:30,stone:10,gears:4},'Uses 4 W. Shoots hostiles within 30 m while powered. Your own turns on settlers who have drawn on you.'],
 tc:['Tool Cupboard','🔒',{wood:60,stone:20},'Building privilege for 26 m. Stock wood, stone and metal or covered pieces decay. Raiders come for this first. You cannot build inside someone else\'s cupboard.']
};
const NAMES={};for(const k in DV){NAMES[k]=DV[k][0];ITEMS[k]={n:DV[k][0],i:DV[k][1],max:k==='lamp'?10:5,dv:k,d:DV[k][3]};REC.push({out:k,q:1,need:DV[k][2]})}
ITEMS.gears={n:'Gears',i:'⚙',max:100,d:'Salvaged from junk piles. Needed for turrets.'};ITEMS.circuit={n:'Circuit Board',i:'📟',max:100,d:'Found in crates and barrels, or crafted at a Workbench. Needed for solar panels, wind turbines and batteries.'};ITEMS.ore={n:'Metal Ore',i:'🔶',max:500,d:'Mined from rocks. Smelt it in a furnace.'};ITEMS.metal={n:'Metal Fragments',i:'🔩',max:500,d:'Smelted from Metal Ore in a furnace. Needed for electronics.'};
ITEMS.hammer={n:'Builder Hammer',i:'🔨',max:1,tool:'hammer',d:'Equip it, aim at a wall, floor or roof you built and press Use to upgrade it: Wood, then Stone, Metal and HQ Metal. Stronger pieces cost more and hold out longer against raiders.'};REC.push({out:'hammer',q:1,need:{wood:8,stone:4}});BLD.push('hammer');
ITEMS.wire={n:'Wire Tool',i:'🔌',max:1,tool:'wire',d:'Equip it, then Use on one device and another to connect. Repeat to remove.'};REC.push({out:'wire',q:1,need:{metal:5}});
ITEMS.workbench={n:'Workbench Tier 1',i:'🛠',max:3,dv:'workbench',d:'The camp table. Settlers keep one in every base. Crafts components, clothing, melee weapons, traps, electrics and the Revolver, and can research those blueprints for 2x scrap. Build a Tier 2 next to it.'};REC.push({out:'workbench',q:1,need:{wood:40,stone:12,metal:6,scrap:20}});NAMES.workbench='Workbench Tier 1';
ITEMS.workbench2={n:'Workbench Tier 2',i:'🔧',max:3,dv:'workbench2',d:'Steel-topped bench. Unlocks pistols, shotguns, SMGs, gun bodies, turrets, targeting gear, special ammo, snap traps and HQ doors. Build it within 8 m of a Tier 1 Workbench.'};REC.push({out:'workbench2',q:1,need:{wood:60,metal:40,gears:2,scrap:60}});NAMES.workbench2='Workbench Tier 2';
ITEMS.workbench3={n:'Workbench Tier 3',i:'🏗',max:3,dv:'workbench3',d:'Industrial bench with a tool wall. Unlocks rifles, the AK, launcher, rockets, C4 and explosives. Build it within 8 m of a Tier 2 Workbench.'};REC.push({out:'workbench3',q:1,need:{wood:80,metal:100,gears:4,circuit:2,scrap:150}});NAMES.workbench3='Workbench Tier 3';BLD.push('workbench2','workbench3');
ITEMS.scrap={n:'Scrap',i:'🔩',max:1000,d:'Currency of the wasteland. Found in junk piles, barrels, crates and on raiders, or recycled from tech. Spend it at a Research Table to learn blueprints.'};
ITEMS.research={n:'Research Table',i:'🔬',max:3,dv:'research',d:'Place it near your base. Use it to spend scrap and one copy of an item to learn that item\'s blueprint.'};REC.push({out:'research',q:1,need:{wood:45,sheet:2,fuse:1,scrap:30}});NAMES.research='Research Table';BLD.push('research');
// ===== SCRAP + RESEARCH (blueprints) =====
const RCOST={pipe:20,sheet:20,ammo_hp:30,cctv:50,revolver:60,spring:75,semi_body:75,explosives:75,targeting_computer:75,ammo_ap:75,ammo_inc:75,pistol:75,shotgun:75,smg_body:125,pump:125,smg:150,thompson:150,c4:150,rocket:100,turret:100,snap:40,sar:200,rifle:200,ak:300,launcher:300,chainsaw:150,jackhammer:150};
ITEMS.leather={n:'Leather',i:'🟫',max:200,d:'Cured animal hide from deer and wolves. Used to craft Respawn Beds, clothing, and gear.'};
ITEMS.crude={n:'Crude Oil',i:'🛢',max:500,d:'Raw black petroleum pumped by a Pump Jack or found in oil and red barrels. Refine it in a Small Oil Refinery (1 Crude Oil → 3 Low Grade Fuel).'};
ITEMS.explosives={n:'Explosives',i:'🧨',max:100,d:'High-explosive military compound. Craft at a Workbench from Gunpowder, Sulfur, Low Grade Fuel, and Metal, or loot from Elite Crates.'};
ITEMS.targeting_computer={n:'Targeting Computer',i:'💻',max:20,d:'Ruggedized ballistic targeting computer. Found in Military/Elite Crates or crafted at a Workbench. Used for Auto Turrets or recycled for Tech Trash & Circuits.'};
ITEMS.cctv={n:'Targeting Camera',i:'📹',max:20,d:'Optical CCTV targeting camera with IR lens. Found in crates and barrels or crafted at a Workbench. Used for Auto Turrets or recycled for Circuits & Gears.'};
ITEMS.bed={n:'Respawn Bed',i:'🛏',max:1,use:'Place',d:'Sturdy wooden bed with mattress, blanket & pillow. Sets your respawn point (only one bed can be placed at a time — placing a new one replaces the old one) and wakes you with 85 HP and high stamina.',fx:()=>placeBed()};
REC.push(
 {out:'bed',q:1,need:{wood:35,cloth:12,sewing_kit:2,tarp:1,leather:2}},
 {out:'explosives',q:1,need:{powder:8,sulfur:4,fuel:2,metal:4}},
 {out:'targeting_computer',q:1,need:{tech:1,circuit:2,metal:12}},
 {out:'cctv',q:1,need:{circuit:1,gears:1,metal:8}}
);
const BPK=new Set();
const nearRT=()=>devs.some(d=>d.t==='research'&&!d._gone&&Math.hypot(P.x-d.x,P.z-d.z)<8);
// Researching at a plain Workbench works too, but costs WB_RESEARCH_MULT x the Research Table's scrap price.
const WB_RESEARCH_MULT=2;
const nearResearch=()=>nearRT()||nearWB();
const rCost=id=>nearRT()?RCOST[id]:Math.ceil(RCOST[id]*WB_RESEARCH_MULT);
// A workbench can only research items up to its own tier; the Research Table handles everything.
const rTier=id=>Math.max(1,wbNeed({out:id})),rOk=id=>nearRT()||wbTier()>=rTier(id);
const bpLocked=id=>!!RCOST[id]&&!BPK.has(id)&&!ch('free');
function doResearch(id){if(!RCOST[id]||BPK.has(id))return;if(!nearResearch()&&!ch('free'))return say('Stand at a Research Table or Workbench.');if(!rOk(id)&&!ch('free'))return say('That blueprint needs a Tier '+rTier(id)+' Workbench or a Research Table.');const c=rCost(id);
 if(!ch('free')){if(cnt('scrap')<c)return say('Need '+(c-cnt('scrap'))+' more scrap.');if(cnt(id)<1)return say('Carry one '+ITEMS[id].n+' to research it. It is used up.');take('scrap',c);take(id,1)}
 BPK.add(id);blip(520,.1,'square');blip(780,.16,'square');say('Blueprint learned: '+ITEMS[id].n+'.');render()}
function researchUI(c){const near=nearResearch(),atRT=nearRT(),h=document.createElement('div');h.id='det';
 h.innerHTML='<b>'+(atRT||!near?'Research Table':'Workbench Tier '+wbTier()+' Research')+'</b><p>Scrap: <b>'+cnt('scrap')+'</b>. Spend scrap plus one copy of an item to learn how to craft it. The copy is used up.</p><p>'+(atRT?'Research Table in reach.':near?'Workbench research costs '+WB_RESEARCH_MULT+'x the scrap and only covers items up to Tier '+wbTier()+'. A Research Table is cheaper and covers everything.':'Stand within 8 m of a Research Table or Workbench.')+'</p>';c.appendChild(h);
 const ids=Object.keys(RCOST).filter(id=>ITEMS[id]).sort((a,b)=>RCOST[a]-RCOST[b]),todo=ids.filter(id=>!BPK.has(id));
 if(!todo.length){const d=document.createElement('div');d.id='det';d.textContent='Every blueprint is learned.';c.appendChild(d)}
 for(const id of todo){const it=ITEMS[id],cost=rCost(id),hs=cnt('scrap')>=cost,hi=cnt(id)>=1,tk=rOk(id),e=document.createElement('div');e.className='rc';
  e.innerHTML='<span class="ic">'+ico(id)+'</span><div><b>'+it.n+'</b><br><small>'+it.d+'</small><br><span class="'+(hs?'ok':'no')+'">🔩 '+cnt('scrap')+'/'+cost+'</span> <span class="'+(hi?'ok':'no')+'">'+it.i+' '+cnt(id)+'/1</span>'+(near&&!tk?' <span class="no">Needs Tier '+rTier(id)+' bench</span>':'')+'</div>';
  const cb=document.createElement('div');cb.className='cb';const b=btn('Research',()=>doResearch(id));b.disabled=!near||!tk||!hs||!hi;cb.appendChild(b);e.appendChild(cb);c.appendChild(e)}
 const lr=ids.filter(id=>BPK.has(id));if(lr.length){const g=document.createElement('div');g.className='ch2';g.innerHTML='Learned <span>'+lr.length+' / '+ids.length+'</span>';c.appendChild(g);const w=document.createElement('div');w.className='chips';w.innerHTML=lr.map(id=>'<span>'+ITEMS[id].i+' '+ITEMS[id].n+'</span>').join('');c.appendChild(w)}}

ITEMS.spike={n:'Spike Trap',i:'🪤',max:10,dv:'spike',d:'Place it in the yard. Raiders and wolves that step on it take a hit. No power.'};REC.push({out:'spike',q:1,need:{wood:18,blade:2,rope:1}});NAMES.spike='Spike Trap';
ITEMS.snap={n:'Snap Trap',i:'⚙',max:8,dv:'snap',d:'A metal jaw. Hits harder than spikes, then needs a moment to reset. No power.'};REC.push({out:'snap',q:1,need:{metal:10,blade:1,spring:1,gears:1}});NAMES.snap='Snap Trap';
ITEMS.barricade={n:'Wood Barricade',i:'🪵',max:6,dv:'barricade',d:'A 2.6 m plank wall you set down on open ground (260 HP). It blocks bullets and movement. Raiders and settlers that get shot at with no cover will set one down and hide behind it.'};REC.push({out:'barricade',q:1,need:{wood:30}});NAMES.barricade='Wood Barricade';
ITEMS.meat={n:'Raw Meat',i:'🥩',max:20,use:'Eat',d:'Restores 18 food. Cook it for more. Eating lets stamina come back.',fx:()=>{S.hunger=Math.min(100,S.hunger+18);S.energy=Math.min(100,S.energy+10)}};
ITEMS.cooked={n:'Cooked Meat',i:'🍖',max:20,use:'Eat',d:'Restores 40 food and a chunk of stamina. Cook near a fire.',fx:()=>{S.hunger=Math.min(100,S.hunger+40);S.energy=Math.min(100,S.energy+28)}};
REC.push({out:'cooked',q:1,need:{meat:1},fire:1});
ITEMS.sulfur={n:'Sulfur',i:'🟡',max:400,d:'Yellow stone in the rocks. Every charge starts here.'};
ITEMS.charcoal={n:'Charcoal',i:'⬛',max:400,d:'Burn wood at a fire, then grind it with sulfur.'};
ITEMS.powder={n:'Gunpowder',i:'💥',max:300,d:'Sulfur and charcoal. Pack it into the charges the night crew carries.'};
ITEMS.beancan={n:'Beancan Grenade',i:'💣',max:10,nade:'beancan',use:'Throw',d:'Throw it. Short fuse, small blast. A close hit opens a wood wall. Prowlers throw these.',fx:()=>tossHeld('beancan')};
ITEMS.satchel={n:'Satchel Charge',i:'🎒',max:6,nade:'satchel',use:'Throw',d:'Sticks to a wall in reach, otherwise throw it. Breaks wood and buckles stone. The crew plants the same satchel.',fx:()=>tossHeld('satchel')};
ITEMS.c4={n:'Timed Charge',i:'🧨',max:4,nade:'c4',plant:1,use:'Set',d:'Sticks to a wall, or the ground if you have no wall. Five seconds. Breaks metal. If a raider brought one, you can craft one.',fx:()=>plantHeld('c4')};
ITEMS.rocket={n:'Rocket',i:'🚀',max:12,d:'Direct ammunition for the rocket launcher. Wide blast on impact.'};
ITEMS.launcher={n:'Rocket Launcher',i:'🚀',max:1,d:'Fires rockets. The loudest tool on a raid night, and it is craftable.'};
REC.push({out:'charcoal',q:3,need:{wood:2},fire:1});
REC.push({out:'powder',q:5,need:{sulfur:2,charcoal:1}});
REC.push({out:'beancan',q:1,need:{powder:6,metal:5,rope:1}});
REC.push({out:'satchel',q:1,need:{powder:12,propane:1,rope:2,cloth:4}});
REC.push({out:'c4',q:1,need:{explosives:2,fuse:1,circuit:1,cloth:4}});
REC.push({out:'rocket',q:1,need:{powder:16,metal:8,pipe:1,gears:1}});
REC.push({out:'launcher',q:1,need:{pipe:3,propane:1,spring:2,gears:2,sheet:2}});
Object.assign(ITEMS,{
 knife:{n:'Combat Knife',i:'🔪',max:1,dur:120,mel:{dmg:16,cd:.32,reach:2.1,st:'stab'},d:'Melee. Fast stabs, light damage. Use to attack.'},
 machete:{n:'Machete',i:'🗡',max:1,dur:90,mel:{dmg:30,cd:.5,reach:2.4,st:'slash'},d:'Melee. Wide slashes, solid damage. Use to attack.'},
 spear:{n:'Wooden Spear',i:'🔱',max:1,dur:60,mel:{dmg:34,cd:.7,reach:3.3,st:'thrust'},d:'Melee. Long reach thrust. Use to attack.'},
 club:{n:'Wooden Club',i:'🏏',max:1,dur:80,mel:{dmg:26,cd:.55,reach:2.3,st:'smash'},d:'Melee. Heavy overhead smash. Use to attack.'}});
REC.push({out:'spear',q:1,need:{wood:10,rope:1}},{out:'club',q:1,need:{wood:10,stone:3}},{out:'knife',q:1,need:{blade:1,metal:8,wood:2}},{out:'machete',q:1,need:{blade:2,road_sign:1,rope:1,metal:12}});
const G=(x,z,ft)=>{if(ft===undefined)ft=P.y-1.7;let y=H(x,z);
 const cx=Math.round(x/C),cz=Math.round(z/C);
 let f=FD.get(key(cx,cz)),fcx=cx,fcz=cz;
 if(!f){
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){
   const nf=FD.get(key(cx+dx,cz+dz));
   if(nf&&Math.abs(x-(cx+dx)*C)<=1.78&&Math.abs(z-(cz+dz)*C)<=1.78&&ft>=nf.y-.65){f=nf;fcx=cx+dx;fcz=cz+dz;break}
  }
 }
 if(f){
  if(ft>=f.y-2.4)y=Math.max(y,f.y);
  for(let L=0;L<6;L++){const b=f.y+FH*L;if(RF.has(key(fcx,fcz,L))&&b+FH<=ft+.75)y=Math.max(y,b+FH);const s=STR.get(key(fcx,fcz,L));if(s&&ft>=b-.75&&ft<=b+FH+.75)y=Math.max(y,b+FH*Math.max(0,Math.min(1,.5+((x-fcx*C)*s.dx+(z-fcz*C)*s.dz)/C)))}
 }
 for(let i=0;i<DECKS.length;i++){
  const c=DECKS[i];
  if(x<c.x0-.25||x>c.x1+.25||z<c.z0-.25||z>c.z1+.25)continue;
  if(c.ramp){
   const lo=Math.min(c.y0,c.y1),hi=Math.max(c.y0,c.y1);
   if(ft>=lo-.6&&ft<=hi+.85){
    const u=Math.max(0,Math.min(1,c.az?(z-c.z0)/Math.max(.1,c.z1-c.z0):(x-c.x0)/Math.max(.1,c.x1-c.x0)));
    y=Math.max(y,c.y0+(c.y1-c.y0)*u);
   }
  }else if(c.top!==undefined&&ft>=c.top-(c.pad?.68:.55)){
   y=Math.max(y,c.top);
  }
 }
 return y};
function curL(){const f=FD.get(key(Math.round(P.x/C),Math.round(P.z/C)));return f?Math.max(0,Math.min(5,Math.round((P.y-1.7-f.y)/FH))):0}
const GM=new T.MeshBasicMaterial({color:0x66ff66,transparent:true,opacity:.45,depthWrite:false});
const _box=new Map(),_cmat=new Map();
function boxGeo(w,h,d){const k=w+','+h+','+d;let g=_box.get(k);if(!g){g=new T.BoxGeometry(w,h,d);_box.set(k,g)}return g}
function cmat(c){const k=c==null?'x':String(c);let m=_cmat.get(k);if(!m){m=LMat({color:c==null?0xffffff:c,flatShading:true});_cmat.set(k,m)}return m}
function mk(it,mat){const g=new T.Group(),col=it.bd&&TIER[it.bd.t].c,u=g.userData;
 const bx=(w,h,d,x,y,z,c,par,uniq)=>{const m=new T.Mesh(boxGeo(w,h,d),mat||(uniq?LMat({color:c==null?col:c,flatShading:true}):cmat(c==null?col:c)));m.position.set(x,y,z);(par||g).add(m);return m};
 if(it.bd){const p=it.bd.p;
  if(p==='foundation')bx(3,2.4,3,0,-1.2,0);else if(p==='wall')bx(3,3,.25,0,1.5,0);else if(p==='roof')bx(3.1,.25,3.1,0,3.125,0);
  else if(p==='stairs'){const n=8,rise=FH,run=3;for(let i=0;i<n;i++){const t1=(i+1)/n,z1=-1.5+run*t1,z0=-1.5+run*i/n,y1=rise*t1;bx(2.2,.14,(z1-z0)+.04,0,y1-.07,(z0+z1)/2);bx(2.2,rise/n,.07,0,y1-rise/(2*n),z1)}}
  else if(p==='doorway'){bx(.9,3,.25,-1.05,1.5,0);bx(.9,3,.25,1.05,1.5,0);bx(1.2,.7,.25,0,2.65,0)}
  else{bx(3,1,.25,0,.5,0);bx(3,.7,.25,0,2.65,0);bx(.9,1.3,.25,-1.05,1.65,0);bx(.9,1.3,.25,1.05,1.65,0)}tierDetail(it.bd,bx);if(!mat&&it.bd.p==='foundation')addTop(g,it.bd.t)}
 else{const v=it.dv;
  if(v==='solar'){bx(.1,1,.1,0,.5,0,0x444444);bx(1.8,.07,1.1,0,1.1,0,0x1d3b66).rotation.x=-.5}
  else if(v==='wind'){bx(.15,6,.15,0,3,0,0xcccccc);const r=new T.Group();r.position.set(0,6.2,.2);for(let i=0;i<3;i++){const h=new T.Group();h.rotation.z=i*2.094;bx(.15,2.4,.05,0,1.2,0,0xeeeeee,h);r.add(h)}g.add(r);u.rotor=r}
  else if(v==='battery'){bx(.7,.9,.5,0,.45,0,0xb89a2e);bx(.3,.08,.52,0,.9,0,0x222222)}
  else if(v==='lamp'){bx(.06,1.6,.06,0,.8,0,0x333333);u.bulb=bx(.3,.3,.3,0,1.75,0,0x555544,null,1)}
  else if(v==='heater'){bx(.6,1,.5,0,.5,0,0x55504a);bx(.5,.5,.05,0,.6,.28,0xd0662a)}
  else if(v==='switch'){bx(.06,.9,.06,0,.45,0,0x333333);bx(.35,.5,.12,0,.95,0,0x555555);u.cap=bx(.14,.14,.14,0,.98,.08,0xcc3322,null,1)}
  else if(v==='turret'){bx(.16,1.2,.16,0,.6,0,0x3c4148);u.gun=new T.Group();u.gun.position.y=1.28;g.add(u.gun);bx(.46,.34,.66,0,0,.06,0x22262b,u.gun);bx(.08,.08,.9,0,.02,.58,0x101214,u.gun);bx(.62,.1,.62,0,-.2,0,0x6a5630,u.gun)}else if(v==='box_s'){bx(.7,.45,.5,0,.225,0,0x8a6a42);bx(.74,.08,.54,0,.47,0,0x4a3626);bx(.08,.4,.52,-.25,.22,0,0x5a4026);bx(.08,.4,.52,.25,.22,0,0x5a4026);bx(.12,.1,.04,0,.36,.27,0xc9a437)}
  else if(v==='box_l'){bx(1.5,.9,.8,0,.45,0,0x6a4a2c);bx(1.56,.1,.86,0,.93,0,0x3a2818);for(const x of[-.55,0,.55])bx(.1,.88,.84,x,.45,0,0x4a3626);bx(1.54,.08,.84,0,.12,0,0x2c1e12);bx(.2,.16,.05,0,.7,.43,0xc9a437);bx(.06,.1,.06,0,.66,.46,0x1a120c)}
  else if(v==='box'){bx(1,.7,.7,0,.35,0,0x7a5a38);bx(1.04,.1,.74,0,.72,0,0x4a3626)}else if(v==='furnace'){bx(1.1,1.3,1.1,0,.65,0,0x6a6a66);bx(1.2,.1,1.2,0,1.33,0,0x3a3a38);u.glow=bx(.5,.35,.05,0,.5,.56,0x331a0a)}else if(v==='tc'){bx(.92,1.15,.58,0,.58,0,0x6b4a2a);bx(.96,.08,.62,0,1.18,0,0x3a2818);bx(.22,.26,.04,0,.72,.31,0xc9a437);bx(.05,.09,.05,0,.7,.34,0x1a120c);bx(.16,.04,.05,0,.84,.33,0x222222)}else if(v==='research'){bx(1.5,.7,.8,0,.35,0,0x4a4f55);bx(1.6,.08,.9,0,.74,0,0x6a7078);bx(.5,.3,.34,-.4,.93,.05,0x2f6f8f);bx(.12,.5,.12,.45,.99,0,0x777777);bx(.3,.06,.3,.45,1.26,0,0xc9a437)}else if(v==='workbench'){bx(1.35,.72,.62,0,.36,0,0x5c4030);bx(1.48,.08,.74,0,.76,0,0x7a5a38);bx(.08,.36,.08,-.58,.18,-.24,0x3a2a1c);bx(.08,.36,.08,.58,.18,-.24,0x3a2a1c);bx(.08,.36,.08,-.58,.18,.24,0x3a2a1c);bx(.08,.36,.08,.58,.18,.24,0x3a2a1c);bx(.34,.06,.22,0,.82,.05,0xc9a437)}else if(v==='workbench2'){bx(1.5,.74,.66,0,.37,0,0x4a4f55);bx(1.62,.09,.78,0,.78,0,0x8a9096);bx(1.5,.7,.06,0,1.18,-.34,0x6a4a2c);bx(.34,.06,.22,0,.84,.06,0xc9a437);bx(.5,.1,.3,.4,.88,.05,0x2f6f8f);bx(.1,.34,.1,-.55,1.05,-.28,0x777777)}else if(v==='workbench3'){bx(1.7,.78,.72,0,.39,0,0x30343a);bx(1.82,.1,.84,0,.83,0,0x9aa0a6);bx(1.7,1,.07,0,1.38,-.38,0x24272b);bx(1.5,.07,.2,0,1.9,-.28,0x1c1e21);bx(1.2,.05,.1,0,1.86,-.18,0xffe2a0);bx(.4,.08,.26,-.5,.92,.04,0xc9a437);bx(.3,.3,.3,.55,1.0,.05,0x2f6f8f);bx(.1,.5,.1,.75,1.1,.2,0x777777);bx(.22,.5,.05,-.6,1.45,-.33,0x777777);bx(.22,.5,.05,.6,1.45,-.33,0xc4552a)}else if(v==='spike'){bx(.9,.06,.9,0,.03,0,0x4a3828);for(let i=0;i<5;i++){const a=i*1.256;bx(.06,.42,.06,Math.cos(a)*.28,.24,Math.sin(a)*.28,0x8a9096)}}else if(v==='snap'){bx(.7,.08,.55,0,.04,0,0x2a2c30);bx(.62,.1,.08,0,.16,-.16,0x9aa0a6);bx(.62,.1,.08,0,.16,.16,0x9aa0a6);bx(.1,.16,.1,0,.12,0,0xc4552a)}
  else if(v==='water_collector'){
   // 4-post wooden frame + blue rainwater tarp funnel + banded storage barrel + spigot
   for(const sx of[-.58,.58])for(const sz of[-.58,.58])bx(.1,1.45,.1,sx,.725,sz,0x5c4028);
   for(const y of[.18,1.38]){bx(1.26,.07,.08,0,y,-.58,0x4a321e);bx(1.26,.07,.08,0,y,.58,0x4a321e);bx(.08,.07,1.26,-.58,y,0,0x4a321e);bx(.08,.07,1.26,.58,y,0,0x4a321e)}
   bx(1.34,.08,1.34,0,1.46,0,0x245882);bx(1.16,.06,1.16,0,1.38,0,0x1d4668);bx(.16,.32,.16,0,1.18,0,0x4a5058);
   const brl=new T.Mesh(new T.CylinderGeometry(.42,.42,.88,12),mat||cmat(0x6e4a2a));brl.position.set(0,.46,0);g.add(brl);
   for(const y of[.18,.46,.74]){const bd=new T.Mesh(new T.CylinderGeometry(.435,.435,.045,12),mat||cmat(0x2a2e34));bd.position.set(0,y,0);g.add(bd)}
   u.waterLvl=new T.Mesh(new T.CylinderGeometry(.39,.39,.04,12),mat||cmat(0x2d8ad8));u.waterLvl.position.set(0,.89,0);g.add(u.waterLvl);
   bx(.08,.08,.18,0,.32,.46,0xc9a437);bx(.06,.12,.06,0,.38,.51,0xc43224);
  }else if(v==='refinery'){
   // Small Oil Refinery: firebox base + tilted 55-gal distillation drum + tall smokestack + condenser pipes
   bx(1.25,.58,1.1,0,.29,0,0x4a4642);bx(1.32,.08,1.18,0,.60,0,0x2a2c30);
   u.glow=bx(.48,.32,.06,0,.28,.54,0x331a0a,null,1);
   const drum=new T.Mesh(new T.CylinderGeometry(.44,.44,1.18,14),mat||cmat(0x8a4224));drum.rotation.z=.22;drum.position.set(-.05,1.08,0);g.add(drum);
   for(const dy of[-.36,0,.36]){const ring=new T.Mesh(new T.CylinderGeometry(.46,.46,.05,14),mat||cmat(0x22262b));ring.rotation.z=.22;ring.position.set(-.05-Math.sin(.22)*dy,1.08+Math.cos(.22)*dy,0);g.add(ring)}
   const stack=new T.Mesh(new T.CylinderGeometry(.11,.13,1.45,10),mat||cmat(0x262a30));stack.position.set(.42,1.55,-.28);g.add(stack);
   bx(.32,.06,.32,.42,2.28,-.28,0x1a1d21);
   const pipe=new T.Mesh(new T.CylinderGeometry(.055,.055,.75,8),mat||cmat(0x7a828c));pipe.rotation.z=-.65;pipe.position.set(.32,1.15,.28);g.add(pipe);
   const can=new T.Mesh(new T.CylinderGeometry(.22,.22,.52,10),mat||cmat(0xb83228));can.position.set(.48,.26,.36);g.add(can);
  }else if(v==='pump_jack'){
   // Industrial Oil Pump Jack: base skid + Samson A-frame + animated walking beam & horsehead + wellhead + engine house
   bx(2.4,.16,1.3,0,.08,0,0x34383e);bx(.75,.82,.85,-.72,.49,0,0x4a525a);bx(.82,.08,.92,-.72,.92,0,0x262a30);
   const tank=new T.Mesh(new T.CylinderGeometry(.38,.38,.95,12),mat||cmat(0x22262b));tank.position.set(-.72,.55,-.65);g.add(tank);
   for(const sz of[-.38,.38]){
    const leg1=bx(.12,1.75,.12,-.18,.92,sz,0x555b64);leg1.rotation.z=-.18;
    const leg2=bx(.12,1.75,.12,.22,.92,sz,0x555b64);leg2.rotation.z=.18;
   }
   bx(.28,.16,.92,.02,1.76,0,0x22262b);
   const beam=new T.Group();beam.position.set(.02,1.84,0);g.add(beam);u.beam=beam;
   bx(1.85,.16,.22,0,0,0,0xd99b26,beam);bx(.22,.28,.26,0,.04,0,0x22262b,beam);
   bx(.24,.68,.28,.86,-.02,0,0xc4552a,beam);bx(.28,.42,.38,-.82,-.12,0,0x262a30,beam);
   u.rod=bx(.045,1.25,.045,.92,.72,0,0xb8c0c8);
   bx(.32,.48,.32,.92,.28,0,0x8a2820);bx(.42,.12,.42,.92,.52,0,0x22262b);
  }else if(v==='quarry'){
   // Automated Mining Quarry: heavy timber/steel A-frame derrick + engine shed + ore hopper + reciprocating drill
   bx(2.5,.16,2.3,0,.08,0,0x3a3632);
   for(const sx of[-.95,.95])for(const sz of[-.85,.85]){
    const post=bx(.16,2.45,.16,sx*.78,1.25,sz*.78,0x6b4828);
    post.rotation.z=sx>0?.14:-.14;post.rotation.x=sz>0?-.14:.14;
   }
   bx(1.45,.16,1.35,0,2.38,0,0x4a321e);bx(1.55,.12,1.45,0,1.25,0,0x4a321e);
   bx(.95,.92,.95,-.65,.54,-.45,0x5a626a);bx(1.02,.08,1.02,-.65,1.02,-.45,0x2a2e34);
   bx(.85,.65,.85,.68,.48,.42,0x4a4f56);bx(.92,.12,.92,.68,.82,.42,0x7a542e);
   const wh=new T.Group();wh.position.set(-.65,.68,.12);g.add(wh);u.wheel=wh;
   bx(.12,.68,.12,0,0,0,0xc4552a,wh);bx(.68,.12,.12,0,0,0,0xc4552a,wh);
   const dr=new T.Group();dr.position.set(0,1.15,0);g.add(dr);u.drill=dr;
   const shaft=new T.Mesh(new T.CylinderGeometry(.11,.11,1.9,10),mat||cmat(0x7a828c));shaft.position.set(0,.35,0);dr.add(shaft);
   const bit=new T.Mesh(new T.ConeGeometry(.28,.55,10),mat||cmat(0x2a2e34));bit.rotation.x=Math.PI;bit.position.set(0,-.72,0);dr.add(bit);
  }else if(v==='barricade'){
   // Wood Barricade: five stacked planks on three posts with ground braces
   for(let i=0;i<5;i++)bx(2.5,.3,.12,0,.17+i*.31,0,i%2?0x6b4a2a:0x7a5a38);
   for(const x of[-1.15,0,1.15])bx(.16,1.62,.3,x,.81,0,0x4a321a);
   for(const x of[-1.15,1.15]){bx(.14,.14,.7,x,.07,.36,0x4a321a);bx(.14,.14,.7,x,.07,-.36,0x4a321a)}
  }else if(v==='window_bars'){
   // Reinforced Window: frame + 5 vertical steel bars + cross-bar + ballistic glass
   bx(1.26,.09,.18,0,1.04,0,0x4a3622);bx(1.26,.09,.18,0,2.26,0,0x4a3622);
   bx(.09,1.3,.18,-.59,1.65,0,0x4a3622);bx(.09,1.3,.18,.59,1.65,0,0x4a3622);
   for(const x of[-.4,-.2,0,.2,.4])bx(.04,1.18,.04,x,1.65,0,0x6e7680);
   bx(1.12,.045,.05,0,1.65,0,0x555b64);
   if(!mat){const gls=new T.Mesh(new T.BoxGeometry(1.1,1.14,.02),new T.MeshBasicMaterial({color:0x88c8e8,transparent:true,opacity:.26,depthWrite:false}));gls.position.set(0,1.65,0);g.add(gls)}
  }else if(v==='embrasure'){
   // Metal Window Embrasure: heavy steel shutter plates with horizontal gun slits & corner rivets
   bx(1.28,.1,.22,0,1.04,0,0x2a2e34);bx(1.28,.1,.22,0,2.26,0,0x2a2e34);
   bx(.12,1.32,.22,-.58,1.65,0,0x2a2e34);bx(.12,1.32,.22,.58,1.65,0,0x2a2e34);
   for(const y of[1.22,1.52,1.78,2.08])bx(1.12,.17,.12,0,y,0,0x525862);
   bx(.06,1.22,.15,-.28,1.65,0,0x383d44);bx(.06,1.22,.15,.28,1.65,0,0x383d44);
   for(const x of[-.52,.52])for(const y of[1.14,1.65,2.16])bx(.06,.06,.24,x,y,0,0xd4af37);
  }else if(v==='metal_door'){
   // Sheet Metal Door: gunmetal panel, vertical corrugation ribs, upper sliding peep-slot & keypad lock
   bx(1.2,2.3,.1,.6,1.15,0,0x565d66);
   for(const x of[.18,.38,.6,.82,1.02])bx(.05,2.14,.12,x,1.15,0,0x3e444c);
   bx(1.16,.12,.13,.6,2.22,0,0x2e333a);bx(1.16,.12,.13,.6,.08,0,0x2e333a);bx(1.16,.1,.13,.6,1.15,0,0x2e333a);
   bx(.46,.18,.14,.6,1.72,0,0x22262b);bx(.38,.06,.15,.6,1.72,0,0x0c0e10);
   bx(.14,.22,.15,1.04,1.12,0,0x1e2227);bx(.04,.04,.17,1.02,1.18,0,0x38ff6a);bx(.04,.04,.17,1.06,1.18,0,0xff3838);
  }else if(v==='hq_door'){
   // Armored High-Quality Metal Door: heavy vault steel, cross-ribs, gold rivets, hatch & vault wheel
   bx(1.2,2.3,.13,.6,1.15,0,0x2e343c);
   bx(1.22,.14,.16,.6,2.23,0,0x48505a);bx(1.22,.14,.16,.6,.07,0,0x48505a);
   bx(.12,2.3,.16,.06,1.15,0,0x48505a);bx(.12,2.3,.16,1.14,1.15,0,0x48505a);
   bx(1.18,.12,.16,.6,1.15,0,0x48505a);bx(.12,2.2,.15,.6,1.15,0,0x48505a);
   bx(.48,.24,.17,.6,1.74,0,0x1b1f24);bx(.36,.08,.18,.6,1.74,0,0x090b0d);
   for(const x of[.16,1.04])for(const y of[.28,.75,1.55,2.02])bx(.07,.07,.18,x,y,0,0xe6bf55);
   const wh=new T.Mesh(new T.CylinderGeometry(.18,.18,.18,10),mat||cmat(0xc8a23c));wh.rotation.x=1.5708;wh.position.set(.94,1.15,0);g.add(wh);
  }else{
   // Wooden Door: planked timber with iron cross-braces & brass handle
   bx(1.2,2.3,.1,.6,1.15,0,0x6b4a2a);
   for(const x of[.25,.5,.75,.95])bx(.03,2.24,.11,x,1.15,0,0x4a321a);
   bx(1.16,.1,.12,.6,1.95,0,0x2a2e34);bx(1.16,.1,.12,.6,.35,0,0x2a2e34);
   bx(.1,.18,.15,1.04,1.12,0,0xc9a437);
  }}
 return g}
function edge(qx,qz){const cx=Math.round(qx/C),cz=Math.round(qz/C),fx=qx/C-cx,fz=qz/C-cz;
 if(Math.abs(fx)>Math.abs(fz))return fx>0?{ex:cx,ez:cz,d:'E'}:{ex:cx-1,ez:cz,d:'E'};
 return fz>0?{ex:cx,ez:cz,d:'S'}:{ex:cx,ez:cz-1,d:'S'}}
const RCH={foundation:4.5,roof:1.2,stairs:1.2,wall:2.2,doorway:2.2,window:2.2};
let NPCBUILD=0;
function aim(it,ox,oz,LV){const p=it.bd&&it.bd.p,r=it.bd?RCH[p]:(isDoor(it.dv)||isWin(it.dv))?2.2:(it.dv==='pump_jack'||it.dv==='quarry')?3.4:2.5,L=LV===undefined?curL():LV,qx=ox!==undefined?ox:P.x-Math.sin(yaw)*r,qz=oz!==undefined?oz:P.z-Math.cos(yaw)*r;
 if(it.dv&&!isDoor(it.dv)&&!isWin(it.dv)){const y=G(qx,qz,LV===undefined?undefined:-99);return{x:qx,y,z:qz,rot:yaw+Math.PI,ok:y>.3,why:'Too wet here.'}}
 if(p==='foundation'||p==='roof'||p==='stairs'){const cx=Math.round(qx/C),cz=Math.round(qz/C),k=key(cx,cz,p==='foundation'?0:L),o={x:cx*C,z:cz*C,k,p,rot:0};
  if(p==='roof'||p==='stairs'){const f=FD.get(key(cx,cz)),sup=!!f&&(L===0||RF.has(key(cx,cz,L-1))||STR.has(key(cx,cz,L-1)));o.y=f?f.y+FH*L:H(o.x,o.z);o.ok=sup&&!RF.has(k)&&!STR.has(k);o.why=sup?'Space already used.':'Needs a foundation or floor below.';
   if(p==='stairs'){const fx=-Math.sin(yaw),fz=-Math.cos(yaw),ax=Math.abs(fx)>Math.abs(fz);o.dx=ax?Math.sign(fx):0;o.dz=ax?0:Math.sign(fz);o.rot=Math.atan2(o.dx,o.dz)}return o}
  const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(d=>FD.get(key(cx+d[0],cz+d[1]))).find(Boolean),hs=[[-1,-1],[1,-1],[-1,1],[1,1]].map(d=>H(o.x+d[0]*1.5,o.z+d[1]*1.5));
  o.y=nb?nb.y:padTop(o.x,o.z);o.ok=!FD.has(k)&&Math.min(...hs)>.3&&(NPCBUILD||o.y-Math.min(...hs)<2.6);o.why=FD.has(k)?'Already built.':'Ground too steep or wet.';return o}
 const e=edge(qx,qz),k=key(e.ex,e.ez,e.d+(L||'')),E=e.d==='E',x=E?(e.ex+.5)*C:e.ex*C,z=E?e.ez*C:(e.ez+.5)*C,rot=E?Math.PI/2:0,
  a=FD.get(key(e.ex,e.ez)),b=FD.get(E?key(e.ex+1,e.ez):key(e.ex,e.ez+1)),f=a||b,o={x,z,k,rot,p,y:(f?Math.max(a?a.y:-99,b?b.y:-99):H(x,z))+FH*L};
 if(isDoor(it.dv)){const w=WL.get(k);o.cx=x;o.cz=z;o.x=x-.6*Math.cos(rot);o.z=z+.6*Math.sin(rot);const canUp=w&&w.p==='doorway'&&w.door&&w.doorDev&&DORD.indexOf(it.dv)>DORD.indexOf(w.doorDev.t);o.ok=!!w&&w.p==='doorway'&&(!w.door||canUp);o.upDoor=canUp?w.doorDev:null;o.why='Needs an empty doorway.';return o}
 if(isWin(it.dv)){const w=WL.get(k);if(w&&w.p==='window'&&!w.win){o.cx=x;o.cz=z;o.ok=true;o.inWin=1;return o}const y=G(qx,qz,LV===undefined?undefined:-99);return{x:qx,y:y-.95,z:qz,rot:yaw+Math.PI,ok:y>.3,why:'Needs a Window Wall or dry ground.'}}
 o.ok=!!f&&!WL.has(k)&&(L===0||RF.has(key(e.ex,e.ez,L-1))||RF.has(key(E?e.ex+1:e.ex,E?e.ez:e.ez+1,L-1))||STR.has(key(e.ex,e.ez,L-1))||STR.has(key(E?e.ex+1:e.ex,E?e.ez:e.ez+1,L-1)));o.why=f?'That edge is taken or unsupported.':'Needs a foundation next to it.';return o}
const rect=(cx,cz,len,rot,off)=>rot===0?{x0:cx+off-len/2,x1:cx+off+len/2,z0:cz-.2,z1:cz+.2}:{x0:cx-.2,x1:cx+.2,z0:cz+off-len/2,z1:cz+off+len/2};
let terrDirty=0,terrIndex=null;
function terrLookup(){if(terrIndex||!terrMesh)return terrIndex;const pos=terrMesh.geometry.attributes.position,W=TN+1,map=new Int32Array(W*W).fill(-1);for(let i=0;i<pos.count;i++){const ix=Math.round((pos.getX(i)/TS+.5)*TN),iy=Math.round((.5-pos.getZ(i)/TS)*TN);if(ix>=0&&iy>=0&&ix<=TN&&iy<=TN)map[iy*W+ix]=i}terrIndex=map;return map}
function padTop(x,z){let hi=-1e9;for(let i=0;i<5;i++)for(let j=0;j<5;j++){const h=H(x+(i-2)*.75,z+(j-2)*.75);if(h>hi)hi=h}return hi}
const DEV_BOX={
 tc:[.48,.32,1.22],box:[.52,.38,.78],box_s:[.38,.28,.56],box_l:[.78,.44,.98],workbench:[.74,.38,.84],workbench2:[.78,.4,.95],workbench3:[.9,.46,1.15],research:[.80,.46,.90],
 furnace:[.56,.56,1.38],refinery:[.64,.58,2.15],water_collector:[.64,.64,1.52],
 battery:[.36,.28,.95],heater:[.32,.28,1.02],turret:[.34,.34,1.36],
 solar:[.55,.45,1.25],wind:[.24,.24,6.0],pump_jack:[1.18,.66,1.95],quarry:[1.22,1.12,2.42],barricade:[1.3,.18,1.62]
};
function seatFoundation(x,z,top){
  const map=terrLookup();if(!map||!terrMesh)return;
  const pos=terrMesh.geometry.attributes.position,col=terrMesh.geometry.attributes.color,W=TN+1,target=top-.22,berm=top-.58;
  const cx=Math.round((x/TS+.5)*TN),cz=Math.round((.5-z/TS)*TN);
  for(let iy=Math.max(0,cz-3);iy<=Math.min(TN,cz+3);iy++)for(let ix=Math.max(0,cx-3);ix<=Math.min(TN,cx+3);ix++){
    const vi=map[iy*W+ix];if(vi<0)continue;
    const vx=(ix/TN-.5)*TS,vz=(.5-iy/TN)*TS,dist=Math.hypot(vx-x,vz-z);
    if(dist>22)continue;
    const y0=HG[iy*W+ix];let ny=target;
    if(dist>15.2){const t=(dist-15.2)/6.8,s=t*t*(3-2*t);ny=target+(y0-target)*s}
    if(ny<y0-.003){pos.setY(vi,ny);HG[iy*W+ix]=ny;terrDirty=1}
    else if(y0>.35&&y0<berm&&dist<18.5){
      const t=Math.max(0,(dist-8.5)/10),s=1-t*t*(3-2*t),ry=y0+Math.min(1.35,berm-y0)*s*.65;
      if(ry>y0+.005&&ry<target-.15){pos.setY(vi,ry);HG[iy*W+ix]=ry;terrDirty=1;if(col){col.setXYZ(vi,col.getX(vi)*.86+.52*.14,col.getY(vi)*.86+.45*.14,col.getZ(vi)*.86+.34*.14)}}
    }
  }
}
function flushTerrain(){if(!terrDirty||!terrMesh)return;terrDirty=0;const g=terrMesh.geometry;g.attributes.position.needsUpdate=true;if(g.attributes.color)g.attributes.color.needsUpdate=true;g.computeVertexNormals();g.computeBoundingSphere()}
function reseatFoundations(){for(const [k,f] of FD){const parts=String(k).split(',');if(parts.length!==2)continue;seatFoundation(+parts[0]*C,+parts[1]*C,f.y)}flushTerrain()}
function onFound(x,z){const cx=Math.round(x/C),cz=Math.round(z/C);return FD.has(key(cx,cz))&&Math.hypot(x-cx*C,z-cz*C)<1.55}
function onPlan(x,z,pad){const m=pad==null?1.8:pad;for(const n of NP){const p=n.plan;if(!p||p.cx==null)continue;if(x>=(p.cx-1)*C-m&&x<=(p.cx+p.w)*C+m&&z>=(p.cz-1)*C-m&&z<=(p.cz+p.d)*C+m)return true}return false}
function construct(it,g,npc){const m=mk(it,null);m.position.set(g.x,g.y,g.z);m.rotation.y=g.rot||0;scene.add(m);noteBuild(it,g,npc);if(it.bd)PCS.push({m,p:it.bd.p,t:it.bd.t,k:g.k,owner:npc?'npc':'you'});
 if(it.bd){const p=g.p;if(p==='foundation'){FD.set(g.k,{y:g.y});seatFoundation(g.x,g.z,g.y);if(!npc)flushTerrain();clearNodes(g.x,g.z,2.3);ALLC.push({x0:g.x-1.5,x1:g.x+1.5,z0:g.z-1.5,z1:g.z+1.5,y:g.y-2.6,top:g.y,found:1})}else if(p==='roof')RF.set(g.k,1);else if(p==='stairs')STR.set(g.k,{dx:g.dx,dz:g.dz});
  else{WL.set(g.k,{p});const rs=p==='doorway'?[rect(g.x,g.z,.9,g.rot,-1.05),rect(g.x,g.z,.9,g.rot,1.05)]:[rect(g.x,g.z,3,g.rot,0)];for(const r of rs){r.y=g.y;r.h=3.0;r.piece=1;if(p==='window'){r.winWall=1;r.wx=g.x;r.wz=g.z}r.mesh=m;r.wk=g.k;r.owner=npc?'npc':'you';r.tier=it.bd.t;r.born=age;r.hp=r.maxHp=(HPT[it.bd.t]||140);ALLC.push(r)}}return}
 if(g.upDoor){upgradeDoor(g.upDoor,it.dv,REPLAY||npc);scene.remove(m);return}
 const dhp=DHP[it.dv]||(it.dv==='embrasure'?480:it.dv==='window_bars'?300:it.dv==='quarry'||it.dv==='pump_jack'?400:it.dv==='refinery'?240:it.dv==='tc'?200:140);
 const d={t:it.dv,x:g.x,y:g.y,z:g.z,i:devs.length,ch:0,pw:0,on:true,out:0,use:{lamp:3,heater:10,turret:4}[it.dv]||0,open:false,rot:g.rot,m,sl:Array(isInd(it.dv)?6:it.dv==='box_s'?6:it.dv==='box_l'?24:12).fill(null),burn:0,prog:0,water:it.dv==='water_collector'?40:0,owner:npc?'npc':'you',hp:dhp,maxHp:dhp,born:age};
 if((it.dv==='pump_jack'||it.dv==='quarry')&&!npc&&!REPLAY)d.sl[0]={id:'fuel',n:5};
 Object.assign(m.userData,{k:'dev',d});things.push(m);devs.push(d);
 if(isDoor(it.dv)){const w=WL.get(g.k);if(w){w.door=1;w.doorDev=d}ALLC.push(Object.assign(rect(g.cx,g.cz,1.2,g.rot,0),{d,y:g.y,h:2.4}))}
 else if(isWin(it.dv)){const w=g.k&&WL.get(g.k);if(w){w.win=1;w.winDev=d}ALLC.push(Object.assign(rect(g.cx||g.x,g.cz||g.z,1.2,g.rot,0),{d,y:g.y,h:2.3}))}
 else if(DEV_BOX[it.dv]){
  const [hx0,hz0,dh]=DEV_BOX[it.dv],ca=Math.abs(Math.cos(g.rot||0)),sa=Math.abs(Math.sin(g.rot||0)),hx=hx0*ca+hz0*sa,hz=hx0*sa+hz0*ca;
  ALLC.push({x0:g.x-hx,x1:g.x+hx,z0:g.z-hz,z1:g.z+hz,y:g.y,h:dh,d,devBody:1});
 }
 if(it.dv==='lamp'){d.l=new T.PointLight(0xffe2a0,0,12);d.l.position.set(0,1.8,0);m.add(d.l)}if(it.dv==='furnace'||it.dv==='refinery'){d.l=new T.PointLight(0xff7a2a,0,9);d.l.position.set(0,1,.8);m.add(d.l)}}
function buildAct(s){const it=ITEMS[s.id],a=aim(it);if(!a.ok)return say(a.why);if(it.dv==='tc'&&tcCovering(a.x,a.z))return say('Too close to another tool cupboard.');const why=privWhy(a.x,a.z,null);if(why)return say(why);construct(it,a);if(--s.n<=0)SL[sel]=null;render()}
function addWire(a,b){const l=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(a.x,a.y+1.1,a.z),new T.Vector3(b.x,b.y+1.1,b.z)]),new T.LineBasicMaterial({color:0xe6c340}));scene.add(l);wires.push({a,b,l})}
function devAct(o){const d=o.userData.d;
 if(isBox(d.t)||isInd(d.t)){curBox=d;open=true;tab='bag';pick=null;render();lookLock(false);return}
 if(d.t==='water_collector'){const w=Math.floor(d.water||0);if(w<2)return say('Water Collector is nearly empty ('+w+'/100). Wait for rain or morning dew.');const takeW=Math.min(w,35);d.water-=takeW;S.thirst=Math.min(100,S.thirst+Math.max(18,takeW*1.3));S.health=Math.min(100,S.health+6);S.energy=Math.min(100,S.energy+10);blip(480,.06,'sine');return say('You drink fresh water from the collector ('+Math.floor(d.water)+'/100 left).')}
 if(d.t==='tc'){if(d.owner!=='you')return say('Locked. You are not on this tool cupboard.');curBox=d;open=true;tab='bag';pick=null;render();lookLock(false);return say('Tool cupboard open. Keep it fed, or the base starts to rot.')}
 if(WB_TIERS[d.t]){curBox=null;open=true;tab='craft';pick=null;render();lookLock(false);return say(NAMES[d.t]+': craft here, or research blueprints for 2x scrap.')}
 if(d.t==='research'){curBox=null;open=true;tab='research';pick=null;render();lookLock(false);return say('Research Table: spend scrap and an item to learn its blueprint.')}
 if(isDoor(d.t)){d.open=!d.open;blip(d.t==='hq_door'?180:d.t==='metal_door'?260:320,.05,'triangle');return say(d.open?(NAMES[d.t]+' opened.'):(NAMES[d.t]+' closed.'))}
 if(tool('wire')){if(!wf){wf=d;return say('Wire started at '+NAMES[d.t]+'. Aim at another device and press Use.')}
  if(wf===d){wf=null;return say('Wire cancelled.')}
  if(Math.hypot(wf.x-d.x,wf.z-d.z)>30){wf=null;return say('Too far. Wires reach 30 m.')}
  const ex=wires.findIndex(w=>(w.a===wf&&w.b===d)||(w.a===d&&w.b===wf));
  if(ex>=0){scene.remove(wires[ex].l);wires.splice(ex,1);say('Wire removed.')}else{addWire(wf,d);say('Connected '+NAMES[wf.t]+' to '+NAMES[d.t]+'.')}wf=null;return}
 if(d.t==='switch'){d.on=!d.on;return say('Switch '+(d.on?'on: current flows.':'off: circuit broken.'))}
 say(plabel(o))}
function plabel(o){const k=o.userData.k;if(k==='crate')return'Open '+o.userData.nm;if(k==='drop')return'Pick up '+(ITEMS[o.userData.item]?ITEMS[o.userData.item].n:'meat')+(o.userData.n>1?' ×'+o.userData.n:'');if(k==='settler')return(o.userData.a&&o.userData.a.aggro>0)?'Fight settler':'Attack settler';if(k!=='dev')return{tree:'Gather wood',rock:'Gather stone',bush:'Pick berries & fiber',hemp:'Pick wild hemp (Cloth & Plant Fiber)',junk:'Search junk pile',recycler:'Use Recycler',barrel:'Break barrel (needs a tool)',sulfur:'Mine sulfur',ore:'Mine ore',deer:'Hunt deer',wolf:'Fight wolf',raider:'Fight raider'}[k];
 const d=o.userData.d,n=NAMES[d.t];if(isBox(d.t)||isInd(d.t))return'Open '+NAMES[d.t];if(d.t==='water_collector')return'Drink from Water Collector ('+Math.floor(d.water||0)+'/100)';if(d.t==='tc')return d.owner==='you'?'Open tool cupboard':'Locked tool cupboard';if(isDoor(d.t))return(d.open?'Close ':'Open ')+NAMES[d.t];if(d.t==='switch')return n+' ('+(d.on?'on':'off')+') — toggle';
 if(d.t==='turret'&&d.pw<.45)return n+' — needs power';if(WB_TIERS[d.t])return NAMES[d.t]+' — craft or research here';if(d.t==='research')return 'Use Research Table';if(d.t==='spike'||d.t==='snap')return n;if(d.t==='battery')return n+' '+Math.round(d.ch)+'/'+BCAP;if(d.out)return n+' '+d.out.toFixed(0)+' W';if(d.use)return n+' '+Math.round(d.use*d.pw)+'/'+d.use+' W';return n}
function power(dt){tg=tu=tb=0;const p=devs.map((_,i)=>i),f=i=>p[i]===i?i:(p[i]=f(p[i]));
 for(const w of wires){if((w.a.t==='switch'&&!w.a.on)||(w.b.t==='switch'&&!w.b.on))continue;p[f(w.a.i)]=f(w.b.i)}
 const Gs={};
 for(const d of devs){if(isDoor(d.t)||isWin(d.t))continue;
  if(d.t==='solar')d.out=20*Math.pow(dl(),2)*(wx==='storm'?.15:wx==='rain'||wx==='snow'?.4:wx==='overcast'||wx==='fog'?.62:1);else if(d.t==='wind')d.out=Math.max(18,(12+16*(.5+.5*Math.sin(age*.3+d.x)))*(wx==='storm'?1.85:wx==='rain'?1.35:wx==='snow'?1.12:wx==='clear'?.9:1));
  const g=Gs[f(d.i)]=Gs[f(d.i)]||{gen:0,b:[],tur:[],lite:[],heat:[]};g.gen+=d.out||0;if(d.t==='battery')g.b.push(d);if(d.use)(d.t==='turret'?g.tur:d.t==='heater'?g.heat:g.lite).push(d)}
 const sumUse=list=>{let s=0;for(const d of list)s+=d.use;return s};
 const givePw=(list,avail)=>{const need=sumUse(list);if(!list.length)return avail;const got=Math.max(0,Math.min(avail,need)),ratio=need?got/need:0;for(const d of list)d.pw=Math.min(1,ratio);return avail-got};
 for(const r in Gs){const g=Gs[r],turN=sumUse(g.tur),liteN=sumUse(g.lite),heatN=sumUse(g.heat),crit=turN+liteN;tg+=g.gen;tu+=crit+heatN;let battIn=0;
  if(crit>g.gen&&g.b.length){const need=(crit-g.gen)*dt,have=g.b.reduce((a,b)=>a+b.ch,0),take=Math.min(need,have);for(const b of g.b)b.ch-=have?take*b.ch/have:0;battIn=dt>1e-6?take/dt:0}
  let avail=g.gen+battIn;avail=givePw(g.tur,avail);avail=givePw(g.lite,avail);
  const heatAvail=Math.max(0,g.gen-crit),heatGot=Math.min(heatN,heatAvail);givePw(g.heat,heatAvail);
  const left=Math.max(0,g.gen-crit-heatGot);if(left>0&&battIn===0&&g.b.length){const add=left*dt;for(const b of g.b)b.ch=Math.min(BCAP,b.ch+add/g.b.length)}
  for(const b of g.b)tb+=b.ch}}
function anim(dt){for(const d of devs){const u=d.m.userData;
 if(d.t==='wind')u.rotor.rotation.z+=dt*d.out*.15;
 if(d.t==='turret'&&u.gun)u.gun.rotation.x=d.pw>.45?0:.42;
 if(d.t==='lamp'){const on=d.pw>.05;u.bulb.material.color.set(on?0xffeeaa:0x555544);d.l.intensity=on?2.2*d.pw:0}
 if(d.t==='switch')u.cap.material.color.set(d.on?0x33cc44:0xcc3322);
 if(isDoor(d.t))d.m.rotation.y+=((d.rot+(d.open?-1.7:0))-d.m.rotation.y)*Math.min(1,dt*6);
 if(d.t==='pump_jack'&&d.burn>0&&u.beam){const s=Math.sin(age*2.8);u.beam.rotation.z=s*.26;if(u.rod)u.rod.position.y=.72+s*.22}
 if(d.t==='quarry'&&d.burn>0){if(u.drill)u.drill.position.y=1.15+Math.sin(age*14)*.18;if(u.wheel)u.wheel.rotation.z+=dt*5}
 if(d.t==='water_collector'){const rate=wx==='storm'?3.5:wx==='rain'?2.4:(wx==='fog'||wx==='snow')?.85:.42;d.water=Math.min(100,(d.water||0)+dt*rate);if(u.waterLvl)u.waterLvl.position.y=.18+.72*(d.water/100)}}}
function ghostTick(){const s=SL[sel],it=s&&ITEMS[s.id];if(!it||!(it.bd||it.dv)||open){if(gh)gh.visible=false;return}
 if(ghId!==s.id){if(gh)scene.remove(gh);gh=mk(it,GM);scene.add(gh);ghId=s.id}
 const a=aim(it);let ok=a.ok&&!privWhy(a.x,a.z,null);if(ok&&it.dv==='tc'&&tcCovering(a.x,a.z))ok=false;gh.visible=true;gh.position.set(a.x,a.y,a.z);gh.rotation.y=a.rot||0;GM.color.set(ok?0x66ff66:0xff5555)}
const RAD=.42,SCELL=12,STATIC_GRID=new Map();
function addStaticCol(x,z,y,r,h,kind){
 const k=Math.floor(x/SCELL)+','+Math.floor(z/SCELL);
 let b=STATIC_GRID.get(k);if(!b){b=[];STATIC_GRID.set(k,b)}
 b.push({x,z,y,r:r||.32,h:h||3.5,kind:kind||'tree'});
}
function touchStaticGrid(ent,rad,feet){
 const gx=Math.floor(ent.x/SCELL),gz=Math.floor(ent.z/SCELL);
 for(let di=-1;di<=1;di++)for(let dj=-1;dj<=1;dj++){
  const b=STATIC_GRID.get((gx+di)+','+(gz+dj));if(!b)continue;
  for(let i=0;i<b.length;i++){
   const c=b[i];
   if(feet!==undefined&&(feet>c.y+c.h-.15||feet<c.y-1.8))continue;
   const dx=ent.x-c.x,dz=ent.z-c.z,need=rad+c.r,d2=dx*dx+dz*dz;
   if(d2<need*need&&d2>1e-8){const d=Math.sqrt(d2);ent.x=c.x+dx/d*need;ent.z=c.z+dz/d*need}
  }
 }
}
function propColRad(o,k){
 if(k==='tree')return Math.min(.52,Math.max(.26,(o.userData.rad||.36)*.72));
 if(k==='rock')return Math.min(1.65,Math.max(.42,(o.userData.rad||.68)*.78));
 if(k==='ore')return .68;
 if(k==='sulfur')return .72;
 if(k==='barrel')return Math.min(.56,Math.max(.34,(o.userData.rad||.52)*.82));
 if(k==='junk')return .66;
 if(k==='crate')return o.userData.tier===3?.46:o.userData.tier===2?.42:.38;
 if(k==='recycler')return .72;
 return 0;
}
function touchNearProps(ent,rad,feet,list){
 const arr=list||NEAR;
 for(let i=0;i<arr.length;i++){
  const o=arr[i];if(!o)continue;
  const k=o.userData&&o.userData.k;
  if(k==='barrel'||k==='ore'||k==='sulfur'||k==='rock'||k==='tree'||k==='junk'||k==='crate'){
   const oy=o.position.y,oh=k==='crate'?.72:k==='junk'?.95:k==='barrel'?1.15:k==='ore'||k==='sulfur'?1.25:2.8;
   if(feet!==undefined&&(feet>oy+oh-.15||feet<oy-1.8))continue;
   const pr=propColRad(o,k),need=rad+pr,dx=ent.x-o.position.x,dz=ent.z-o.position.z,d2=dx*dx+dz*dz;
   if(d2<need*need&&d2>1e-8){const d=Math.sqrt(d2);ent.x=o.position.x+dx/d*need;ent.z=o.position.z+dz/d*need}
  }else if((k==='settler'||k==='raider'||k==='deer'||k==='wolf')&&ent===P){
   const a=o.userData.a;if(!a||a.hp<=0)continue;
   const ay=a.y||o.position.y;if(Math.abs(feet-ay)>1.6)continue;
   const need=rad+.30,dx=ent.x-o.position.x,dz=ent.z-o.position.z,d2=dx*dx+dz*dz;
   if(d2<need*need&&d2>1e-8){const d=Math.sqrt(d2);ent.x=o.position.x+dx/d*need;ent.z=o.position.z+dz/d*need}
  }
 }
 for(let i=0;i<fires.length;i++){
  const q=fires[i],fy=q.g?q.g.position.y:H(q.x,q.z);
  if(feet!==undefined&&Math.abs(feet-fy)>1.2)continue;
  const need=rad+.34,dx=ent.x-q.x,dz=ent.z-q.z,d2=dx*dx+dz*dz;
  if(d2<need*need&&d2>1e-8){const d=Math.sqrt(d2);ent.x=q.x+dx/d*need;ent.z=q.z+dz/d*need}
 }
}
function buildOverlap(){const feet=P.y-1.7;
 for(let pass=0;pass<2;pass++)for(let i=0;i<ALLC.length;i++){
  const c=ALLC[i];
  if(c.ramp)continue;
  if(c.d&&(c.d.open||c.d._gone))continue;
  if(c.found){if(feet>=c.top-.48||c.top-feet<=2.35)continue}
  else{
   const ch=c.h||2.85;
   if(c.y!==undefined&&(feet>=c.y+ch-.22||feet<c.y-1.85))continue;
  }
  const nx=Math.max(c.x0,Math.min(c.x1,P.x)),nz=Math.max(c.z0,Math.min(c.z1,P.z));let dx=P.x-nx,dz=P.z-nz,d=Math.hypot(dx,dz);if(d>=RAD)continue;
  if(d<=1e-4){const a=P.x-c.x0,b=c.x1-P.x,e=P.z-c.z0,f=c.z1-P.z,m=Math.min(a,b,e,f);if(m===a)P.x=c.x0-RAD;else if(m===b)P.x=c.x1+RAD;else if(m===e)P.z=c.z0-RAD;else P.z=c.z1+RAD;continue}
  P.x=nx+dx/d*RAD;P.z=nz+dz/d*RAD}}
function slideStep(dx,dz){const dist=Math.hypot(dx,dz);if(dist<1e-5)return;const n=Math.max(1,Math.ceil(dist/.10)),feet=P.y-1.7;
 for(let i=0;i<n;i++){
  P.x=Math.max(-B,Math.min(B,P.x+dx/n));P.z=Math.max(-B,Math.min(B,P.z+dz/n));
  touchPosts(P,RAD);touchStaticGrid(P,RAD,feet);touchNearProps(P,RAD,feet,NEAR);buildOverlap();
 }}
function collide(){const feet=P.y-1.7;
 touchPosts(P,RAD);touchStaticGrid(P,RAD,feet);touchNearProps(P,RAD,feet,NEAR);buildOverlap();
 if(H(P.x,P.z)<-1.2){P.x=LP.x;P.z=LP.z}else{LP.x=P.x;LP.z=P.z}}
function heat(){let h=0;for(const d of devs)if(d.t==='heater'&&d.pw>.05&&Math.hypot(P.x-d.x,P.z-d.z)<6)h+=30*d.pw;else if((d.t==='furnace'||d.t==='refinery')&&d.burn>0&&Math.hypot(P.x-d.x,P.z-d.z)<6)h+=14;return Math.min(h,30)+(RF.has(key(Math.round(P.x/C),Math.round(P.z/C)))?8:0)}
let fq=-1;
function addOut(sl,id,n){let left=n;const mx=ITEMS[id].max;for(let i=3;i<6&&left>0;i++)if(sl[i]&&sl[i].id===id&&sl[i].n<mx){const a=Math.min(mx-sl[i].n,left);sl[i].n+=a;left-=a}for(let i=3;i<6&&left>0;i++)if(!sl[i]){const a=Math.min(mx,left);sl[i]={id,n:a};left-=a}return left<n}
function hasOutRoom(sl,id,n){let r=0;const mx=ITEMS[id].max;for(let i=3;i<6;i++){if(!sl[i])r+=mx;else if(sl[i].id===id)r+=mx-sl[i].n}return r>=n}
function furnaces(dt){for(const d of devs){if(!isInd(d.t)||d._gone)continue;const sl=d.sl,fast=!!d.npc;
 if(d.t==='furnace'){
  const oi=sl.findIndex((s,i)=>i<3&&s&&s.id==='ore'),room=hasOutRoom(sl,'metal',1);
  if(d.burn<=0&&oi>=0&&room){const fi=sl.findIndex((s,i)=>i<3&&s&&s.id==='fuel');if(fi>=0){if(--sl[fi].n<=0)sl[fi]=null;d.burn=fast?54:30}else{const wi=sl.findIndex((s,i)=>i<3&&s&&s.id==='wood');if(wi>=0){if(--sl[wi].n<=0)sl[wi]=null;d.burn=fast?18:10}}}
  if(d.burn>0){d.burn-=dt;if(oi>=0&&room){d.prog+=dt;const step=fast?.22:4;let guard=0;while(d.prog>=step&&guard++<6){d.prog-=step;const oi2=sl.findIndex((s,i)=>i<3&&s&&s.id==='ore');if(oi2<0||!hasOutRoom(sl,'metal',1)){d.prog=0;break}if(--sl[oi2].n<=0)sl[oi2]=null;addOut(sl,'metal',1)}}}else d.prog=0;
  if(d.l)d.l.intensity=d.burn>0?1.6+Math.random()*.5:0;const gl=d.m.userData.glow;if(gl)gl.material.color.set(d.burn>0?0xff8a2a:0x331a0a);
 }else if(d.t==='refinery'){
  const ci=sl.findIndex((s,i)=>i<3&&s&&s.id==='crude'),room=hasOutRoom(sl,'fuel',3);
  if(d.burn<=0&&ci>=0&&room){const fi=sl.findIndex((s,i)=>i<3&&s&&s.id==='fuel');if(fi>=0){if(--sl[fi].n<=0)sl[fi]=null;d.burn=32}else{const wi=sl.findIndex((s,i)=>i<3&&s&&s.id==='wood');if(wi>=0){if(--sl[wi].n<=0)sl[wi]=null;d.burn=12}}}
  if(d.burn>0){d.burn-=dt;if(ci>=0&&room){d.prog+=dt;while(d.prog>=3){d.prog-=3;const ci2=sl.findIndex((s,i)=>i<3&&s&&s.id==='crude');if(ci2<0||!hasOutRoom(sl,'fuel',3)){d.prog=0;break}if(--sl[ci2].n<=0)sl[ci2]=null;addOut(sl,'fuel',3)}}}else d.prog=0;
  if(d.l)d.l.intensity=d.burn>0?1.6+Math.random()*.5:0;const gl=d.m.userData.glow;if(gl)gl.material.color.set(d.burn>0?0xff8a2a:0x331a0a);
 }else if(d.t==='pump_jack'){
  const room=hasOutRoom(sl,'crude',1);
  if(d.burn<=0&&room){const fi=sl.findIndex((s,i)=>i<3&&s&&s.id==='fuel');if(fi>=0){if(--sl[fi].n<=0)sl[fi]=null;d.burn=20}}
  if(d.burn>0){d.burn-=dt;if(room){d.prog+=dt;while(d.prog>=4){d.prog-=4;if(!hasOutRoom(sl,'crude',1)){d.prog=0;break}addOut(sl,'crude',1)}}}else d.prog=0;
 }else if(d.t==='quarry'){
  const room=hasOutRoom(sl,'stone',6)||hasOutRoom(sl,'ore',3)||hasOutRoom(sl,'sulfur',2);
  if(d.burn<=0&&room){const fi=sl.findIndex((s,i)=>i<3&&s&&s.id==='fuel');if(fi>=0){if(--sl[fi].n<=0)sl[fi]=null;d.burn=24}}
  if(d.burn>0){d.burn-=dt;if(room){d.prog+=dt;while(d.prog>=4){d.prog-=4;addOut(sl,'stone',6);addOut(sl,'ore',3);addOut(sl,'sulfur',2)}}}else d.prog=0;
 }}
 if(curBox&&Math.hypot(P.x-curBox.x,P.z-curBox.z)>6){curBox=null;open=false;render();lookLock(true)}
 if(curBox&&isInd(curBox.t)&&open&&(age*2|0)!==fq){fq=age*2|0;render()}}
// ===== NPC SETTLERS, RAIDERS, TURRETS =====
let JC=0;
const mGun=new T.MeshPhongMaterial({color:0xffffff,vertexColors:true,flatShading:true,shininess:44,specular:0x4a525c});
class MB {
 constructor(){this.g=new T.Group()}
 mat(c){return LMat({color:c,flatShading:true})}
 pos(m,x,y,z,rot){m.position.set(x||0,y||0,z||0);if(rot)m.rotation.set(rot[0]||0,rot[1]||0,rot[2]||0);this.g.add(m);return m}
 box(w,h,d,x,y,z,c,rot){return this.pos(new T.Mesh(new T.BoxGeometry(w,h,d),this.mat(c)),x,y,z,rot)}
 sph(r,x,y,z,c,sy,seg){const m=new T.Mesh(new T.SphereGeometry(r,seg||8,seg||6),this.mat(c));if(sy)m.scale.y=sy;return this.pos(m,x,y,z)}
 cyl(rt,rb,h,seg,x,y,z,c,rot){return this.pos(new T.Mesh(new T.CylinderGeometry(rt,rb,h,seg||10),this.mat(c)),x,y,z,rot)}
 cone(r,h,seg,x,y,z,c,rot){return this.pos(new T.Mesh(new T.ConeGeometry(r,h,seg||10),this.mat(c)),x,y,z,rot)}
 tor(r,t,x,y,z,c,rot,segT,segR){return this.pos(new T.Mesh(new T.TorusGeometry(r,t,segR||8,segT||14),this.mat(c)),x,y,z,rot)}
 brl(rt,rb,len,seg,x,y,z,c,boreC){this.cyl(rt,rb,len,seg||12,x,y,z,c,[0,0,1.5708]);if(boreC!==false)this.cyl(rt*.66,rt*.66,.025,seg||10,x+len/2-.008,y,z,boreC||0x08090a,[0,0,1.5708])}
 ser(n,w,h,d,x0,dx,y,z,c,rot){for(let i=0;i<n;i++)this.box(w,h,d,x0+i*dx,y,z,c,rot)}
 pic(n,x0,dx,y,z,w,c){const L=n*dx;this.box(L,.012,(w||.046)*.78,x0+L/2-dx/2,y-.006,z,shade(c||0x22252a,.85));for(let i=0;i<n;i++)this.box(dx*.56,.014,w||.046,x0+i*dx,y+.004,z,c||0x2a2e34)}
 vent(n,w,h,d,x0,dx,y,z,c){for(let i=0;i<n;i++)this.box(w,h,d,x0+i*dx,y,z,c||0x0b0c0e)}
 chk(n,w,h,d,x0,dx,y0,dy,z,c,rot){for(let i=0;i<n;i++)this.box(w,h,d,x0+i*dx,y0+i*dy,z,c,rot)}
 build(){
  const ch=this.g.children;if(!ch.length)return this.g;
  const P=[],C=[],col=new T.Color();
  for(let k=ch.length-1;k>=0;k--){
   const m=ch[k];if(!m.isMesh||!m.material||!m.material.color||m.material.transparent)continue;
   m.updateMatrix();
   const g0=m.geometry.clone().applyMatrix4(m.matrix),gm=g0.index?g0.toNonIndexed():g0;
   gm.computeVertexNormals();
   const p=gm.attributes.position.array,n=gm.attributes.normal.array;
   col.copy(m.material.color);
   for(let i=0;i<p.length;i+=3){
    P.push(p[i],p[i+1],p[i+2]);
    const ny=n[i+1]||0,nx=n[i]||0,sh=1+ny*.09+nx*.03;
    C.push(Math.min(1,Math.max(0,col.r*sh)),Math.min(1,Math.max(0,col.g*sh)),Math.min(1,Math.max(0,col.b*sh)));
   }
   this.g.remove(m);m.geometry.dispose();g0.dispose();if(gm!==g0)gm.dispose();
  }
  if(P.length){
   const geo=new T.BufferGeometry();
   geo.setAttribute('position',new T.Float32BufferAttribute(P,3));
   geo.setAttribute('color',new T.Float32BufferAttribute(C,3));
   geo.computeVertexNormals();
   const mesh=new T.Mesh(geo,mGun);
   this.g.add(mesh);
  }
  return this.g;
 }
}

const shade=(c,k)=>{const r=Math.min(255,(c>>16&255)*k|0),g=Math.min(255,(c>>8&255)*k|0),b=Math.min(255,(c&255)*k|0);return r<<16|g<<8|b};
function rnd(){const f=Math.sin(JC++*91.7+3.1)*43758.5453;return f-Math.floor(f)}
function gunM(f){
 if(!f._cache){
  const b=new MB(),a=new MB(),mg=new MB(),c=new MB(),i=f(b,a,mg,c);
  f._cache={b:b.build(),a:a.build(),mg:mg.build(),c:c.build(),i};
 }
 const C=f._cache,i=C.i,m=C.b.clone();
 m.userData={grip:i.grip,fore:i.fore,gd:i.gd};
 if(C.a.children.length){const ag=C.a.clone(),ap=i.act||[0,0,0];ag.position.set(ap[0],ap[1],ap[2]);ag.userData={b:ap};m.add(ag);m.userData.act=ag}
 if(C.mg.children.length){const mgg=C.mg.clone();m.add(mgg);m.userData.mag=mgg}
 if(C.c.children.length&&i.cyl){const cg=C.c.clone();cg.position.set(i.cyl[0],i.cyl[1],i.cyl[2]);cg.userData={b:i.cyl};m.add(cg);m.userData.cyl=cg}
  else if(C.c.children.length){const sg=C.c.clone();m.add(sg);m.userData.defSight=sg}
 return m;
}
function armHelmet(col){const b=new MB();
 // Ballistic combat helmet seated snugly over cranium, temples, nape, and jawline (no floating gap)
 b.sph(.212,0,.20,0,col,.88,10);
 b.cyl(.185,.195,.12,10,0,.10,-.01,shade(col,.82));
 b.box(.31,.06,.11,0,.185,.168,0x15171a);
 b.box(.28,.026,.09,0,.185,.184,0x385064);
 for(const s of[-1,1]){
  b.box(.048,.20,.30,s*.192,.10,-.01,shade(col,.84));
  b.box(.05,.09,.14,s*.175,.04,.09,shade(col,.76));
 }
 b.box(.26,.12,.05,0,.06,-.165,shade(col,.75));
 b.box(.24,.065,.06,0,.045,.175,shade(col,.72));
 b.box(.07,.04,.36,0,.36,0,0x55595e);
 b.box(.08,.06,.05,0,.26,.195,0x2a2e33);
 return b.build()}
function armVest(col){const b=new MB();
 b.box(.58,.58,.33,0,1.12,0,col);
 b.cyl(.155,.185,.11,8,0,1.42,0,shade(col,.78));
 b.box(.48,.22,.08,0,1.06,.18,shade(col,1.18));
 for(let i=-1;i<=1;i++)b.box(.13,.16,.09,i*.15,.92,.19,0x2a2d30);
 for(let r=0;r<3;r++)b.box(.46,.018,.085,0,1.15+r*.06,.18,0x222528);
 for(const s of[-1,1]){b.box(.12,.08,.36,s*.21,1.40,0,0x333333);b.box(.19,.10,.22,s*.29,1.39,0,shade(col,.92),[0,0,s*-.14]);b.box(.05,.5,.06,s*.295,1.1,0,0x2a2d30)}
 b.box(.60,.05,.35,0,.85,0,0x222222);b.box(.2,.12,.03,0,1.26,.18,0x55595e);
 return b.build()}
function armLegs(col){const b=new MB();b.box(.2,.22,.2,0,-.2,0,col);b.box(.19,.26,.19,0,-.56,.02,col);b.sph(.11,0,-.38,.1,shade(col,1.15),.7,7);b.box(.21,.035,.21,0,-.34,0,0x222222);b.box(.2,.03,.2,0,-.5,0,0x222222);return b.build()}
const AMC=0x4a5058;

function buildAmmoBox(body,lid,tip,stripe){
 const b=new MB();
 b.box(.42,.19,.26,0,.095,0,body);
 b.box(.435,.055,.275,0,.175,0,lid);
 b.box(.425,.02,.265,0,.015,0,shade(body,.75));
 for(const x of[-.16,.16])b.box(.035,.18,.268,x,.095,0,shade(body,.85));
 b.box(.06,.09,.02,0,.13,.138,0x2a2e33);
 b.box(.04,.04,.025,0,.16,.142,0xd9b32a);
 b.box(.16,.018,.08,0,.21,0,0x222528);
 for(const x of[-.07,.07])b.box(.018,.025,.02,x,.202,0,0x555a60);
 b.box(.3,.008,.14,0,.205,.02,0xeeeeee);
 if(stripe)b.box(.43,.035,.268,0,.11,0,stripe);
 for(let i=0;i<7;i++){
  const rx=-.21+i*.07,rz=.21+(i%2)*.045;
  b.cyl(.017,.017,.085,8,rx,.022,rz,0xd4af37,[1.5708,0,0]);
  b.cyl(.018,.018,.012,8,rx,.022,rz-.042,0xb89228,[1.5708,0,0]);
  b.cone(.0165,.045,8,rx,.022,rz+.064,tip,[1.5708,0,0]);
 }
 return b.build();
}

const ITM={
 pistol:()=>gunM((b,a,mg,c)=>{
  // Lower receiver & dust cover with Picatinny accessory rail
  b.box(.50,.042,.072,.09,.092,0,0x22262b);
  b.box(.46,.022,.078,.07,.106,0,0x2b3036);
  b.box(.22,.028,.066,.22,.072,0,0x1d2024);
  b.pic(5,.13,.036,.056,0,.064,0x181b1f);
  // Beaver-tail frame tang & takedown/slide-stop controls
  b.box(.065,.026,.068,-.17,.102,0,0x22262b,[0,0,.32]);
  b.cyl(.012,.012,.084,8,-.13,.112,0,0x141619,[1.5708,0,0]);
  b.box(.055,.018,.014,.04,.112,.042,0x454b52);
  b.box(.042,.016,.014,-.04,.114,.042,0x454b52);
  b.cyl(.011,.011,.016,8,-.05,.068,.042,0x3a3f46,[1.5708,0,0]);
  // Ergonomic grip frame + stippled walnut/G10 grip panels + flared magwell
  b.box(.125,.265,.076,-.102,-.005,0,0x1e2227,[0,0,-.22]);
  b.box(.102,.225,.088,-.102,-.005,0,0x4a3423,[0,0,-.22]);
  for(let i=0;i<6;i++)b.box(.096,.012,.092,-.088-i*.007,.065-i*.032,0,0x2d1f14,[0,0,-.22]);
  for(const z of[-.045,.045])b.cyl(.009,.009,.008,8,-.09,.04,z,0xc8a448,[1.5708,0,0]);
  for(const z of[-.045,.045])b.cyl(.009,.009,.008,8,-.115,-.06,z,0xc8a448,[1.5708,0,0]);
  b.box(.138,.026,.092,-.135,-.128,0,0x16191d,[0,0,-.22]);
  // Undercut trigger guard & skeletonized match trigger + hammer spur
  b.box(.014,.068,.042,.095,.058,0,0x22262b,[0,0,.15]);
  b.box(.125,.014,.042,.038,.028,0,0x22262b);
  b.tor(.022,.007,-.02,.072,0,0x22262b,[0,0,0],8,6);
  b.box(.018,.048,.018,.042,.068,0,0xb4bac2,[0,0,.22]);
  b.box(.036,.024,.022,-.175,.142,0,0x555b62,[0,0,-.45]);
  b.cyl(.012,.012,.024,8,-.19,.155,0,0x7a8088,[1.5708,0,0]);
  // Match grade barrel + stainless recoil spring guide rod
  b.brl(.019,.019,.44,12,.19,.168,0,0x14171a);
  b.cyl(.023,.023,.032,12,.40,.168,0,0x2a2e34,[0,0,1.5708]);
  b.cyl(.011,.011,.16,10,.30,.134,0,0x9aa2ac,[0,0,1.5708]);
  // Reciprocating machined slide (a) with bevelled top, ejection port, extractor & tritium sights
  a.box(.525,.082,.084,.095,.166,0,0x343940);
  a.box(.515,.026,.064,.095,.21,0,0x3f454d);
  a.box(.105,.042,.048,.085,.186,.022,0x121417);
  a.cyl(.017,.017,.095,10,.085,.172,.008,0xc8a23c,[0,0,1.5708]);
  a.box(.065,.012,.01,.02,.175,.043,0x181a1e);
  a.ser(7,.009,.068,.088,-.125,.018,.164,0,0x1c1f24);
  a.ser(5,.009,.058,.088,.24,.018,.164,0,0x1c1f24);
   // Tritium 3-dot combat sights with open center U-notch
   a.box(.028,.028,.014,.325,.234,0,0x1b1e22);
   a.sph(.0065,.312,.242,0,0x38ff6a,1,6);
   for(const z of[-.018,.018]){
    a.box(.038,.028,.018,-.125,.234,z,0x1b1e22);
    a.sph(.0055,-.142,.240,z,0x38ff6a,1,6);
   }
  // Removable box magazine (mg) with basepad & brass round
  mg.box(.084,.23,.064,-.104,-.02,0,0x1b1e22,[0,0,-.22]);
  mg.box(.108,.028,.086,-.138,-.144,0,0x111316,[0,0,-.22]);
  for(let i=0;i<3;i++)mg.cyl(.006,.006,.068,6,-.105-i*.008,.02-i*.04,0,0xc8a23c,[1.5708,0,0]);
  mg.cyl(.014,.014,.07,8,-.078,.095,0,0xd4af37,[0,0,1.5708]);
  return{grip:[-.1,.05,0],fore:null,gd:[-1,-.8,.35]};
 }),
 shotgun:()=>gunM((b,a,mg,c)=>{
  // Classic Side-by-Side Coach / Hunting Double-Barrel Shotgun
  for(const z of[-.022,.022]){
   b.brl(.024,.026,1.02,12,.36,.175,z,0x262a30);
   b.cyl(.027,.027,.18,12,-.06,.175,z,0x32373e,[0,0,1.5708]);
   b.cyl(.0255,.0255,.035,12,.85,.175,z,0x3a4048,[0,0,1.5708]);
  }
  // Ventilated sighting rib between twin barrels + brass beads
  b.box(.98,.014,.022,.36,.198,0,0x1d2025);
  b.vent(9,.045,.012,.026,-.02,.10,.19,0,0x111316);
  b.sph(.012,.84,.212,0,0xe6c340,1,6);
  b.sph(.008,.36,.208,0,0xd9d9d9,1,6);
  // Case-hardened break-action receiver with side lockplates & top tang lever
  b.box(.26,.135,.092,-.12,.145,0,0x3a3f47);
  b.box(.22,.095,.102,-.11,.142,0,0x4e545e);
  for(const z of[-.052,.052]){
   b.cyl(.012,.012,.01,8,-.06,.14,z,0xc8a23c,[1.5708,0,0]);
   b.cyl(.01,.01,.01,8,-.16,.15,z,0xc8a23c,[1.5708,0,0]);
  }
   b.cyl(.024,.024,.096,10,-.01,.115,0,0x2a2e34,[1.5708,0,0]);
   b.box(.09,.014,.022,-.14,.196,0,0x22262b);
   b.sph(.014,-.18,.198,.018,0x22262b,1,6);
   for(const z of[-.016,.016])b.box(.028,.016,.012,-.08,.212,z,0x22262b);
   // Twin external hammers (spaced wide so center rib sightline is clear)
   for(const z of[-.034,.034])b.box(.028,.048,.014,-.19,.205,z,0x2b3036,[0,0,-.35]);
  // Checkered walnut splinter forend (a) with steel latch
  a.box(.34,.078,.104,.22,.118,0,0x6e4726);
  a.box(.32,.045,.112,.22,.128,0,0x7d522d);
  a.chk(7,.011,.068,.116,.09,.038,.118,0,0,0x3e2714);
  a.box(.06,.02,.04,.22,.076,0,0x3a3f47);
  // Checkered walnut buttstock, pistol grip, cheekpiece & rubber recoil pad
  b.box(.14,.17,.082,-.24,.035,0,0x6e4726,[0,0,-.28]);
  b.chk(4,.012,.11,.086,-.26,.018,.025,.006,0,0x3e2714,[0,0,-.28]);
  b.box(.52,.135,.078,-.56,.065,0,0x7a502c,[0,0,-.15]);
  b.box(.26,.048,.084,-.52,.12,0,0x875a33,[0,0,-.12]);
  b.box(.045,.175,.084,-.83,-.005,0,0x1a1c1f,[0,0,-.15]);
  b.box(.015,.17,.08,-.805,-.002,0,0x9a3424,[0,0,-.15]);
  // Double triggers & bow guard
  b.box(.012,.068,.04,-.03,.055,0,0x2b3036);
  b.box(.13,.012,.04,-.09,.025,0,0x2b3036);
  b.box(.014,.045,.016,-.065,.068,0,0xc8a23c,[0,0,.2]);
  b.box(.014,.045,.016,-.10,.065,0,0xc8a23c,[0,0,.2]);
  return{grip:[-.22,.04,0],fore:[.25,.08,0],gd:[-1,-.7,.4]};
 }),
 rifle:()=>gunM((b,a,mg,c)=>{
  // Precision Bolt-Action Hunting / Marksman Rifle
  b.brl(.021,.026,1.18,12,.48,.168,0,0x22262c);
  // Fluted barrel grooves & multi-port precision muzzle brake
  for(const z of[-.022,.022])b.box(.68,.008,.008,.48,.168,z,0x14161a);
  b.cyl(.028,.026,.11,12,1.06,.168,0,0x2e333a,[0,0,1.5708]);
  b.vent(3,.016,.042,.062,1.02,.028,.168,0,0x0c0e10);
  // Machined steel receiver & recoil lug
  b.box(.36,.095,.076,-.06,.162,0,0x2b3037);
  b.box(.12,.042,.046,-.04,.178,.022,0x14171a);
  b.pic(8,-.20,.038,.214,0,.048,0x1e2227);
   // Dual heavy scope rings & hollow see-through hunting scope with 3D crosshairs (in c -> defSight)
   for(const x of[-.11,.09]){
    c.box(.036,.032,.048,x,.228,0,0x22262b);
    c.tor(.042,.008,x,.285,0,0x22262b,[0,1.5708,0],14,8);
   }
   for(let i=0;i<9;i++)c.tor(.038,.006,-.21+i*.052,.285,0,0x181b1f,[0,1.5708,0],14,6);
   for(const a2 of[.785,2.356,-2.356,-.785])c.box(.44,.007,.007,-.01,.285+Math.sin(a2)*.036,Math.cos(a2)*.036,0x1e2227);
   c.tor(.046,.007,.24,.285,0,0x1e2227,[0,1.5708,0],14,8);
   c.tor(.044,.007,-.24,.285,0,0x1e2227,[0,1.5708,0],14,8);
   // Fine 3D crosshair reticle & illuminated red center point inside scope
   c.box(.003,.072,.002,.08,.285,0,0x111316);
   c.box(.003,.002,.072,.08,.285,0,0x111316);
   c.sph(.0045,.08,.285,0,0xff2828,1,6);
   c.cyl(.016,.016,.026,10,-.01,.332,0,0x2c3138);
   c.cyl(.016,.016,.026,10,-.01,.285,.048,0x2c3138,[1.5708,0,0]);
   c.cyl(.013,.013,.008,8,-.01,.346,0,0xd4af37);
  // Full walnut stock with Monte Carlo cheek rest, rosewood forend tip & sling swivels
  b.box(.54,.086,.082,.22,.124,0,0x744927);
  b.box(.07,.082,.078,.51,.126,0,0x2d1a0e);
  b.chk(6,.011,.065,.086,.12,.038,.122,0,0,0x3f2714);
  b.box(.14,.19,.078,-.23,.015,0,0x684122,[0,0,-.30]);
  b.chk(4,.011,.12,.082,-.24,.018,.01,0,0,0x3f2714,[0,0,-.30]);
  b.box(.58,.125,.078,-.58,.075,0,0x744927,[0,0,-.11]);
  b.box(.26,.042,.086,-.52,.132,0,0x5e3b1f,[0,0,-.06]);
  b.box(.045,.17,.084,-.88,.048,0,0x1a1c1f,[0,0,-.11]);
  // Folded bipod legs under forend
  b.box(.04,.035,.05,.44,.072,0,0x22262b);
  for(const z of[-.035,.035]){
   b.cyl(.009,.009,.22,8,.34,.055,z,0x2a2e34,[0,0,1.5708]);
   b.cyl(.014,.014,.025,8,.22,.055,z,0x16181b,[0,0,1.5708]);
  }
  // Detachable flush box magazine & trigger guard
  mg.box(.125,.095,.058,-.03,.065,0,0x1c1f24);
  mg.box(.135,.018,.064,-.03,.018,0,0x2c3138);
  b.box(.012,.068,.038,-.09,.055,0,0x22262b);
  b.box(.11,.012,.038,-.14,.025,0,0x22262b);
  b.box(.014,.045,.016,-.13,.065,0,0xc8a23c,[0,0,.18]);
  // Rotating fluted bolt body & swept tactical bolt knob (a)
  a.cyl(.019,.019,.22,10,-.06,0,0,0xb8bfc8,[0,0,1.5708]);
  a.cyl(.011,.011,.095,8,-.12,-.01,.05,0x9aa2ac,[1.35,0,.2]);
  a.sph(.026,-.135,-.03,.098,0x1e2227,1,8);
  return{act:[0,.162,0],grip:[-.24,.04,0],fore:[.25,.1,0],gd:[-1,-.7,.4]};
 }),
 smg:()=>gunM((b,a,mg,c)=>{
  // Custom Tactical SMG: stamped steel upper/lower receiver, vented barrel shroud, integral suppressor & folding wire stock
  b.box(.46,.125,.094,-.01,.142,0,0x2b3037);
  b.box(.44,.032,.078,-.01,.212,0,0x353b44);
  for(let i=0;i<5;i++)b.box(.05,.022,.098,-.16+i*.07,.142,0,0x22262c);
  b.pic(7,-.16,.042,.232,0,.048,0x1c1f24);
  // Ejection port & shell deflector
  b.box(.095,.038,.012,.04,.162,-.048,0x121417);
  b.box(.022,.045,.024,-.015,.162,-.052,0x3a4048);
  // Vented barrel shroud + threaded heavy suppressor with cooling rings
  b.cyl(.042,.042,.32,12,.34,.142,0,0x22262b,[0,0,1.5708]);
  for(let i=0;i<4;i++){
   b.box(.038,.026,.092,.23+i*.068,.142,0,0x0c0e10);
   b.box(.092,.038,.026,.23+i*.068,.16,0,0x0c0e10);
  }
  b.brl(.052,.052,.28,14,.62,.142,0,0x171a1e);
  for(let i=0;i<3;i++)b.cyl(.055,.055,.018,14,.52+i*.08,.142,0,0x2a2f36,[0,0,1.5708]);
  // Non-reciprocating forward charging handle (a)
  a.box(.11,.028,.022,.16,.195,.048,0x555b64);
  a.cyl(.016,.016,.065,8,.20,.195,.075,0x9aa2ac,[1.5708,0,0]);
  a.cyl(.019,.019,.02,8,.20,.195,.105,0x22262b,[1.5708,0,0]);
  // Flared magwell & curved/ribbed 30-round stick magazine (mg)
  b.box(.088,.085,.092,.065,.062,0,0x22262b,[0,0,.10]);
  mg.box(.068,.35,.078,.052,-.085,0,0x1a1d21,[0,0,.14]);
  for(let i=0;i<6;i++)mg.box(.074,.014,.084,.062-i*.008,.04-i*.052,0,0x2e333a,[0,0,.14]);
  mg.box(.078,.026,.088,.024,-.255,0,0x111316,[0,0,.14]);
  // Ergonomic pistol grip with finger grooves + vertical foregrip
  b.box(.105,.235,.078,-.135,-.005,0,0x1e2227,[0,0,-.20]);
  b.chk(5,.095,.014,.082,-.125,-.006,.055,-.03,0,0x14171a,[0,0,-.20]);
  b.box(.062,.045,.068,.30,.085,0,0x22262b);
  b.cyl(.026,.024,.155,10,.30,.005,0,0x1b1e22);
  for(let i=0;i<3;i++)b.tor(.026,.004,.30,.03-i*.035,0,0x111316,[1.5708,0,0],10,6);
  // Collapsible dual-rail wire stock & rubber buttpad
  for(const z of[-.038,.038])b.cyl(.009,.009,.34,8,-.35,.138,z,0x78808a,[0,0,1.5708]);
  b.box(.04,.065,.098,-.21,.138,0,0x22262b);
  b.box(.028,.135,.084,-.52,.115,0,0x181b1f);
   // Reflex red-dot sight (in c -> defSight) & front hooded post aligned at y = 0.272
   c.box(.085,.018,.056,-.01,.240,0,0x181b1f);
   c.box(.065,.048,.01,-.01,.272,-.025,0x282d34);
   c.box(.065,.048,.01,-.01,.272,.025,0x282d34);
   c.box(.065,.01,.058,-.01,.296,0,0x282d34);
   c.sph(.006,-.01,.272,0,0xff2a2a,1,6);
   b.tor(.024,.0045,.21,.272,0,0x282d34,[0,1.5708,0],10,6);
   b.box(.008,.024,.008,.21,.266,0,0xd9d9d9);
  // Trigger guard & trigger
  b.box(.012,.06,.038,-.02,.06,0,0x22262b);
  b.box(.095,.012,.038,-.065,.032,0,0x22262b);
  b.box(.014,.045,.016,-.045,.072,0,0x9aa2ac,[0,0,.2]);
  return{grip:[-.14,.06,0],fore:[.3,.04,0],gd:[-1,-.7,.4]};
 }),
 ammo:()=>buildAmmoBox(0x4f5e36,0xd9b32a,0xb87333,0xd9b32a),
 helmet:()=>armHelmet(AMC),vest:()=>armVest(AMC),
 legs:()=>{const b=new MB();for(const s of[-1,1]){b.box(.2,.22,.2,s*.14,.4,0,AMC);b.box(.19,.26,.19,s*.14,.05,.02,AMC);b.sph(.11,s*.14,.2,.1,shade(AMC,1.15),.7,7);b.box(.21,.035,.21,s*.14,.26,0,0x222222)}return b.build()},
 hatchet:()=>{const b=new MB();b.cyl(.026,.032,.62,8,0,0,0,0x6b4728);b.cyl(.028,.033,.18,8,0,-.21,0,0x2a1d12);b.tor(.031,.005,0,-.12,0,0x1a120b,[1.5708,0,0],8,6);b.box(.048,.14,.12,0,.24,.02,0x4a4f57);b.box(.032,.18,.11,0,.24,.11,0x8a929a);b.box(.012,.21,.045,0,.24,.175,0xd4dce4);b.box(.044,.07,.06,0,.24,-.065,0x3a3f46);return b.build()},
 knife:()=>{const b=new MB();b.cyl(.024,.027,.22,8,0,-.09,0,0x2b2016);for(let i=0;i<4;i++)b.tor(.026,.004,0,-.15+i*.038,0,0x18120c,[1.5708,0,0],8,6);b.sph(.029,0,-.21,0,0x4a4f57,.7,7);b.box(.035,.024,.11,0,.03,0,0x555b64);b.box(.022,.29,.058,0,.185,.006,0xb8c0c8);b.box(.008,.29,.025,0,.185,.038,0xe6edf5);b.cone(.028,.08,6,0,.36,.012,0xd8e0e8);for(let i=0;i<5;i++)b.box(.024,.012,.018,0,.08+i*.028,-.024,0x6a7078);return b.build()},
 machete:()=>{const b=new MB();b.cyl(.026,.03,.24,8,0,-.13,0,0x3d2816);for(const y of[-.18,-.12,-.06])b.cyl(.007,.007,.062,6,0,y,0,0xc8a23c,[0,0,1.5708]);b.box(.04,.04,.08,0,-.24,-.015,0x3d2816);b.box(.035,.025,.095,0,-.005,0,0x4a4f57);b.box(.018,.62,.092,0,.32,.01,0xaeb6be);b.box(.007,.62,.032,0,.32,.058,0xe2eaf2);b.box(.018,.12,.068,0,.67,-.005,0xc4ccd4,[.25,0,0]);for(let i=0;i<6;i++)b.box(.02,.018,.022,0,.12+i*.065,-.038,0x5a6068);return b.build()},
 spear:()=>{const b=new MB();b.cyl(.024,.026,1.52,8,0,.28,0,0x6e4a28);for(let i=0;i<5;i++)b.tor(.027,.005,0,.92+i*.022,0,0x3b2614,[1.5708,0,0],8,6);b.cyl(.028,.025,.12,8,0,1.02,0,0x454a52);b.box(.022,.28,.075,0,1.20,0,0xb8c0c8);b.box(.01,.28,.095,0,1.20,0,0xdce4ec);b.cone(.038,.12,6,0,1.38,0,0xe6eef6);return b.build()},
 club:()=>{const b=new MB();b.cyl(.028,.032,.36,8,0,-.06,0,0x4a321e);b.cyl(.068,.036,.44,9,0,.32,0,0x7a5430);for(let i=0;i<3;i++)b.cyl(.066,.066,.024,9,0,.22+i*.11,0,0x2a2e34);for(let i=0;i<6;i++){const a=i*1.047;b.cone(.018,.07,6,Math.cos(a)*.075,.38+(i%2)*.07,Math.sin(a)*.075,0x9aa2ac,[Math.sin(a)*1.4,0,-Math.cos(a)*1.4])}return b.build()},
 hammer:()=>{const b=new MB();b.cyl(.026,.03,.56,8,0,0,0,0x6b4728);b.cyl(.028,.032,.18,8,0,-.19,0,0x24282e);b.box(.07,.09,.12,0,.28,0,0x4a4f57);b.cyl(.045,.042,.08,10,0,.28,.09,0x7a828c,[1.5708,0,0]);b.box(.05,.035,.10,0,.26,-.09,0x7a828c,[.35,0,0]);return b.build()},
 pickaxe:()=>{const b=new MB();b.cyl(.028,.032,.72,8,0,0,0,0x6b4728);b.box(.065,.085,.09,0,.31,0,0x454a52);b.box(.042,.045,.26,0,.30,.15,0x7a828c,[.18,0,0]);b.cone(.026,.12,6,0,.27,.31,0xb8c0c8,[1.75,0,0]);b.box(.048,.045,.22,0,.30,-.13,0x7a828c,[-.16,0,0]);b.box(.058,.06,.04,0,.28,-.24,0xb8c0c8);return b.build()}
};
// ----- tiered tool models: stone (1), metal (2), powered (3) -----
ITM.hatchet=()=>{const b=new MB();
 b.cyl(.026,.032,.62,8,0,0,0,0x7a5230);b.cyl(.029,.034,.2,8,0,-.2,0,0x3a2a1c);b.sph(.034,0,-.31,0,0x2e2217,.8,7);
 b.box(.05,.13,.1,0,.255,.0,0x6a4a30);
 b.box(.038,.19,.13,0,.26,.085,0x8a8d90,[0,0,.06]);b.box(.03,.15,.07,0,.25,.16,0x9fa3a7,[0,0,-.08]);b.box(.012,.2,.03,0,.255,.2,0xc7cacd,[0,0,.04]);
 b.box(.03,.07,.05,.012,.34,.1,0x777b7e,[.2,0,.3]);b.box(.03,.06,.05,-.012,.19,.1,0x74777a,[-.2,0,-.3]);
 for(let i=0;i<4;i++)b.tor(.034,.006,0,.2+i*.032,0,0xc2a46a,[1.5708,0,0],8,6);
 return b.build()};
ITM.metal_hatchet=()=>{const b=new MB();
 b.cyl(.026,.032,.64,8,0,0,0,0x4a3220);b.cyl(.031,.035,.24,8,0,-.2,0,0x1b1c1f);for(let i=0;i<4;i++)b.tor(.033,.004,0,-.12-i*.045,0,0x3a3b40,[1.5708,0,0],8,6);b.sph(.036,0,-.33,0,0x26272b,.8,7);
 b.box(.062,.11,.09,0,.25,-.005,0x2d3036);b.box(.058,.04,.095,0,.31,-.005,0x3a3e45);
 b.box(.032,.21,.17,0,.26,.105,0x8d96a0);b.box(.036,.12,.1,0,.26,.04,0x6c747d);b.box(.012,.26,.05,0,.26,.205,0xe3eaf0);
 b.box(.05,.1,.075,0,.26,-.085,0x3f444b);for(const y of[.225,.295])b.cyl(.01,.01,.07,6,0,y,.0,0xc2cad2,[0,0,1.5708]);
 b.box(.006,.18,.03,.019,.26,.15,0xc9d1d9);
 return b.build()};
ITM.pickaxe=()=>{const b=new MB();
 b.cyl(.028,.032,.72,8,0,0,0,0x7a5230);b.cyl(.031,.035,.2,8,0,-.26,0,0x3a2a1c);b.sph(.036,0,-.36,0,0x2e2217,.8,7);
 b.box(.062,.075,.09,0,.31,0,0x5b4430);
 b.box(.045,.05,.24,0,.31,.02,0x8a8d90,[.1,0,0]);b.cone(.03,.14,5,0,.305,.23,0xaeb2b6,[1.65,0,0]);
 b.box(.04,.045,.2,0,.31,-.11,0x80838a,[-.12,0,0]);b.cone(.027,.11,5,0,.3,-.25,0x9a9da2,[-1.65,0,0]);
 for(let i=0;i<4;i++)b.tor(.037,.006,0,.27+i*.028,0,0xc2a46a,[1.5708,0,0],8,6);
 return b.build()};
ITM.metal_pickaxe=()=>{const b=new MB();
 b.cyl(.028,.032,.74,8,0,0,0,0x4a3220);b.cyl(.031,.035,.24,8,0,-.26,0,0x1b1c1f);for(let i=0;i<4;i++)b.tor(.034,.004,0,-.14-i*.045,0,0x3a3b40,[1.5708,0,0],8,6);b.sph(.036,0,-.37,0,0x26272b,.8,7);
 b.box(.07,.1,.1,0,.32,0,0x2d3036);b.box(.062,.03,.11,0,.375,0,0x3a3e45);
 b.box(.05,.052,.3,0,.32,.12,0x8d96a0,[.2,0,0]);b.cone(.03,.15,6,0,.29,.31,0xe3eaf0,[1.8,0,0]);
 b.box(.05,.052,.26,0,.32,-.11,0x8d96a0,[-.2,0,0]);b.cone(.03,.14,6,0,.29,-.29,0xe3eaf0,[-1.8,0,0]);
 for(const z of[-.04,.04])b.cyl(.01,.01,.075,6,0,.32,z,0xc2cad2,[0,0,1.5708]);
 return b.build()};
ITM.chainsaw=()=>{const b=new MB();
 b.box(.15,.17,.30,0,.02,.13,0xf0651a);b.box(.155,.045,.31,0,-.075,.13,0x23262a);b.box(.11,.05,.16,0,.125,.11,0x2b2e33);b.box(.16,.022,.12,0,.108,.12,0xd9dde2);
 for(const x of[-.087,.087])b.cyl(.065,.065,.03,12,x,.03,.08,0x2c2e33,[0,0,1.5708]);
 b.box(.06,.05,.1,.1,-.04,.18,0x6d727a);
 b.box(.045,.05,.19,0,.205,-.02,0x1c1d20);b.box(.045,.15,.045,0,.13,-.1,0x1c1d20);b.box(.045,.12,.045,0,.15,.07,0x1c1d20);
 b.box(.15,.09,.02,0,.12,.30,0x1c1d20,[.3,0,0]);b.box(.04,.04,.14,0,.18,.22,0x1c1d20);b.box(.04,.12,.04,0,.14,.29,0x1c1d20);
 b.box(.03,.115,.52,0,.01,.60,0xaab2ba);b.cyl(.0575,.0575,.03,12,0,.01,.86,0xaab2ba,[0,0,1.5708]);
 b.box(.036,.026,.52,0,.074,.60,0x2a2c30);b.box(.036,.026,.52,0,-.054,.60,0x2a2c30);b.cyl(.0645,.0645,.036,12,0,.01,.86,0x2a2c30,[0,0,1.5708]);b.cyl(.052,.052,.04,12,0,.01,.865,0xaab2ba,[0,0,1.5708]);
 const m=b.build(),tb=new MB();
 for(let i=0;i<10;i++){tb.box(.044,.02,.022,0,.092,.34+i*.05,0x15161a);tb.box(.044,.02,.022,0,-.072,.34+i*.05,0x15161a)}
 const chain=tb.build();m.add(chain);m.userData.chain=chain;return m};
ITM.jackhammer=()=>{const b=new MB();
 b.box(.34,.04,.045,0,.0,-.02,0x1d1e21);for(const x of[-.18,.18])b.cyl(.03,.03,.1,8,x,0,-.02,0x0e0f10,[0,0,1.5708]);
 b.box(.07,.1,.08,0,.05,.02,0x2a2c30);
 b.cyl(.07,.07,.30,12,0,0,.2,0xf2b705,[1.5708,0,0]);for(const z of[.1,.2,.3])b.tor(.074,.012,0,0,z,0x2b2d31,null,8,14);
 b.cyl(.025,.025,.1,8,0,.095,.04,0x2b2d31);b.tor(.05,.014,0,.16,-.01,0x15161a,[0,1.5708,0],8,12);
 b.cyl(.052,.056,.12,10,0,0,.41,0x6b7078,[1.5708,0,0]);b.cyl(.04,.04,.05,10,0,0,.5,0x444a50,[1.5708,0,0]);
 const m=b.build(),bt=new MB();
 bt.cyl(.018,.018,.40,8,0,0,.72,0xbfc6cd,[1.5708,0,0]);bt.cone(.02,.09,6,0,0,.97,0xe1e6ea,[1.5708,0,0]);
 const bit=bt.build();m.add(bit);m.userData.bit=bit;return m};
for(const id of['hatchet','pickaxe','metal_hatchet','metal_pickaxe','chainsaw','jackhammer','knife','machete','spear','club']){const f=ITM[id];ITM[id]=()=>{const m=f();m.userData.grip=[0,.18,0];m.userData.gd=[.25,-1,.6];return m}}
ITM.rock=()=>{const b=new MB();
 // Ergonomic granite palm body + knapped dark flint striking edge + quartz mineral veins
 b.sph(.095,0,-.01,.015,0x7d8288,.82,8);
 b.sph(.082,-.025,.018,-.025,0x686d74,.85,7);
 b.sph(.076,.032,.012,-.018,0x8e949c,.78,7);
 // Knapped wedge striking face pointing forward (-Z) and slightly down
 b.cone(.078,.11,6,0,.015,-.085,0x4e535a,[-1.42,.12,0]);
 b.cone(.062,.095,6,.018,-.018,-.078,0x5c6168,[-1.32,-.18,.2]);
 // Chipped flake facets & pale quartz flecks
 b.box(.065,.028,.055,-.015,.052,-.02,0x9aa0a8,[.25,.4,-.15]);
 b.box(.052,.024,.048,.028,-.042,-.035,0x585d64,[-.2,.3,.25]);
 b.box(.048,.014,.032,.012,.038,-.058,0xd6dce4,[.4,-.2,.3]);
 b.box(.038,.012,.026,-.028,.015,-.062,0xcbd2da,[-.3,.5,-.2]);
 const m=b.build();m.userData.grip=[0,0,0];m.userData.gd=[.25,-1,.6];return m};
function itemModel(id){if(ITM[id]) return ITM[id]();{const it=ITEMS[id];if(it&&(it.bd||it.dv)){const m=mk(it,null);m.scale.setScalar(.3);return m}}const b=new MB();b.box(.2,.2,.2,0,0,0,0x777777);const m=b.build();m.userData.gd=[.2,-.3,-.5];return m;}

function mergeStatic(g){const by=new Map();
 for(const m of[...g.children]){if(!m.isMesh)continue;m.updateMatrix();const gm=m.geometry.clone().applyMatrix4(m.matrix),key=m.material.color.getHex();let a=by.get(key);if(!a)by.set(key,a={mat:m.material,p:[],n:[],i:[],o:0});
  const pos=gm.attributes.position.array,nor=gm.attributes.normal.array,idx=gm.index?gm.index.array:null;for(let i=0;i<pos.length;i++){a.p.push(pos[i]);a.n.push(nor[i])}
  if(idx)for(let i=0;i<idx.length;i++)a.i.push(idx[i]+a.o);else for(let i=0;i<pos.length/3;i++)a.i.push(i+a.o);a.o+=pos.length/3;g.remove(m);m.geometry.dispose();gm.dispose()}
 for(const a of by.values()){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(a.p,3));geo.setAttribute('normal',new T.Float32BufferAttribute(a.n,3));geo.setIndex(a.i);const mesh=new T.Mesh(geo,a.mat);mesh.matrixAutoUpdate=false;g.add(mesh)}}
const SKINS=[0xf3d2b3,0xe0b894,0xc68e5f,0x9a6a43,0x6a4228,0x4a2f1c],HAIRC=[0x1c1410,0x3a2616,0x5a3a1c,0x8a5a2b,0xb0803a,0xa8a8a8,0xc23b22];
function mkMan(c,raider,V){V=V||{};const pk=a=>a[rnd()*a.length|0],val=(k,f)=>V[k]!==undefined?V[k]:f(),
 sk=val('skin',()=>pk(SKINS)),hair=val('hair',()=>pk(HAIRC)),hs=val('hs',()=>rnd()*6|0),bd=val('beard',()=>rnd()*4|0),ot=val('outfit',()=>rnd()*4|0),hat=val('hat',()=>rnd()*4|0),face=val('face',()=>rnd()*3|0),
 acc=val('acc',()=>rnd()*4|0),glv=val('gloves',()=>rnd()<.5),heavy=!!V.heavy,
 pants=raider?pk([0x2e2a2c,0x3a3226,0x2a3028]):(ot===1?0x3a5a8a:pk([0x34455a,0x3a3a3e,0x4a4030,0x2f3f35])),boot=raider?0x241a14:pk([0x2a1f18,0x3a2c20,0x4a3a28]),
 g=new T.Group(),u=g.userData,piv=(m,x,y,z)=>{const q=new T.Group();q.position.set(x,y,z);if(m)q.add(m);g.add(q);return q},
 c2=shade(c,1.25),c3=shade(c,.7),skd=shade(sk,.82),glvCol=raider?0x2b2320:(glv?0x6b4a2a:skd),mt=[0x6b6f75,0x7a5a3a,0x55595e,0x8a4a28];
 const t=new MB();
 // Trapezius shoulder bridge & high collar ring on all humanoids so neck/head never float
 if(raider){
  t.box(.54,.64,.3,0,1.1,0,c);t.box(.58,.10,.28,0,1.38,0,shade(c,.9));
  t.cyl(.135,.165,.12,8,0,1.43,0,0x2a2020);
  t.box(.5,.22,.28,0,.72,0,c);t.box(.5,.5,.04,0,1.06,.17,0x403733);t.box(.46,.12,.36,0,.52,0,0x3a3030);
  for(let i=0;i<5;i++)t.box(.07,.22,.02,-.2+i*.1,.55,.17,i%2?0x3a3030:0x4a3a3a,[0,0,(i-2)*.08]);
  t.box(.1,.8,.04,0,1.08,.17,0x24201f,[0,0,.7]);for(let i=0;i<5;i++)t.cyl(.02,.02,.07,5,-.19+i*.095,1.31-i*.115,.2,0xc9a437);
  t.box(.52,.06,.31,0,.8,0,0x2a2020);t.box(.1,.07,.04,0,.8,.16,0x9a9ea4);
  if(V.cape!==false&&rnd()<.5){t.box(.5,.7,.03,0,1.0,-.19,0x3a2a2a);for(let i=0;i<4;i++)t.box(.1,.16,.02,-.18+i*.12,.6,-.19,0x3a2a2a,[0,0,(i-1.5)*.1])}
  for(let i=0;i<3;i++)t.box(.1,.025,.01,-.1+i*.04,1.22,.2,[0xb23a2a,0xeeeeee][i%2],[0,0,.3*(i-1)]);
 }else{
  const body=ot===1?c2:c;t.box(.54,.64,.3,0,1.1,0,body);t.box(.56,.09,.27,0,1.38,0,body);t.box(.5,.22,.28,0,.72,0,body);
  t.cyl(.125,.155,.10,8,0,1.43,0,c3);
  if(ot===0){t.box(.02,.62,.01,0,1.1,.155,0xd0d0d0);t.box(.34,.09,.26,0,1.42,0,c3);for(const s of[-1,1]){t.box(.12,.1,.02,s*.15,1.0,.16,c3);t.box(.12,.03,.025,s*.15,1.06,.165,shade(c3,.8))}t.box(.54,.05,.31,0,.64,0,c3);t.box(.04,.04,.02,.15,1.04,.172,0xc9a437)}
  else if(ot===1){t.box(.4,.36,.04,0,.93,.17,0x3a5a8a);for(const s of[-1,1]){t.box(.07,.5,.04,s*.14,1.25,.16,0x3a5a8a);t.sph(.02,s*.14,1.1,.19,0xc9a437,1,4)}t.box(.14,.1,.02,0,.88,.2,shade(0x3a5a8a,.8));t.box(.34,.08,.26,0,1.42,0,c3)}
  else if(ot===2){for(let i=0;i<6;i++){t.box(.545,.015,.305,0,.8+i*.1,0,c3);t.box(.015,.64,.305,-.25+i*.1,1.1,0,c3)}for(let i=0;i<4;i++)t.sph(.015,0,.85+i*.13,.16,0xeeeeee,1,4);t.box(.34,.09,.26,0,1.42,0,c2)}
  else{t.sph(.15,0,1.44,-.12,c,.8,6);for(const s of[-1,1])t.cyl(.008,.008,.14,4,s*.05,1.3,.15,0xeeeeee);t.box(.34,.14,.03,0,.82,.16,c3);t.box(.34,.09,.26,0,1.42,0,c3)}
  t.box(.52,.07,.31,0,.8,0,0x3a2a1a);t.box(.1,.07,.04,0,.8,.16,0xc9b037);
  const bp=rnd();t.box(.38,.46,.18,0,1.13,-.25,bp<.5?0x6b4a2a:0x4a5a3a);t.box(.3,.2,.06,0,1.0,-.35,shade(bp<.5?0x6b4a2a:0x4a5a3a,.8));if(bp<.5)t.cyl(.08,.08,.44,7,0,1.5,-.25,0x8a2b2b,[0,0,1.5708]);else t.cyl(.07,.07,.1,7,.18,.95,-.35,0xc9c2b0);
  for(const s of[-1,1]){t.box(.06,.5,.04,s*.17,1.15,.12,0x3a2a1a);t.box(.12,.1,.08,s*.2,.78,.17,0x6b4a2a)}t.box(.08,.2,.04,.1,1.2,.16,0xd9a520);
  if(acc===1){t.tor(.14,.035,0,1.44,0,pk([0xb23a2a,0x3a6aa5,0xd9a520]),[0,0,0],9,4)}
  if(acc===2){t.box(.14,.08,.12,-.2,.7,.2,0x55595e);t.cyl(.015,.015,.22,5,-.2,.78,.2,0x7a5230,[0,0,.4])}
  if(acc===3){t.box(.12,.12,.02,.3,1.28,.17,0xb23a2a);t.box(.07,.07,.01,.3,1.28,.18,0xeeeeee)}
 }
 // Head + solid neck cylinder extending down into collar (head pivot at y=1.43)
 const h=new MB();
 h.cyl(.082,.098,.18,8,0,.04,-.01,skd);
 if(raider)h.cyl(.096,.112,.14,8,0,.02,-.005,0x261f1f);
 h.sph(.172,0,.18,0,sk,1.05,8);
 h.box(.19,.11,.17,0,.10,.03,sk);
 h.box(.048,.06,.05,0,.165,.17,sk);h.sph(.035,-.17,.165,0,sk,1,4);h.sph(.035,.17,.165,0,sk,1,4);
 for(const s of[-1,1]){h.box(.05,.04,.015,s*.07,.205,.165,0xf5f5f5);h.box(.022,.03,.01,s*.07,.205,.175,pk([0x2a1a10,0x1a3a5a,0x2a4a2a]));h.box(.07,.012,.01,s*.07,.24,.168,hair)}
 h.box(.08,.012,.01,0,.095,.168,shade(sk,.55));
 if(!raider||face===0){
  if(raider){
   h.sph(.192,0,.19,0,0x2a2024,1.02,8);
   h.cyl(.135,.145,.13,8,0,.07,.01,0x241c1e);
   h.box(.2,.05,.02,0,.205,.18,sk);
   for(const s of[-1,1])h.cyl(.06,.06,.04,8,s*.07,.205,.19,0xb23a2a,[1.5708,0,0]);
   h.box(.39,.03,.03,0,.205,0,0x3a3030);
  }
 }
 if(!raider){
  if(hs===0)h.sph(.18,0,.24,-.01,hair,.75,6);
  else if(hs===1){h.sph(.18,0,.24,-.01,hair,.75,6);h.box(.3,.38,.1,0,.08,-.14,hair);for(const s of[-1,1])h.box(.04,.2,.1,s*.16,.12,.0,hair)}
  else if(hs===2){h.sph(.18,0,.24,-.01,hair,.75,6);h.sph(.07,0,.2,-.2,hair,1,5);h.cyl(.03,.045,.3,5,0,.06,-.22,hair,[.3,0,0])}
  else if(hs===3){for(let i=0;i<5;i++)h.box(.05,.14+(i%2)*.04,.06,0,.35+(i%2)*.02,-.1+i*.06,hair)}
  else if(hs===5){for(let i=0;i<8;i++){const a=i/8*6.28;h.sph(.07,Math.cos(a)*.12,.29,Math.sin(a)*.12,hair,1,4)}h.sph(.1,0,.33,0,hair,1,5)}
  if(bd===1)h.box(.2,.07,.06,0,.07,.15,skd);else if(bd===2){h.box(.22,.14,.1,0,.05,.12,hair);h.sph(.09,0,0,.12,hair,1,5);h.box(.2,.03,.04,0,.11,.17,hair)}else if(bd===3)h.box(.1,.025,.03,0,.11,.175,hair);
  if(hat===1){const hc=pk([0xf2c230,0xe8742a,0xeeeeee]);h.sph(.19,0,.29,0,hc,.72,7);h.cyl(.23,.23,.03,10,0,.21,.04,hc);h.box(.1,.06,.06,0,.33,.18,0xdddddd);h.box(.03,.12,.2,0,.37,0,shade(hc,.85))}
  else if(hat===2){const hc=pk([0xb23a2a,0x3a6aa5,0x4a4a4e,0x3a7a3a]);h.sph(.19,0,.29,0,hc,.9,7);h.tor(.175,.03,0,.21,0,shade(hc,.8),[0,0,0],9,4);h.sph(.045,0,.49,0,shade(hc,1.3),1,5)}
  else if(hat===3){const hc=pk([0x3a4a5a,0x6a5a3a,0x4a4a4e]);h.sph(.19,0,.27,0,hc,.7,7);h.box(.22,.025,.16,0,.22,.2,shade(hc,.8))}
  if(acc===0&&hat!==1){h.box(.36,.05,.3,0,.26,0,0x2a2d31);for(const s of[-1,1])h.cyl(.05,.05,.04,8,s*.08,.26,.17,0x7ab8c8,[1.5708,0,0])}
 }else{
  if(face===1){
   // Ballistic Skull Mask over dark balaclava hood & jaw
   h.sph(.188,0,.185,-.01,0x241f1f,1.02,8);
   h.cyl(.13,.14,.13,8,0,.06,0,0x241f1f);
   h.sph(.178,0,.185,.02,0xe8e4d8,1.0,8);
   h.box(.18,.11,.12,0,.08,.11,0xdcd8cc);
   for(const s of[-1,1])h.sph(.05,s*.07,.205,.16,0x15110f,.9,5);
   h.box(.048,.04,.03,0,.135,.18,0x15110f);
   for(let i=0;i<5;i++)h.box(.018,.055,.025,-.06+i*.03,.06,.172,0x15110f);
   h.box(.39,.03,.03,0,.205,0,0x3a3030);
  }else if(face===2){
   // Tactical Gas Mask & Respirator Hood connected to collar
   h.sph(.188,0,.185,0,0x3a3d30,1.02,8);
   h.cyl(.135,.145,.13,8,0,.06,0,0x2e3126);
   h.cyl(.07,.10,.14,8,0,.08,.18,0x3a3d30,[1.5708,0,0]);
   for(const s of[-1,1]){
    h.cyl(.06,.06,.03,8,s*.075,.205,.185,0x9ad0e0,[1.5708,0,0]);
    h.cyl(.048,.048,.085,7,s*.10,.06,.195,0x55595e,[1.5708,0,0]);
   }
   h.box(.39,.03,.03,0,.205,0,0x24201f);
  }
  if(rnd()<.5)h.cone(.05,.18,4,0,.40,0,0x6b6f75);
  else for(let i=0;i<5;i++)h.cone(.03,.14,4,0,.36,-.08+i*.04,[0xb23a2a,0xc9a437][i%2]);
 }
 const head=piv(h.build(),0,1.43,0);
 // Anatomically aligned arms: continuous cylindrical sleeve -> bare skin wrist -> leather palm strap -> rounded fist & fingers
 const sl=raider?c:(ot===1?c2:c),pCol=pk(mt),spikedP=rnd()<.5,armPads=[];
 const arm=s=>{
  const a=new MB();
  // Rounded deltoid shoulder ball at (0,0,0) + collinear upper arm -> elbow -> forearm
  a.sph(.084,0,.01,0,sl,1.05,8);
  a.cyl(.068,.060,.26,10,0,-.13,0,sl);
  a.sph(.058,0,-.26,0,sl,1,8);
  a.cyl(.058,.050,.22,10,0,-.37,0,sl);
  if(!raider&&ot===0)a.box(.14,.07,.12,0,-.24,-.02,c3);
  if(!raider&&ot===3)a.cyl(.054,.052,.05,10,0,-.46,0,c3);
  if(!raider&&ot===2){a.cyl(.066,.066,.016,10,0,-.18,0,c3);a.cyl(.056,.056,.016,10,0,-.38,0,c3)}
  if(raider){
   // Raider shoulder pauldron seated over the deltoid socket on torso + upper-arm band & forearm wraps on the arm
   if(spikedP){
    t.box(.17,.09,.19,s*.29,1.39,0,pCol,[0,0,s*-.18]);
    t.cone(.038,.12,4,s*.32,1.47,0,0x9a9ea4,[0,0,s*-.15]);
   }else{
    t.box(.18,.10,.20,s*.29,1.39,0,pCol,[0,0,s*-.16]);
   }
   a.cyl(.062,.059,.036,10,0,-.33,0,0xd8d2c2);
   a.cyl(.057,.054,.036,10,0,-.41,0,0xd8d2c2);
   a.cyl(.053,.051,.028,10,0,-.465,0,0x8a3224);
   a.cyl(.070,.068,.075,10,0,-.15,0,0xb23a2a);
  }
  // Visible skin wrist + cylindrical/rounded fist & tan leather half-glove so the hand is 100% collinear with the forearm from every angle!
  a.cyl(.047,.045,.045,10,0,-.495,0,sk);
  a.cyl(.049,.048,.042,10,0,-.530,0,0x6e4c2e);
  a.cyl(.046,.042,.045,10,0,-.568,0,sk);
  a.sph(.044,0,-.582,0,sk,.85,8);
  a.sph(.022,-s*.036,-.545,.022,sk,1.1,6);
  const grp=piv(a.build(),s*.285,1.35,0);
  // Heavy armor upper-arm bracer on arm + shoulder pauldron on vest
  const pb=new MB();
  pb.cyl(.076,.068,.22,10,0,-.12,0,raider?0x55595e:AMC);
  const pm=pb.build();grp.add(pm);armPads.push(pm);
  return grp;
 },
 armL=arm(-1),armR=arm(1);
 const torso=t.build();g.add(torso);
 const leg=s=>{const l=new MB();l.box(.17,.38,.17,0,-.19,0,pants);l.box(.15,.34,.15,0,-.55,0,pants);l.box(.18,.12,.28,0,-.76,.04,boot);l.box(.19,.02,.19,0,-.7,.02,shade(boot,1.4));if(raider)l.box(.19,.12,.19,0,-.37,.02,0x555555);else if(ot===3||ot===2)l.box(.16,.1,.02,0,-.3,.09,shade(pants,1.2));return piv(l.build(),s*.14,.8,0)},
 legL=leg(-1),legR=leg(1);
 // Held weapon/tool with grip centered at (0,0,0), barrel/blade along +Y, and magazine/grip along +Z (downward in world when aimed)
 const isGunTool=!!(raider&&((V.gun&&V.kit!=='rocket')||V.kit==='rocket'));
 let tool;if(raider){const m=new MB(),kk=V.kit||'';
  if(V.gun&&kk!=='rocket'){
   const L=(RGUN[V.gun]||RGUN.pistol).len;
   m.box(.044,.14,.075,0,0,.035,0x3a2818,[-.22,0,0]);
   m.box(.066,.26,.092,0,.10,-.01,V.warlord?0x2b1d1d:0x3a3d42);
   m.cyl(.022,.025,L,8,0,.18+L/2,-.025,0x22262b);
   if(L>.5)m.box(.058,.24,.082,0,-.14,.01,0x6b4a2a);
   if(V.gun==='ak'||V.gun==='smg'||V.gun==='thompson'||V.gun==='sar')m.box(.044,.12,.14,0,.18,.075,0x24282d,[-.22,0,0]);
   if(V.gun==='ak'||V.gun==='thompson'||V.gun==='pump')m.box(.064,.22,.075,0,.32,-.01,0x6b4a2a);
   if(V.warlord)m.box(.072,.08,.098,0,.12,-.01,0xd4af37);
  }else if(kk==='rocket'){
   m.box(.048,.14,.075,0,0,.04,0x4a3420);
   m.cyl(.07,.08,.76,8,0,.20,-.01,0x2a2d31);
   m.box(.14,.10,.10,0,.04,0,0x6b4a2a);
   m.cone(.075,.16,8,0,.64,-.01,0xc4552a);
  }else if(kk==='c4'){
   m.box(.22,.12,.15,0,.04,0,0xc4552a);m.box(.08,.04,.06,0,.11,0,0x1c1e21);m.box(.04,.04,.04,0,.13,.05,0xff3030);
  }else if(kk==='satchel'){
   m.box(.26,.16,.12,0,.04,0,0x6b4a2a);m.cyl(.02,.02,.16,5,.08,.10,.06,0xd9b32a);
  }else if(kk==='beancan'){
   m.cyl(.03,.03,.12,6,0,-.04,0,0x5a3d28);m.cyl(.075,.075,.18,8,0,.08,0,0x3d4a28);m.cyl(.025,.025,.08,6,0,.20,0,0x222222);
  }else{
   const k=rnd();
   if(k<.34){
    m.cyl(.034,.042,.78,7,0,.28,0,0x5a3d28);m.cyl(.068,.062,.28,8,0,.70,0,0x4a3626);
    for(let i=0;i<6;i++){const a=i/6*6.28;m.cone(.025,.1,4,Math.cos(a)*.08,.70,Math.sin(a)*.08,0x9a9ea4,[Math.sin(a)*1.5,0,-Math.cos(a)*1.5])}
   }else if(k<.67){
    m.cyl(.03,.034,.26,7,0,0,0,0x2a2020);m.box(.10,.03,.05,0,.13,0,0x4a4f57);
    m.box(.065,.56,.014,0,.42,0,0x9a9ea4);m.box(.05,.18,.014,.025,.72,0,0xb5b9bd,[0,0,-.25]);
   }else{
    m.cyl(.03,.034,.68,7,0,.26,0,0x6b6f75);m.box(.16,.1,.07,0,.64,0,0x777a7f);m.box(.07,.1,.07,.1,.68,0,0x55595e);
   }
  }
  tool=m.build();
 }else tool=itemModel(rnd()<.6?'hatchet':'pickaxe');
 const tw=new T.Group();tw.add(tool);tw.scale.setScalar(raider?.92:.55);
 tw.position.set(0,-.565,0);
 tw.rotation.x=isGunTool?2.62:1.65;
 tw.userData.isGun=isGunTool;
 armR.add(tw);
 const ac=V.warlord?0x6e1818:(raider?0x55595e:AMC),hel=armHelmet(ac),vst=armVest(ac),lgs=[armLegs(ac),armLegs(ac)];
 if(V.warlord){
  const wb=new MB();
  wb.cone(.045,.22,6,-.16,.24,.02,0xd4af37,[.2,0,.55]);
  wb.cone(.045,.22,6,.16,.24,.02,0xd4af37,[.2,0,-.55]);
  wb.box(.06,.14,.26,0,.25,0,0xb82424);
  wb.box(.26,.04,.04,0,.12,.15,0xd4af37);
  hel.add(wb.build());
  const vp=new MB();
  for(const s of[-1,1]){vp.box(.18,.12,.26,s*.28,1.38,0,0x7a1818);vp.cone(.035,.14,5,s*.32,1.48,0,0xd4af37,[0,0,-s*.4])}
  vst.add(vp.build());
 }
 head.add(hel);g.add(vst);legL.add(lgs[0]);legR.add(lgs[1]);
 const pd={ set visible(on){for(const p of armPads)p.visible=!!on}, get visible(){return armPads[0]?armPads[0].visible:false} };
 const ar=!!heavy,AV=V.arm||{};hel.visible=ar||!!AV.h;vst.visible=pd.visible=ar||!!AV.v;lgs[0].visible=lgs[1].visible=ar||!!AV.l;
 u.parts={head,armL,armR,legL,legR,torso,vst};u.tw=tw;u.raider=!!raider;u.arm={helmet:hel,vest:vst,legs:lgs,pads:pd};u.skin=sk;return g}
function wearArmor(g,on){const a=g.userData.arm;a.helmet.visible=a.vest.visible=a.pads.visible=a.legs[0].visible=a.legs[1].visible=!!on}
function animMan(n,dt){const q=n.m.userData.parts,tw=n.m.userData.tw,isGun=tw&&tw.userData.isGun;if(!q)return;
 const mv=n._mv||0,spd=dt>0?mv/dt:0,f=Math.min(1,spd/2);n.ph=(n.ph||0)+mv*2.4;const sw=Math.sin(n.ph)*.75*f;
 q.legL.rotation.x=sw;q.legR.rotation.x=-sw;
 // Gun raiders hold a 2-handed ready stance; melee raiders & settlers swing naturally
 let al=isGun?-.98-sw*.22:-.18-sw*.75,ar=isGun?-1.08+sw*.20:-.32+sw*.75,azL=isGun?.42:0,azR=isGun?-.12:0;
 let twRx=isGun?(1.5708-ar):1.68,twRz=isGun?-.12:0;
 if(n.rl>0){
  const rk=Math.sin(age*11)*.22;
  ar=-1.02+rk;al=-1.08-rk;azR=-.14;azL=.44;twRx=1.5708-ar;twRz=-.14;
 }else if(n.aimT>0){
  n.aimT=Math.max(0,n.aimT-dt);
  ar=-1.38;al=-1.32;azR=-.12;azL=.46;
  twRx=isGun?(1.5708-ar):1.95;twRz=isGun?-.12:0;
 }
 if(n.sw>0){
  n.sw-=dt;const k=1-Math.max(0,n.sw)/.45,s=Math.sin(Math.PI*k);
  ar=-1.52*s-.28;al=-.55*s-.18;azR=-.14*s;azL=.20*s;
  twRx=1.68+.42*s;twRz=0;
 }
 if(n.armUp>0){
  n.armUp-=dt;
  ar=-1.38;al=-1.24;azR=-.16;azL=.40;
  twRx=isGun?(1.5708-ar):1.95;
 }
 q.armL.rotation.set(al,0,azL);
 q.armR.rotation.set(ar,0,azR);
 if(tw){tw.rotation.set(twRx,0,twRz)}
 q.head.rotation.y=(n.aimT>0||n.armUp>0)?0:Math.sin((n.ph||0)*.3+n.x)*.12*(1-f);
 const bobY=Math.abs(Math.sin(n.ph))*.028*f-(n.crouchT>0?.14:0);
 q.torso.position.y=bobY;
 q.head.position.y=1.43+bobY;
 q.armL.position.y=1.35+bobY;
 q.armR.position.y=1.35+bobY;
 if(q.vst)q.vst.position.y=bobY;
 if(n.crouchT>0)n.crouchT=Math.max(0,n.crouchT-dt)}

function spawnMan(c,raider,V){const g=mkMan(c,raider,V);scene.add(g);return g}
const NP=[],EN=[];let rt=8;
function col(o,ownerN){const rad=.36;for(let pass=0;pass<2;pass++)for(let i=0;i<ALLC.length;i++){const c=ALLC[i];if(c.ramp)continue;if(c.d&&(c.d.open||c.d._gone||c.devBody))continue;if(c.found){if(c.top-o.y<=2.35)continue}else{const ch=c.h||2.85;if(c.y!==undefined&&(o.y>=c.y+ch-.22||o.y<c.y-2.2))continue}const nx=Math.max(c.x0,Math.min(c.x1,o.x)),nz=Math.max(c.z0,Math.min(c.z1,o.z)),dx=o.x-nx,dz=o.z-nz,d=Math.hypot(dx,dz);if(d>=rad)continue;if(d>1e-4){o.x=nx+dx/d*rad;o.z=nz+dz/d*rad}else{const a=o.x-c.x0,b=c.x1-o.x,e=o.z-c.z0,f=c.z1-o.z,m=Math.min(a,b,e,f);if(m===a)o.x=c.x0-rad;else if(m===b)o.x=c.x1+rad;else if(m===e)o.z=c.z0-rad;else o.z=c.z1+rad}}
 let pad=null,py=-1e9;for(let i=0;i<ALLC.length;i++){const c=ALLC[i];if(!c.found||o.x<c.x0-.05||o.x>c.x1+.05||o.z<c.z0-.05||o.z>c.z1+.05)continue;if(c.top>=py&&c.top-o.y<=2.35&&o.y-c.top<1.2){py=c.top;pad=c}}if(pad&&pad.top>o.y+.04)o.y=pad.top;touchPosts(o,rad);touchStaticGrid(o,.28,o.y)}
function touchPosts(o,rad){const posts=POSTS;if(!posts||!posts.length)return;for(let i=0;i<posts.length;i++){const p=posts[i];if(p.skip)continue;const dx=o.x-p.x,dz=o.z-p.z,d=Math.hypot(dx,dz),need=(rad||.4)+(p.r||.3);if(d<need&&d>1e-4){o.x=p.x+dx/d*need;o.z=p.z+dz/d*need}}}
function openNearDoor(n,rad){if(!n||!n.bp)return;for(const e of devs){if(!isDoor(e.t)||e._gone||e.npc!==n)continue;const d=Math.hypot(e.x-n.x,e.z-n.z);if(d<rad){e.open=true;e.ac=age+6}else if(e.open&&d>3.2&&EN.some(r=>r.hp>0&&Math.hypot(r.x-e.x,r.z-e.z)<18)){e.open=false;e.ac=0}}}
function clearRing(n,tx,tz){for(const rad of[2.4,4.4,7]){let best=null,bd=1e9;for(let k=0;k<12;k++){const a=k*.524+(n.seed||0),x=tx+Math.cos(a)*rad,z=tz+Math.sin(a)*rad;if(Math.abs(x)>B-4||Math.abs(z)>B-4||H(x,z)<.65||blkAt(n,x,z))continue;const d=Math.hypot(x-tx,z-tz);if(d<bd){bd=d;best=[x,z]}}if(best)return best}return null}
function stepTo(n,tx,tz,sp,dt){const px=n.x,pz=n.z,dx=tx-n.x,dz=tz-n.z,d=Math.hypot(dx,dz);let moved=d<=.15,campBlk=0;
 if(d>.15){const base=Math.atan2(dx,dz),s=Math.min(d,sp*dt),sd=n.side||1,opts=[0,.5*sd,1.05*sd,1.65*sd,2.35*sd,-.5*sd,-1.05*sd,-1.65*sd,-2.35*sd];openNearDoor(n,2.7);
  for(const a of opts){const q={x:n.x+Math.sin(base+a)*s,z:n.z+Math.cos(base+a)*s,y:n.y};if(H(q.x,q.z)<-.6)continue;if(n.k==='settler'){const cd=campDanger(n,q.x,q.z);if(cd&&Math.hypot(q.x-cd.x,q.z-cd.z)<Math.hypot(n.x-cd.x,n.z-cd.z)){campBlk=1;continue}}col(q);
   if(Math.hypot(q.x-n.x,q.z-n.z)>s*.30){n.x=q.x;n.z=q.z;n.m.rotation.y=base+a;if(a!==0){n.side=Math.sign(a)||1;n.detT=1.5}moved=true;break}}}
 if(!moved&&campBlk){const bt=(n.job&&n.job.o)||n.lt;if(bt)(n.bad=n.bad||new Set()).add(bt);n.job=null;n.pT=null;n.pth=[];n.lt=null;n.stuck=0}
 if(!moved){n.stuck=(n.stuck||0)+dt;if(n.stuck>1.25&&!n._replan){n._replan=1;n.pth=[];n.pR=0;n.side=-(n.side||1)}
  if(n.stuck>2.4){const spot=clearRing(n,tx,tz)||clearRing(n,n.x,n.z);if(spot&&!campDanger(n,spot[0],spot[1])){n.x=spot[0];n.z=spot[1];n.y=Math.max(H(n.x,n.z),0)}n.stuck=0;n._replan=0;n.pth=[];n.pT=null}}
 else{n.stuck=Math.max(0,(n.stuck||0)-dt*2.4);n._replan=0}
 if(n.detT>0&&(n.detT-=dt)<=0)n.side=1;
 n.y+=(G(n.x,n.z,n.y)-n.y)*Math.min(1,dt*10);n._mv=Math.hypot(n.x-px,n.z-pz);n.m.position.set(n.x,n.y,n.z);return d}
function blkAt(n,x,z,localC,localTC){if(H(x,z)<-.8)return true;
 if(n&&(n.siege||n.k==='raider')){const tcs=localTC||devs;for(let i=0;i<tcs.length;i++){const d=tcs[i];if(d.t==='tc'&&d.owner!=='you'&&!d._gone&&(!n.tgtSettler||d.npc!==n.tgtSettler)&&Math.hypot(d.x-x,d.z-z)<16)return true}}
 const feet=n?n.y:0,cs=localC||ALLC;
 for(let i=0;i<cs.length;i++){const c=cs[i];if(c.ramp||c.found)continue;if(c.d){if(c.d.open||c.d._gone||c.devBody||(n&&c.d.npc===n))continue}else{const ch=c.h||2.85;if(c.y!==undefined&&(feet>=c.y+ch-.22||feet<c.y-2.2))continue}const dx=x-Math.max(c.x0,Math.min(c.x1,x)),dz=z-Math.max(c.z0,Math.min(c.z1,z));if(dx*dx+dz*dz<.14)return true}
 return false}
function plan(n,tx,tz){
 const fullD=Math.hypot(tx-n.x,tz-n.z);if(fullD<.6)return[];
 // Clamp local pathfinding horizon to 30m so long-range routes stay instantaneous (<0.2ms)
 let gx=tx,gz=tz;if(fullD>30){gx=n.x+(tx-n.x)*30/fullD;gz=n.z+(tz-n.z)*30/fullD}
 const dist=Math.hypot(gx-n.x,gz-n.z),pad=14,minX=Math.min(n.x,gx)-pad,maxX=Math.max(n.x,gx)+pad,minZ=Math.min(n.z,gz)-pad,maxZ=Math.max(n.z,gz)+pad,feet=n?n.y:0;
 const localC=[],localTC=[];
 for(let i=0;i<ALLC.length;i++){const c=ALLC[i];if(c.found||c.ramp)continue;if(c.d&&(c.d.open||c.d._gone||c.devBody||(n&&c.d.npc===n)))continue;if(!c.d&&c.y!==undefined&&(feet>=c.y+(c.h||2.85)-.22||feet<c.y-2.2))continue;if(c.x1<minX||c.x0>maxX||c.z1<minZ||c.z0>maxZ)continue;localC.push(c)}
 if(n&&(n.siege||n.k==='raider')){for(let i=0;i<devs.length;i++){const d=devs[i];if(d.t==='tc'&&d.owner!=='you'&&!d._gone&&Math.abs(d.x-(minX+maxX)*.5)<45&&Math.abs(d.z-(minZ+maxZ)*.5)<45)localTC.push(d)}}
 const losFree=(ax,az,bx,bz)=>{const d=Math.hypot(bx-ax,bz-az);for(let u=.48;u<d;u+=.48)if(blkAt(n,ax+(bx-ax)*u/d,az+(bz-az)*u/d,localC,localTC))return false;return true};
 if(losFree(n.x,n.z,gx,gz))return fullD>30?[[gx,gz],[tx,tz]]:[];
 const S0=.85,W=Math.ceil((maxX-minX)/S0),Hh=Math.ceil((maxZ-minZ)/S0);if(W*Hh>9000||W<2||Hh<2)return[];
 const si=Math.max(0,Math.min(W-1,Math.round((n.x-minX)/S0))),sj=Math.max(0,Math.min(Hh-1,Math.round((n.z-minZ)/S0)));
 const ti=Math.max(0,Math.min(W-1,Math.round((gx-minX)/S0))),tj=Math.max(0,Math.min(Hh-1,Math.round((gz-minZ)/S0)));
 const prev=new Int32Array(W*Hh).fill(-2),gCost=new Float32Array(W*Hh),startIdx=si+sj*W;
 prev[startIdx]=-1;gCost[startIdx]=0;
 const open=[startIdx],fScore=new Float32Array(W*Hh);
 fScore[startIdx]=Math.hypot(si-ti,sj-tj);
 let best=startIdx,bd=(si-ti)**2+(sj-tj)**2,exp=0;
 while(open.length&&exp++<420){
  let bi=0,bf=fScore[open[0]];for(let k=1;k<open.length;k++){const f=fScore[open[k]];if(f<bf){bf=f;bi=k}}
  const c=open[bi];open[bi]=open[open.length-1];open.pop();
  const i=c%W,j=(c/W)|0,d=(i-ti)**2+(j-tj)**2;
  if(d<bd){bd=d;best=c;if(d<=2)break}
  const gc=gCost[c];
  for(let di=-1;di<=1;di++)for(let dj=-1;dj<=1;dj++){
   if(!di&&!dj)continue;const a=i+di,b=j+dj;if(a<0||b<0||a>=W||b>=Hh)continue;
   const k=a+b*W;if(prev[k]!==-2)continue;
   if(blkAt(n,minX+a*S0,minZ+b*S0,localC,localTC)){prev[k]=-3;continue}
   prev[k]=c;const ng=gc+(di&&dj?1.414:1);gCost[k]=ng;fScore[k]=ng+Math.hypot(a-ti,b-tj)*1.15;open.push(k)}}
 const raw=[];for(let c=best;c>=0&&prev[c]!==-1;c=prev[c])raw.push([minX+(c%W)*S0,minZ+((c/W)|0)*S0]);
 raw.reverse();if(!raw.length)return[];
 // String-pull smoothing so waypoints follow natural diagonal sightlines
 const out=[raw[0]];let cur=[n.x,n.z];
 for(let i=1;i<raw.length;i++){if(!losFree(cur[0],cur[1],raw[i][0],raw[i][1])){out.push(raw[i-1]);cur=raw[i-1]}}
 if(out[out.length-1]!==raw[raw.length-1])out.push(raw[raw.length-1]);
 if(fullD>30)out.push([tx,tz]);
 return out}
function go(n,tx,tz,sp,dt){if(!n.pT||Math.hypot(n.pT[0]-tx,n.pT[1]-tz)>2.2||(n.pR-=dt)<=0){n.pT=[tx,tz];n.pR=2.8;n.pth=plan(n,tx,tz)}
 while(n.pth.length&&Math.hypot(n.pth[0][0]-n.x,n.pth[0][1]-n.z)<.85)n.pth.shift();
 const w=n.pth.length?n.pth[0]:[tx,tz];return stepTo(n,w[0],w[1],sp,dt)}
function gatherNode(n,kinds,flt){let farm=null,fd=1e9,b=null,bd=1e9;const list=resList();for(let i=0;i<list.length;i++){const o=list[i],k=o.userData.k;if(!kinds.includes(k)||(n.bad&&n.bad.has(o))||(flt&&!flt(o)))continue;const d=Math.hypot(o.position.x-n.x,o.position.z-n.z);if(o.userData.farm===n){if(d<fd){fd=d;farm=o}}else if(!o.userData.farm&&d<230&&d<bd&&!campDanger(n,o.position.x,o.position.z)){bd=d;b=o}}return farm||b}
function takeNode(n,o){const y=o.userData.yield;if(y){for(const k in y)n.inv[k]=(n.inv[k]||0)+Math.max(1,Math.round(y[k]*.4))}else if(o.userData.k==='tree')n.inv.wood=(n.inv.wood||0)+8;else if(o.userData.k==='junk'||o.userData.k==='barrel'){const L=o.userData.k==='barrel'?barrelLoot(o.userData.kind):loot();if(o.userData.k==='junk'&&Math.random()<.35)L.circuit=(L.circuit||0)+1;if(o.userData.k==='barrel'&&o.userData.kind==='red'&&!L.fuel)L.fuel=1+(Math.random()*2|0);for(const k in L)if(L[k])n.inv[k]=(n.inv[k]||0)+L[k]}else if(o.userData.k==='ore'){n.inv.ore=(n.inv.ore||0)+6;n.inv.stone=(n.inv.stone||0)+2}else if(o.userData.k==='sulfur')n.inv.sulfur=(n.inv.sulfur||0)+4;else{n.inv.stone=(n.inv.stone||0)+4;n.inv.ore=(n.inv.ore||0)+3}o.userData.uses=0;remove(o);const rn=RN[RN.length-1];if(rn&&rn.o===o)rn.timer*=2.2}
function slotSum(sl,a,b,id){let n=0;for(let i=a;i<b;i++)if(sl[i]&&sl[i].id===id)n+=sl[i].n;return n}
function furnacePut(f,id,n){const idx=id==='wood'||id==='fuel'?[2]:[0,1];let left=n;for(const i of idx){if(left<=0)break;const s=f.sl[i];if(s&&s.id===id){const a=Math.min(ITEMS[id].max-s.n,left);s.n+=a;left-=a}else if(!s){const a=Math.min(ITEMS[id].max,left);f.sl[i]={id,n:a};left-=a}}return n-left}
function furnacePull(f){let g=0;for(let i=3;i<6;i++){const s=f.sl[i];if(s&&s.id==='metal'&&s.n>0){g+=s.n;f.sl[i]=null}}return g}
function stockFurnace(n){const f=n.devs&&n.devs.furnace;if(!f||f._gone)return;const q=slotSum(f.sl,0,3,'ore');if((n.inv.ore||0)>4&&q<12)n.inv.ore-=furnacePut(f,'ore',Math.min((n.inv.ore||0)-2,12-q));if(slotSum(f.sl,0,3,'wood')<2&&f.burn<=0&&(n.inv.wood||0)>4)n.inv.wood-=furnacePut(f,'wood',Math.min(2,(n.inv.wood||0)-2))}
function ahead(n,id){let t=0;const lim=Math.min(n.bp.length,(n.i||0)+8);for(let i=n.i||0;i<lim;i++){const st=n.bp[i];if(!st||st[0]==='wire')continue;const rec=REC.find(r=>r.out===st[0]);if(rec&&rec.need[id])t+=rec.need[id]}return t}
function work(n,res,dt,short){
 if(res==='metal'){const f=n.devs.furnace;if(!f||f._gone)return work(n,'circuit',dt,1);const near=Math.hypot(f.x-n.x,f.z-n.z)<3.2;if(!near){go(n,f.x+1.5,f.z+1.2,3.6,dt);return}
  const got=furnacePull(f);if(got)n.inv.metal=(n.inv.metal||0)+got;if((n.inv.metal||0)>=short)return;
  const queued=slotSum(f.sl,0,3,'ore'),out=slotSum(f.sl,3,6,'metal'),have=(n.inv.metal||0)+out,woodIn=slotSum(f.sl,0,3,'wood');
  if((n.inv.ore||0)<1&&queued<1)return work(n,'ore',dt,Math.max(4,short));
  if((n.inv.wood||0)<1&&woodIn<1&&f.burn<=0)return work(n,'wood',dt,1);
  const put=Math.min(n.inv.ore||0,Math.max(0,short-have-queued));
  if(put>0)n.inv.ore-=furnacePut(f,'ore',put);
  if(slotSum(f.sl,0,3,'wood')<1&&f.burn<=0&&(n.inv.wood||0)>0)n.inv.wood-=furnacePut(f,'wood',1);
  n.cd=.16;return}
 const kinds=res==='fuel'?['barrel']:res==='wood'?['tree']:res==='gears'||res==='circuit'?['junk']:res==='ore'?['ore','rock']:['rock'];
 let b=gatherNode(n,kinds,res==='fuel'?o=>o.userData.kind==='red':null);
 if(!b&&res==='fuel'){n.inv.fuel=(n.inv.fuel||0)+3;return}
 if(!b){if((n.repl||0)<28){n.repl=(n.repl||0)+1;plantOne(n,res)}return}
 const bd=Math.hypot(b.position.x-n.x,b.position.z-n.z);
 if(bd>2.2){go(n,b.position.x,b.position.z,3.5,dt);if(n.lt!==b){n.lt=b;n.lb=bd;n.sk=0}else if(bd<n.lb-.3){n.lb=bd;n.sk=0}else if((n.sk+=dt)>2.2){(n.bad=n.bad||new Set()).add(b);n.lt=null;n.sk=0;if(n.bad.size>6)n.bad.clear()}return}
 if(n.cd>0)return;n.cd=.2;n.sw=.45;takeNode(n,b)}
const GR=['wood','stone','ore','gears'];
let LOT_MIN=80;
function rollPlan(seed){
  const w=2+(hash(seed,1.3)*3|0), d=2+(hash(seed,4.7)*3|0);
  const floors=3;
  return {w,d,floors,tx:hash(seed,2.2)*w|0,tz:hash(9,seed)*d|0};
}
function flatFoot(cx,cz,w,d){
  const F=ITEMS.stone_foundation, cells=[];
  for(let i=0;i<w;i++)for(let j=0;j<d;j++)cells.push([cx+i,cz+j]);
  cells.push([cx-1,cz-1],[cx+w,cz-1],[cx-1,cz+d],[cx+w,cz+d]);
  let lo=1e9, hi=-1e9;
  NPCBUILD=1;
  for(const c of cells){
    if(Math.abs(c[0]*C)>B-28||Math.abs(c[1]*C)>B-28){NPCBUILD=0;return false}
    if(!aim(F,c[0]*C,c[1]*C,0).ok){NPCBUILD=0;return false}
    for(const q of [[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]]){const h=H(c[0]*C+q[0],c[1]*C+q[1]);lo=Math.min(lo,h);hi=Math.max(hi,h)}
  }
  NPCBUILD=0;
  if(hi-lo>1.5||lo<.5||hi>8.3)return false;
  const mx=(cx+(w-1)/2)*C, mz=(cz+(d-1)/2)*C;
  if(Math.hypot(mx-SP.x,mz-SP.z)<LOT_MIN)return false;
  if(NP.some(q=>q.lot&&Math.hypot(q.lot.x-mx,q.lot.z-mz)<115))return false;
  if(MONS.some(m=>Math.hypot(m.x-mx,m.z-mz)<(m.r||16)+22))return false;
  return true;
}
function siteBp(sx,sz){
  const plan=rollPlan((sx*3+sz*7)|0);
  for(let r=0;r<12;r++)for(let k=0;k<8;k++){
    const tcx=Math.round((sx+Math.cos(k*.785+r)*(12+r*7))/C), tcz=Math.round((sz+Math.sin(k*.785+r)*(12+r*7))/C);
    const cx=tcx-plan.tx, cz=tcz-plan.tz;
    if(flatFoot(cx,cz,plan.w,plan.d)){const bp=blueprint(cx,cz,plan,'S');bp.plan=plan;return bp}
  }
  return null;
}
function lotOf(bp){const fs=bp.filter(s=>s[1]==='c'&&String(s[0]).endsWith('foundation'));if(!fs.length)return null;let sx=0,sz=0;for(const f of fs){sx+=f[2];sz+=f[3]}return{x:sx/fs.length*C,z:sz/fs.length*C}}
function sideFromAng(a){const dx=Math.cos(a),dz=Math.sin(a);if(Math.abs(dx)>Math.abs(dz))return dx>0?'E':'W';return dz>0?'S':'N'}
function pickFarmDir(mx,mz,prefer){let best=null,bs=-1e9;for(let k=0;k<8;k++){const a=k*Math.PI/4,x=mx+Math.cos(a)*12,z=mz+Math.sin(a)*12;let s=0;for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const h=H(x+i*3,z+j*3);s+=h>.85&&h<7.8?3:-14}if(prefer!=null){let d=Math.abs(a-prefer)%6.283185;if(d>3.141593)d=6.283185-d;s+=(1-d/3.141593)*9}if(s>bs){bs=s;best={a,x,z}}}return best||{a:prefer||0,x:mx+12,z:mz}}
function blueprint(cx,cz,plan,side){
  side=side||'S';
  const w=plan.w,d=plan.d,floors=plan.floors,tcI=plan.tx,tcJ=plan.tz,W='wood_',B=[];
  const tcX=cx+tcI, tcZ=cz+tcJ;
  let si=Math.min(w-1,1), sj=Math.min(d-1,1);
  if(si===tcI&&sj===tcJ){si=w>1?w-1:0;sj=0;if(si===tcI&&sj===tcJ)sj=d-1}
  plan.cx=cx;plan.cz=cz;plan.si=si;plan.sj=sj;
  const nbrs=[[1,0],[-1,0],[0,1],[0,-1]];
  const f0={};
  for(let j=0;j<d;j++)for(let i=0;i<w;i++)f0[i+','+j]='';
  f0[tcI+','+tcJ]='tc';
  f0[si+','+sj]='hall';
  if(w*d>=6){for(const [dx,dy] of nbrs){const i=si+dx,j=sj+dy;if(i<0||j<0||i>=w||j>=d||f0[i+','+j])continue;f0[i+','+j]='hall';break}}
  const rest=[];
  for(let j=0;j<d;j++)for(let i=0;i<w;i++)if(!f0[i+','+j])rest.push([i,j]);
  const nrest=rest.length;
  let nShop=nrest?Math.max(1,Math.round(nrest*.30)):0, nLoot=nrest>1?Math.max(1,Math.round(nrest*.35)):0;
  if(nShop+nLoot>nrest)nLoot=Math.max(0,nrest-nShop);
  rest.forEach((c,idx)=>{f0[c[0]+','+c[1]]=idx<nShop?'shop':idx<nShop+nLoot?'loot':'store'});
  const rooms=[f0];
  for(let L=1;L<floors;L++){
    const f={}, others=[];
    for(let j=0;j<d;j++)for(let i=0;i<w;i++){if(i===si&&j===sj)f[i+','+j]='hall';else others.push([i,j])}
    const nStore=w*d>=4?Math.floor(others.length/3):0;
    others.forEach((c,idx)=>{f[c[0]+','+c[1]]=nStore&&idx>=others.length-nStore?'store':'bed'});
    rooms.push(f);
  }
  plan.rooms=rooms;
  B.push([W+'foundation','c',tcX,tcZ,0]);
  B.push(['tc','d',tcX*C-.72,tcZ*C+.42,'tc',0]);
  for(let i=0;i<w;i++)for(let j=0;j<d;j++)if(!(i===tcI&&j===tcJ))B.push([W+'foundation','c',cx+i,cz+j,0]);
  const pads=[[cx-1,cz-1],[cx+w,cz-1],[cx-1,cz+d],[cx+w,cz+d]];
  for(const pad of pads)B.push([W+'foundation','c',pad[0],pad[1],0]);
  const edges=[];
  for(let i=0;i<w;i++){edges.push([cx+i,cz-1,'S','N']);edges.push([cx+i,cz+d-1,'S','S'])}
  for(let j=0;j<d;j++){edges.push([cx-1,cz+j,'E','W']);edges.push([cx+w-1,cz+j,'E','E'])}
  const isMid=e=>(e[3]==='N'||e[3]==='S')?e[0]===cx+((w-1)>>1):e[1]===cz+((d-1)>>1);
  const wide=e=>(e[3]==='N'||e[3]==='S')?w>=3:d>=3;
  const sameE=(a,b)=>a&&b&&a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3];
  const hallOuter=[];
  for(let i=0;i<w;i++)for(let j=0;j<d;j++)if(f0[i+','+j]==='hall'){
    if(j===0)hallOuter.push([cx+i,cz-1,'S','N']);
    if(j===d-1)hallOuter.push([cx+i,cz+d-1,'S','S']);
    if(i===0)hallOuter.push([cx-1,cz+j,'E','W']);
    if(i===w-1)hallOuter.push([cx+w-1,cz+j,'E','E']);
  }
  const door=hallOuter.find(e=>e[3]===side)||hallOuter[0]||edges.find(e=>e[3]===side&&isMid(e))||edges.find(e=>e[3]===side)||edges.find(isMid)||edges[0];
  const pushE=(e,L,kind)=>{B.push([kind,'e',e[0],e[1],e[2],L]);if(String(kind).endsWith('doorway'))B.push(['door','e',e[0],e[1],e[2],L])};
  const ofRole=(room,role)=>{const o=[];for(let j=0;j<d;j++)for(let i=0;i<w;i++)if(room[i+','+j]===role)o.push([i,j]);return o};
  const put=(ij,id,kk,ox,oz,fl)=>B.push([id,'d',(cx+ij[0])*C+(ox||0),(cz+ij[1])*C+(oz||0),kk,fl||0]);
  function addInterior(room,L){
    const seen={}, idOf={}, regs=[]; let nid=0;
    for(let j=0;j<d;j++)for(let i=0;i<w;i++){
      const k0=i+','+j; if(seen[k0])continue;
      const role=room[k0], cells=[], q=[[i,j]]; seen[k0]=1;
      while(q.length){const c=q.pop();cells.push(c);for(const [dx,dy] of nbrs){const nx=c[0]+dx,ny=c[1]+dy,nk=nx+','+ny;if(nx<0||ny<0||nx>=w||ny>=d||seen[nk]||room[nk]!==role)continue;seen[nk]=1;q.push([nx,ny])}}
      for(const c of cells)idOf[c[0]+','+c[1]]=nid; regs.push({id:nid,role}); nid++;
    }
    const es=[];
    for(let j=0;j<d;j++)for(let i=0;i<w;i++){
      const a=idOf[i+','+j];
      if(i+1<w){const b=idOf[(i+1)+','+j];if(a!==b)es.push({ex:cx+i,ez:cz+j,dir:'E',a,b})}
      if(j+1<d){const b=idOf[i+','+(j+1)];if(a!==b)es.push({ex:cx+i,ez:cz+j,dir:'S',a,b})}
    }
    const hall=(regs.find(r=>r.role==='hall')||regs[0]).id, seenR={[hall]:1}, q=[hall], doorFor={};
    while(q.length){const cur=q.shift();for(const e of es){const o=e.a===cur?e.b:e.b===cur?e.a:-1;if(o<0||seenR[o])continue;seenR[o]=1;if(doorFor[o]==null)doorFor[o]=e;q.push(o)}}
    const punched=new Set(Object.values(doorFor));
    for(const e of es)pushE([e.ex,e.ez,e.dir,'I'],L,punched.has(e)?W+'doorway':W+'wall');
  }
  for(let L=0;L<floors;L++){
    for(const e of edges){if(L===0&&sameE(e,door))pushE(e,L,W+'doorway');else pushE(e,L,wide(e)&&isMid(e)&&!sameE(e,door)?W+'window':W+'wall')}
    addInterior(rooms[L],L);
    if(L===0){
      const shops=ofRole(f0,'shop'), loots=ofRole(f0,'loot'), stores=ofRole(f0,'store');
      if(shops.length>=2){put(shops[0],'furnace','furnace',0,0,0);put(shops[1],'workbench','workbench',0,0,0)}
      else if(shops.length){put(shops[0],'furnace','furnace',.62,-.28,0);put(shops[0],'workbench','workbench',-.58,.36,0)}
      else{put([tcI,tcJ],'furnace','furnace',.62,-.2,0);put([si,sj],'workbench','workbench',.15,.15,0)}
      const lootAt=loots.length?loots:stores.length?[stores[0]]:[[tcI,tcJ]];
      lootAt.forEach((ij,i)=>put(ij,'box',i?'box'+i:'box',i%2?.15:0,i%2?0:-.12,0));
      put([tcI,tcJ],'battery','battery',.55,-.55,0);
      put([tcI,tcJ],'switch','switch',-.62,-.55,0);
    }
    if(L===1){
      const bedCells=ofRole(rooms[1],'bed'),heatCell=bedCells[0]||[tcI,tcJ];
      put(heatCell,'heater','heater',-.52,.48,1);
    }
    for(let i=0;i<w;i++)for(let j=0;j<d;j++)if(!(i===si&&j===sj&&L<floors-1))B.push([W+'roof','c',cx+i,cz+j,L]);
    if(L<floors-1)B.push([W+'stairs','c',cx+si,cz+sj,L,L%2?Math.PI:0]);
  }
  let windAt=null,solarAt=null;
  for(let j=d-1;j>=0;j--)for(let i=w-1;i>=0;i--){if(i===si&&j===sj)continue;if(!windAt)windAt=[i,j];else if(!solarAt){solarAt=[i,j];break}}
  put(windAt||[0,0],'wind','wind',0,.1,floors);
  put(solarAt||windAt||[0,0],'solar','solar',solarAt?0:-.75,solarAt?0:-.45,floors);
  pads.forEach((pad,i)=>B.push(['turret','d',pad[0]*C,pad[1]*C,'turret'+i,0]));
  B.push(['wire','wind','battery']);
  B.push(['wire','solar','battery']);
  B.push(['wire','battery','switch']);
  B.push(['wire','switch','heater']);
  for(let i=0;i<4;i++)B.push(['wire','battery','turret'+i]);
  plan.wallNeed=0;for(const s of B)if(s[1]==='e'&&/wall|window|doorway/.test(String(s[0])))plan.wallNeed++;
  return B}
function pieceAt(st){const ty=st[1],sx=ty==='c'?st[2]*C:ty==='e'?(st[4]==='E'?(st[2]+.5)*C:st[2]*C):st[2],sz=ty==='c'?st[3]*C:ty==='e'?(st[4]==='E'?st[3]*C:(st[3]+.5)*C):st[3],L=ty==='c'?st[4]:ty==='e'?st[5]:0;return{ty,sx,sz,L}}
function approachPoint(n,sx,sz){const lot=n.lot||{x:n.hx,z:n.hz};let dx=sx-lot.x,dz=sz-lot.z,len=Math.hypot(dx,dz);if(len<0.6){const f=n.farm||{x:lot.x+8,z:lot.z};dx=f.x-lot.x;dz=f.z-lot.z;len=Math.hypot(dx,dz)||1;return[lot.x+dx/len*2.3,lot.z+dz/len*2.3]}return[sx+dx/len*2.5,sz+dz/len*2.5]}
function structState(st){
  const it=ITEMS[st[0]]; if(!it) return null;
  if(st[1]==='e'){
    const L=st[5]||0, ex=st[2], ez=st[3], dir=st[4]||'S', E=dir==='E';
    const k=key(ex,ez,dir+(L||''));
    return {mode:'e',it,L,ex,ez,E,dir,k,x:E?(ex+.5)*C:ex*C,z:E?ez*C:(ez+.5)*C,rot:E?Math.PI/2:0,p:it.bd&&it.bd.p};
  }
  if(st[1]==='c'&&it.bd){
    const cx=st[2], cz=st[3], L=st[4]||0, p=it.bd.p;
    return {mode:'c',it,cx,cz,L,p,k:key(cx,cz,p==='foundation'?0:L),x:cx*C,z:cz*C};
  }
  return null;
}
function alreadyStruct(s){
  if(!s) return false;
  if(s.mode==='e'){if(s.it.dv==='door'){const w=WL.get(s.k);return !!(w&&w.door)}return WL.has(s.k)}
  if(s.p==='foundation') return FD.has(s.k);
  if(s.p==='roof') return RF.has(s.k);
  if(s.p==='stairs') return STR.has(s.k);
  return false;
}
function canStruct(s){
  if(!s) return false;
  if(s.mode==='e'){
    const a=FD.get(key(s.ex,s.ez)), b=FD.get(s.E?key(s.ex+1,s.ez):key(s.ex,s.ez+1));
    if(!(a||b)) return false;
    if(s.it.dv==='door'){const w=WL.get(s.k);return !!(w&&w.p==='doorway'&&!w.door)}
    if(WL.has(s.k)) return false;
    if(s.L>0){const nbx=s.E?s.ex+1:s.ex, nbz=s.E?s.ez:s.ez+1, sup=(cx,cz)=>RF.has(key(cx,cz,s.L-1))||STR.has(key(cx,cz,s.L-1)); if(!sup(s.ex,s.ez)&&!sup(nbx,nbz)) return false}
    return true;
  }
  if(s.p==='foundation'){if(FD.has(s.k)) return false; const hs=[[-1,-1],[1,-1],[-1,1],[1,1]].map(d=>H(s.x+d[0]*1.5,s.z+d[1]*1.5)); return Math.min(...hs)>.25}
  if(!FD.get(key(s.cx,s.cz))||RF.has(s.k)||STR.has(s.k)) return false;
  return s.L===0||RF.has(key(s.cx,s.cz,s.L-1))||STR.has(key(s.cx,s.cz,s.L-1));
}
function commitStruct(n,st,s){
  if(s.mode==='e'){
    const a=FD.get(key(s.ex,s.ez)), b=FD.get(s.E?key(s.ex+1,s.ez):key(s.ex,s.ez+1));
    const y=Math.max(a?a.y:-99,b?b.y:-99)+FH*s.L;
    if(s.it.dv==='door'){construct(s.it,{x:s.x-.6*Math.cos(s.rot),z:s.z+.6*Math.sin(s.rot),y,rot:s.rot,k:s.k,cx:s.x,cz:s.z},1); const dev=devs[devs.length-1]; dev.npc=n; n.devs.door=dev; return}
    construct(s.it,{x:s.x,y,z:s.z,k:s.k,rot:s.rot,p:s.p},1); return;
  }
  if(s.p==='foundation'){
    const hs=[[-1,-1],[1,-1],[-1,1],[1,1]].map(d=>H(s.x+d[0]*1.5,s.z+d[1]*1.5));
    const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(d=>FD.get(key(s.cx+d[0],s.cz+d[1]))).find(Boolean);
    construct(s.it,{x:s.x,y:nb?nb.y:padTop(s.x,s.z),z:s.z,k:s.k,p:'foundation',rot:0},1); return;
  }
  const f=FD.get(key(s.cx,s.cz)), y=f.y+FH*s.L, rot=st[5]||0; let dx=0,dz=0;
  if(s.p==='stairs'){const sx=Math.sin(rot), czs=Math.cos(rot); if(Math.abs(sx)>Math.abs(czs)){dx=sx>0?1:-1}else dz=czs>=0?1:-1}
  construct(s.it,{x:s.x,y,z:s.z,k:s.k,p:s.p,rot,dx,dz},1);
}
function placePiece(n,st,free){const id=st[0];if(id==='wire')return false;const it=ITEMS[id],rec=REC.find(r=>r.out===id);if(!it||!rec)return false;
 const built=structState(st);
 if(built){if(alreadyStruct(built))return true;if(!canStruct(built)||privWhy(built.x,built.z,n))return false;if(!free){for(const k in rec.need)if((n.inv[k]||0)<rec.need[k])return false;for(const k in rec.need)n.inv[k]-=rec.need[k]}commitStruct(n,st,built);if(blkAt(n,n.x,n.z)){const spot=clearRing(n,(n.farm&&n.farm.x)||n.x+3,(n.farm&&n.farm.z)||n.z);if(spot){n.x=spot[0];n.z=spot[1];n.y=Math.max(H(n.x,n.z),0);n.m.position.set(n.x,n.y,n.z);n.pth=[];n.pT=null}}return true}
 const need=rec.need;if(!free){for(const k in need)if((n.inv[k]||0)<need[k])return false}
 const at=pieceAt(st),sy=yaw;yaw=at.ty==='c'&&st[5]!==undefined?st[5]:-Math.PI/2;NPCBUILD=1;let lv=at.L;if(at.ty==='d'){const fl=st[5]||0,fnd=FD.get(key(Math.round(at.sx/C),Math.round(at.sz/C)));lv=fnd?fnd.y+FH*fl+.25:0}
 const a=aim(it,at.sx,at.sz,lv);NPCBUILD=0;yaw=sy;
 if(at.ty==='d'&&it.dv!=='door'){const fl=+st[5]||0,fnd=FD.get(key(Math.round(at.sx/C),Math.round(at.sz/C)));a.y=(fnd?fnd.y:H(at.sx,at.sz))+FH*fl;a.x=at.sx;a.z=at.sz;a.ok=a.y>.25}
 if(!a.ok||(it.dv==='tc'&&tcCovering(a.x,a.z)&&(tcCovering(a.x,a.z).npc!==n))||privWhy(a.x,a.z,n))return false;
 if(!free)for(const k in need)n.inv[k]=(n.inv[k]||0)-need[k];construct(it,a,1);
 if(it.dv){const dev=devs[devs.length-1];dev.npc=n;n.devs[at.ty==='d'&&st[4]||id]=dev;if(dev.t==='tc'){n.tc=dev;dev.hp=dev.maxHp=200}if(dev.t==='battery')dev.ch=600}
 if(blkAt(n,n.x,n.z)){const spot=clearRing(n,(n.farm&&n.farm.x)||n.x+3,(n.farm&&n.farm.z)||n.z);if(spot){n.x=spot[0];n.z=spot[1];n.y=Math.max(H(n.x,n.z),0);n.m.position.set(n.x,n.y,n.z);n.pth=[];n.pT=null}}
 return true}
function raiseStarter(n,cellx,cellz){const x=cellx*C,z=cellz*C,F=ITEMS.wood_foundation;NPCBUILD=1;const a=aim(F,x,z,0);NPCBUILD=0;if(!a.ok)return false;construct(F,a,1);{const r=PCS[PCS.length-1];if(r)r.n=n}const y=a.y;
 construct(ITEMS.tc,{x:x-.72,y,z:z+.42,rot:0},1);const tc=devs[devs.length-1];tc.npc=n;n.tc=tc;n.devs.tc=tc;tc.hp=tc.maxHp=200;return true}
function mkChopTree(x,y,z){const k=(x!=null&&z!=null)?treeKindAt(x,z):(R()<.7?'pine':'leaf'),g=treeGroup(k==='snag'?'scrub':k,.82+R()*.45);g.userData.uses=3;g.userData.yield={wood:50};g.userData.rad=.4;return g}
function mkMineRock(){const g=new T.Group();g.add(lodMesh(ROCKG[(R()*ROCKG.length)|0],'rock',70,220));g.scale.setScalar((.75+R()*.7)*1.5);g.rotation.set((R()-.5)*.18,R()*6,(R()-.5)*.14);g.userData.uses=3;g.userData.rad=.85;g.userData.yield={stone:100,ore:14};return g}
function spawnNode(kind,x,z,n){const y=H(x,z);if(y<.75||y>8.2)return null;let o;if(kind==='tree')o=mkChopTree(x,y,z);else if(kind==='rock')o=mkMineRock();else if(kind==='ore'){o=mkOreNode();o.userData.uses=3;o.userData.yield={ore:36,stone:6}}else{o=mkJunk();o.userData.uses=3;o.userData.yield={gears:3,circuit:1}}o.userData.k=kind;o.userData.farm=n;o.rotation.y=hash(x,z)*6;plantProp(o,x,y,z);return o}
function plantOne(n,res){
 const kind=res==='wood'?'tree':res==='gears'||res==='circuit'?'junk':res==='ore'?'ore':'rock';
 const f=n.farm||n.lot||{x:n.hx,z:n.hz};
 for(let t=0;t<14;t++){
  const a=hash((n.repl||0)+t*1.7,n.seed||1)*6.283,r=2.5+hash(t*2.3,(n.repl||0))*5.5;
  const x=f.x+Math.cos(a)*r,z=f.z+Math.sin(a)*r;
  if(!onPlan(x,z,1.5)&&!nearAnyRoad(x,z)&&spawnNode(kind,x,z,n))return true}
 return false}
function plantFarm(n){const lot=n.lot||{x:n.hx,z:n.hz};const a=n.farmAng!=null?n.farmAng:0,c=Math.cos(a),s=Math.sin(a),tx=-s,tz=c;const fx=lot.x+c*16.5,fz=lot.z+s*16.5;n.farm={x:fx,z:fz};
 n.x=lot.x+c*14;n.z=lot.z+s*14;n.y=Math.max(H(n.x,n.z),0);n.m.position.set(n.x,n.y,n.z);n.m.rotation.y=Math.atan2(c,s);
 const layout=[['tree',-2.2,-3.6],['tree',0,-4.2],['tree',2.4,-3.4],['tree',3.8,0],['rock',-2.4,2.8],['rock',0,3.6],['rock',2.6,2.8],['ore',-3.6,-.4],['ore',1.8,.6],['junk',-1.2,-.8]];
 for(const [kind,u,v] of layout){const nx=fx+c*u+tx*v,nz=fz+s*u+tz*v;if(!onPlan(nx,nz,1.2))spawnNode(kind,nx,nz,n)}}
function stashLeft(n){const put=(dev,id,nmb)=>{if(!dev||dev._gone||!(nmb>0)||!ITEMS[id])return 0;let left=nmb;for(let i=0;i<dev.sl.length&&left>0;i++){const s=dev.sl[i];if(s&&s.id===id){const a=Math.min(ITEMS[id].max-s.n,left);s.n+=a;left-=a}else if(!s){const a=Math.min(ITEMS[id].max,left);dev.sl[i]={id,n:a};left-=a}}return nmb-left};const tc=n.tc;if(tc&&!tc._gone){for(const id of['wood','stone','metal']){const used=put(tc,id,n.inv[id]||0);n.inv[id]=(n.inv[id]||0)-used}}const box=n.devs.box;for(const id in n.inv){if(!(n.inv[id]>0))continue;const used=put(box,id,n.inv[id]);n.inv[id]-=used}}
function furnish(n){
  if(!n||!n.plan||!n.plan.rooms||n.furnished||!n.tc||n.tc._gone)return;
  const plan=n.plan,cx=plan.cx,cz=plan.cz,rooms=plan.rooms;if(cx==null)return;
  n.furnished=1;const acc=newAcc(),cube=boxGeo(1,1,1);
  const add=(x,y,z,w,h,d,col,ry)=>{bakeGeo(cube,M4(x,y,z,0,ry||0,0,w,h,d),col,acc)};
  for(let L=0;L<plan.floors;L++){
    const room=rooms[L];if(!room)continue;let beds=0;
    for(let j=0;j<plan.d;j++)for(let i=0;i<plan.w;i++){
      const role=room[i+','+j];if(!role)continue;
      const f=FD.get(key(cx+i,cz+j));if(!f)continue;
      const x=(cx+i)*C,z=(cz+j)*C,deck=L===0?f.y+.03:f.y+FH*L+.02;
      if(role==='bed'&&beds<2){beds++;
        add(x,deck,z,2.15,.04,2.15,0x6a4030);
        add(x,deck+.16,z+.06,1.55,.22,2.15,0x4a3020);
        add(x,deck+.3,z+.1,1.32,.14,1.85,0x8a3a3a);
        add(x,deck+.4,z-.72,1.05,.1,.34,0xe7dcc8);
        add(x,deck+.48,z-1.02,1.48,.46,.08,0x3a2818);
      }else if(role==='bed'){add(x,deck,z,1.8,.035,1.7,0x5a4034);add(x+.55,deck+.16,z+.4,.42,.28,.42,0x6b4a2a)}
      else if(role==='tc'){add(x,deck,z,2.35,.04,2.35,0x3a3228);add(x+.15,f.y+1.05,z-1.2,1.35,.07,.32,0x5c4030);add(x+.15,f.y+1.55,z-1.2,1.35,.07,.32,0x4a3424);add(x-.2,f.y+1.22,z-1.18,.28,.16,.2,0x8a7040);add(x+.35,f.y+1.2,z-1.18,.22,.18,.18,0x6a5040)}
      else if(role==='loot'||role==='store'){add(x,deck,z,2.15,.04,2.15,role==='loot'?0x4a3828:0x3e4632);add(x-.4,deck+.22,z+.25,.55,.4,.55,0x6b4a2a);add(x+.35,deck+.2,z-.3,.48,.36,.48,0x5a3e28);if(role==='loot')add(x+.32,deck+.52,z-.28,.42,.28,.4,0x7a5a34)}
      else if(role==='shop')add(x,deck,z,2.3,.04,2.3,0x2c2926);
      else if(role==='hall')add(x+(L%2?.85:-.85),deck,z,.62,.03,2.2,0x6a5038);
    }
  }
  if(!acc.idx.length)return;
  const mesh=new T.Mesh(accGeo(acc),mProp);mesh.matrixAutoUpdate=false;mesh.updateMatrix();scene.add(mesh);n.furn=mesh;
}
function finishYard(n){if(!n||n.home||!n.tc||n.tc._gone)return;n.home={x:n.tc.x,z:n.tc.z};n.hx=n.tc.x;n.hz=n.tc.z;stashLeft(n);furnish(n);
 const door=devs.find(d=>d.npc===n&&d.t==='door'&&!d._gone);let x=n.tc.x,z=n.tc.z+14;if(door){const ox=door.x-n.tc.x,oz=door.z-n.tc.z,od=Math.hypot(ox,oz)||1;x=n.tc.x+ox/od*11;z=n.tc.z+oz/od*11}if(H(x,z)<.6){x=n.tc.x+12;z=n.tc.z}n.post={x,z};n.x=x;n.z=z;n.y=H(x,z);n.m.position.set(n.x,n.y,n.z);n.m.rotation.y=Math.atan2(n.tc.x-x,n.tc.z-z);
 const fx=x+2.4,fz=z+1.1;if(H(fx,fz)>.5){lightFire(fx,fz,1e7);const fr=fires[fires.length-1];if(fr)fr.keep=true}}
let SETSEED=100;
function mkSettler(sx,sz,c,opt){
  opt=opt||{};
  while(H(sx,sz)<1&&Math.hypot(sx,sz)>2){sx*=.9;sz*=.9}
  const n={x:sx,z:sz,y:H(sx,sz),hp:Math.round(90*DF.sHp),maxHp:Math.round(90*DF.sHp),aggro:0,healCd:0,inv:{wood:12,stone:10,ore:2,metal:4,gears:0,circuit:0,sulfur:0,fuel:6},devs:{},i:0,cd:0,fail:0,m:spawnMan(c,false),bp:[],hx:sx,hz:sz,k:'settler'};
  n.m.position.set(sx,n.y,sz);n.m.userData.k='settler';n.m.userData.a=n;things.push(n.m);
  const tryPlan=p=>{
    for(let r=0;r<16&&!n.bp.length;r++)for(let k=0;k<8&&!n.bp.length;k++){
      const ang=k*.785+r*.31+hash(sx,sz+r), dist=r===0?0:12+r*15;
      const tcx=Math.round((sx+Math.cos(ang)*dist)/C), tcz=Math.round((sz+Math.sin(ang)*dist)/C);
      const cx=tcx-p.tx, cz=tcz-p.tz;
      if(!flatFoot(cx,cz,p.w,p.d))continue;
      const mx=(cx+(p.w-1)/2)*C, mz=(cz+(p.d-1)/2)*C;
      if(opt.close){let dd=Math.abs(Math.atan2(-(mx-SP.x),-(mz-SP.z))-faceYaw)%6.283185;if(dd>3.141593)dd=6.283185-dd;if(dd<.85)continue}
      if(!raiseStarter(n,tcx,tcz))continue;
      const prefer=opt.close?Math.atan2(SP.z-mz,SP.x-mx):hash(mx,mz)*6.283, farm=pickFarmDir(mx,mz,prefer);
      n.plan=p;n.bp=blueprint(cx,cz,p,sideFromAng(farm.a));n.i=2;
      n.lot={x:mx,z:mz};n.farmAng=farm.a;n.hx=mx;n.hz=mz;n.seed=(mx*3+mz)|0;n.floors=p.floors;
      if(opt.close)n.close=1;
    }
  };
  tryPlan(rollPlan(SETSEED++));
  if(!n.bp.length)tryPlan({w:2,d:2,floors:2,tx:0,tz:1});
  if(!n.bp.length||!n.tc){scene.remove(n.m);const ti=things.indexOf(n.m);if(ti>=0)things.splice(ti,1);return false}
  plantFarm(n);clearPlan(n.plan);
  const bonus=n.close?{wood:70,stone:24,ore:2}:{wood:50,stone:16,ore:1};
  n.inv.wood=(n.inv.wood||0)+bonus.wood;n.inv.stone=(n.inv.stone||0)+bonus.stone;n.inv.ore=(n.inv.ore||0)+bonus.ore;
  stockFurnace(n);NP.push(n);return true}
function drySite(x,z,minD,loose){const md=minD==null?140:minD,mpad=loose?18:48,relief=loose?3.6:2.6,minH=loose?.85:1.15,maxH=loose?8.2:6.6;for(let r=0;r<10;r++)for(let k=0;k<8;k++){const a=k*.785+r*.17,d=r*18,nx=x+Math.cos(a)*d,nz=z+Math.sin(a)*d;if(Math.abs(nx)>B-90||Math.abs(nz)>B-90)continue;if(Math.hypot(nx-SP.x,nz-SP.z)<md)continue;if(MONS.some(m=>Math.hypot(m.x-nx,m.z-nz)<m.r+mpad))continue;if(NP.some(q=>Math.hypot((q.lot?q.lot.x:q.hx)-nx,(q.lot?q.lot.z:q.hz)-nz)<115))continue;const h=H(nx,nz);if(h<minH||h>maxH)continue;let lo=h,hi=h;for(const p of[[16,0],[-16,0],[0,16],[0,-16]]){const qh=H(nx+p[0],nz+p[1]);lo=Math.min(lo,qh);hi=Math.max(hi,qh)}if(hi-lo<relief&&lo>.7)return[nx,nz]}return null}
function clearLook(tx,tz){let best=null,bs=1e9;for(let k=0;k<24;k++){const a=k*.262+0.35,x=tx+Math.cos(a)*17,z=tz+Math.sin(a)*17,h=H(x,z);if(h<1.2||h>6.4)continue;let block=0;for(const o of things){if(o.userData.k!=='tree'&&o.userData.k!=='rock')continue;const px=o.position.x,pz=o.position.z,dx=tx-x,dz=tz-z,l2=dx*dx+dz*dz||1;let u=((px-x)*dx+(pz-z)*dz)/l2;if(u<.06||u>.92)continue;if(Math.hypot(px-(x+dx*u),pz-(z+dz*u))<2.6)block++}const pen=block*12+Math.abs(h-2.4);if(pen<bs){bs=pen;best=[x,z,h,block]}}return best}
function spawnSettlers(){const cols=[0x3b6ea5,0x4a8a52,0xa5823b,0x8a4a9a,0x3b8a8a,0x9a3b4a,0x6a6a3b,0x4a4a9a,0x9a6a3b,0x3b9a6a,0x6a3b9a,0x9a9a3b,0x3b6a9a,0x9a3b6a,0x5a8a3b,0x8a5a3b];const want=12;const bear=(x,z)=>Math.atan2(-(x-SP.x),-(z-SP.z));const ad=(a,b)=>{let d=Math.abs(a-b)%6.283185;if(d>3.141593)d=6.283185-d;return d};const fwd=(th,dist)=>[SP.x-Math.sin(th)*dist,SP.z-Math.cos(th)*dist];let nx=SP.x+68,nz=SP.z+12;if(MONS.length){let b=MONS[0],bd=1e9;for(const m of MONS){const d=Math.hypot(m.x-SP.x,m.z-SP.z);if(d<bd){bd=d;b=m}}const dx=b.x-SP.x,dz=b.z-SP.z,l=Math.hypot(dx,dz)||1;nx=SP.x+dx/l*70;nz=SP.z+dz/l*70}const keep=LOT_MIN;LOT_MIN=40;const cands=[];for(const s of [1.2,-1.2,1.75,-1.75,2.35,-2.35])cands.push(fwd(faceYaw+s,54));cands.push([nx,nz]);for(let k=0;k<12;k++)cands.push(fwd(faceYaw+.85+k*.42,48+(k%4)*11));const plantAt=need=>{for(const c of cands){const near=drySite(c[0],c[1],32,1);if(!near||Math.hypot(near[0]-SP.x,near[1]-SP.z)>100)continue;if(need&&ad(bear(near[0],near[1]),faceYaw)<.95)continue;if(mkSettler(near[0],near[1],cols[0],{close:1})){NP[NP.length-1].close=1;return true}}return false};if(!plantAt(true))plantAt(false);LOT_MIN=keep;for(let i=0;NP.length<want&&i<want*18;i++){const x=(hash(i*2.17,9.4)*2-1)*(B-150),z=(hash(4.4,i*3.11)*2-1)*(B-150),site=drySite(x,z,70,1);if(site)mkSettler(site[0],site[1],cols[NP.length%cols.length])}const home=NP.slice().sort((a,b)=>Math.hypot((a.lot?a.lot.x:a.x)-SP.x,(a.lot?a.lot.z:a.z)-SP.z)-Math.hypot((b.lot?b.lot.x:b.x)-SP.x,(b.lot?b.lot.z:b.z)-SP.z))[0];if(home&&home.lot){const ax=(home.lot.x+home.x)*.5,az=(home.lot.z+home.z)*.5;const spot=clearLook(ax,az);if(spot){P.x=LP.x=spot[0];P.z=LP.z=spot[1];P.y=spot[2]+1.7}yaw=Math.atan2(-(ax-P.x),-(az-P.z));pitch=-.32;if(Math.hypot(home.lot.x-P.x,home.lot.z-P.z)<140){say('Down the road a settler put a cupboard down and is building the camp out from it. A cupboard room, a workshop, a loot room and a bedroom upstairs still have to go up.');msgT=8}}}
let RES=[], resAt=-10;
function resList(){
  if(age-resAt<1.6&&RES.length)return RES;
  resAt=age;RES=[];
  for(const o of things){const k=o.userData&&o.userData.k;if(!k||!(o.userData.uses>0))continue;if(k==='tree'||k==='rock'||k==='ore'||k==='junk'||k==='sulfur'||k==='barrel')RES.push(o)}
  return RES;
}
function haulLoad(n){return (n.inv.wood||0)+(n.inv.stone||0)+(n.inv.ore||0)+(n.inv.metal||0)+(n.inv.gears||0)}
function pickJob(n){
  n.trips=(n.trips||0)+1;
  const home=n.home||n.lot||{x:n.hx,z:n.hz};
  const safeMons=MONS.filter(q=>!q.raiderCamp);
  if(hash(n.seed+n.trips,(age*2)|0)<.4&&safeMons.length){
    const m=safeMons[((n.seed+n.trips)%safeMons.length+safeMons.length)%safeMons.length], ang=hash(m.x+n.trips,m.z)*6.283, rad=Math.max(5,(m.r||12)*.62);
    return {k:'mon',m,x:m.x+Math.cos(ang)*rad,z:m.z+Math.sin(ang)*rad,t:age+70};
  }
  const list=resList();let best=null,score=1e9;
  if(list.length){const start=((n.seed+n.trips*13)%list.length+list.length)%list.length;for(let i=0;i<36&&i<list.length;i++){const o=list[(start+i*11)%list.length];if(!o||!o.userData||!(o.userData.uses>0))continue;if(o.userData.farm&&o.userData.farm!==n)continue;if(n.bad&&n.bad.has(o))continue;if(campDanger(n,o.position.x,o.position.z))continue;const d=Math.hypot(o.position.x-home.x,o.position.z-home.z);if(d<22||d>680)continue;const s=Math.abs(d-170);if(s<score){score=s;best=o}}}
  if(best)return {k:'node',o:best,t:age+48};
  const a=hash(n.trips,n.seed)*6.283, r=80+hash(n.z,n.trips)*170;
  let wx=Math.max(-B+50,Math.min(B-50,home.x+Math.cos(a)*r)),wz=Math.max(-B+50,Math.min(B-50,home.z+Math.sin(a)*r));
  if(campDanger(n,wx,wz)){wx=home.x+Math.cos(a)*30;wz=home.z+Math.sin(a)*30}
  return {k:'wander',x:wx,z:wz,t:age+26};
}
function senseMon(n){
  if(n.job&&n.job.k==='mon')return;
  let best=null,bd=62;
  for(const m of MONS){if(m.raiderCamp)continue;const d=Math.hypot(m.x-n.x,m.z-n.z);if(d<bd&&d>7){bd=d;best=m}}
  if(!best||hash(n.x+age,n.seed)<.62)return;
  const ang=hash(best.x,n.seed)*6.28, rad=Math.max(5,(best.r||12)*.6);
  n.job={k:'mon',m:best,x:best.x+Math.cos(ang)*rad,z:best.z+Math.sin(ang)*rad,t:age+55};
  if(Math.hypot(P.x-n.x,P.z-n.z)<46)say('A settler recognizes '+best.n+' and heads over.');
}
function settlerLoot(n,m){
  let best=null,bd=3.1;
  for(const o of CR){if(Math.hypot(o.position.x-m.x,o.position.z-m.z)>m.r+3)continue;const u=o.userData;if(u.cd>0)continue;const d=Math.hypot(o.position.x-n.x,o.position.z-n.z);if(d<bd){bd=d;best=o}}
  if(!best)return false;
  const u=best.userData,bx=crateBox(best),qi=bx.sl.findIndex(Boolean);
  if(qi>=0){const q=bx.sl[qi];n.inv[q.id]=(n.inv[q.id]||0)+Math.min(q.n,8);bx.sl[qi]=null;if(open&&curBox===bx)render(true)}
  u.op=1;if(!bx.sl.some(Boolean))u.cd=CRT[u.tier].cd;
  return true;
}
function roam(n,dt){
  const home=n.home||n.lot||{x:n.hx,z:n.hz};
  if(haulLoad(n)>150){go(n,home.x+2.4,home.z+3.2,3.25,dt);if(Math.hypot(n.x-home.x,n.z-home.z)<9){stashLeft(n);stockFurnace(n);n.job=null}return}
  senseMon(n);
  if(!n.job||n.job.t<age)n.job=pickJob(n);
  const j=n.job;
  if(j.k==='node'){
    const o=j.o;
    if(!o||!o.userData||!(o.userData.uses>0)||!o.parent){n.job=null;return}
    if(Math.hypot(o.position.x-n.x,o.position.z-n.z)>2.15){go(n,o.position.x,o.position.z,3.4,dt);return}
    if(n.cd>0)return;n.cd=.22;n.sw=.45;takeNode(n,o);if(!(o.userData.uses>0))n.job=null;return;
  }
  if(j.k==='mon'){
    if(Math.hypot(j.x-n.x,j.z-n.z)>2.5){go(n,j.x,j.z,3.35,dt);return}
    if(!(j.m&&settlerLoot(n,j.m)))n.job=null;else n.cd=.35;
    return;
  }
  if(Math.hypot(j.x-n.x,j.z-n.z)>3)go(n,j.x,j.z,3.15,dt);else n.job=null;
}

const UPO={foundation:0,wall:1,doorway:1,window:1,roof:2,stairs:3};
function repairWork(n,dt){
 if(n.hp<=0||!n.tc||n.tc._gone)return false;
 // Check for damaged structures or devices belonging to this settler
 let tgt=null,tx=0,tz=0;
 for(const d of devs){if(d._gone||d.npc!==n||!(d.maxHp>0)||d.hp>=d.maxHp)continue;tgt={dev:d};tx=d.x;tz=d.z;break}
 if(!tgt){for(const c of ALLC){if(!c.piece||c.owner!=='npc'||!(c.maxHp>0)||c.hp>=c.maxHp||Math.hypot((c.x0+c.x1)/2-n.tc.x,(c.z0+c.z1)/2-n.tc.z)>26)continue;tgt={c};tx=(c.x0+c.x1)/2;tz=(c.z0+c.z1)/2;break}}
 if(!tgt)return false;
 if(Math.hypot(tx-n.x,tz-n.z)>4.6){const ap=approachPoint(n,tx,tz);go(n,ap[0],ap[1],3.5,dt);return true}
 if(n.cd>0)return true;n.cd=.45;n.sw=.45;
 if(tgt.dev){tgt.dev.hp=Math.min(tgt.dev.maxHp,tgt.dev.hp+45)}
 else if(tgt.c){tgt.c.hp=Math.min(tgt.c.maxHp,tgt.c.hp+65);for(const o of ALLC)if(o.mesh===tgt.c.mesh)o.hp=tgt.c.hp;wallDmg(tgt.c,0)}
 return true}
function upgradeWork(n,dt){
 if(n.hp<=0)return false;
 if(repairWork(n,dt))return true;
 // Upgrade wooden camp door to Sheet Metal Door once metal/gears are available
 const door=n.devs&&n.devs.door;
 if(door&&!door._gone&&door.t==='door'&&(n.inv.metal||0)>=45&&(n.inv.gears||0)>=1){
  if(Math.hypot(door.x-n.x,door.z-n.z)>4.5){go(n,door.x,door.z,3.4,dt);return true}
  if(n.cd>0)return true;n.cd=.5;n.sw=.45;n.inv.metal-=45;n.inv.gears-=1;upgradeDoor(door,'metal_door',true);return true}
 if(!(n.upAt>age)){n.upAt=age+12;const q=[];for(const r of PCS){if(r.n===n&&r.m&&r.m.parent&&TORD.indexOf(r.t)<2)q.push(r)}q.sort((a,b)=>TORD.indexOf(a.t)-TORD.indexOf(b.t)||(UPO[a.p]||0)-(UPO[b.p]||0));n.upQ=q}
 const tcN=id=>{let s=0;if(n.tc&&!n.tc._gone)for(const q of n.tc.sl)if(q&&q.id===id)s+=q.n;return s};
 let r=null,nt,c;
 for(const x of n.upQ||[]){const ti=TORD.indexOf(x.t);if(ti<0||ti>=2||!x.m||!x.m.parent)continue;const t2=TORD[ti+1],cc=upCost(x.p,t2);if(t2==='metal'&&(n.inv.metal||0)+tcN('metal')<cc.metal)continue;r=x;nt=t2;c=cc;break}
 if(!r)return false;
 const k=Object.keys(c)[0],need=c[k];
 if((n.inv[k]||0)<need&&n.tc&&!n.tc._gone)n.inv[k]=(n.inv[k]||0)+tcTake(n.tc,k,need-(n.inv[k]||0));
 if((n.inv[k]||0)<need){work(n,k,dt,need);return true}
 const sx=r.m.position.x,sz=r.m.position.z;
 if(Math.hypot(sx-n.x,sz-n.z)>5.2){const ap=approachPoint(n,sx,sz);go(n,ap[0],ap[1],3.4,dt);if((n.ws=(n.ws||0)+dt)>8){const spot=clearRing(n,ap[0],ap[1]);if(spot){n.x=spot[0];n.z=spot[1];n.y=Math.max(G(n.x,n.z,n.y),H(n.x,n.z),0);n.m.position.set(n.x,n.y,n.z)}n.ws=0;n.pth=[];n.pT=null}return true}
 n.ws=0;if(n.cd>0)return true;n.cd=.5;n.sw=.45;
 n.inv[k]-=need;upgradePiece(r,nt,true);if(Math.hypot(P.x-sx,P.z-sz)<40&&typeof puffAt==='function')puffAt(sx,(r.m.position.y||0)+(r.p==='foundation'?.4:r.p==='roof'?3:1.4),sz);
 return true}
const SWP=[null,
 [{id:'club',need:{wood:10,stone:2},mel:14},{id:'spear',need:{wood:8,stone:3},mel:17}],
 [{id:'knife',need:{metal:8,wood:2},mel:20},{id:'machete',need:{metal:20,wood:3},mel:25}],
 [{id:'pistol',need:{metal:15,gears:2},rng:24,dmg:12,cd:.55},{id:'revolver',need:{metal:18,gears:3,wood:4},rng:28,dmg:20,cd:.75}],
 [{id:'shotgun',need:{metal:25,gears:4,wood:8},rng:16,dmg:30,cd:1},{id:'smg',need:{metal:30,gears:5,circuit:1},rng:26,dmg:5,cd:.13}],
 [{id:'rifle',need:{metal:35,gears:6,circuit:2,wood:8},rng:42,dmg:30,cd:.8},{id:'ak',need:{metal:45,gears:8,circuit:3},rng:36,dmg:8,cd:.14}]];
function wantTier(){return Math.max(1,Math.min(5-daysToRaid(),Math.min(5,raidNo()+2+DF.wTier)))}
// Settlers stay away from live raider camps until they carry a gun (tier 3 = pistol/revolver or better)
function campGunTier(){return 3}
function settlerArmed(n){return !!n&&(n.wt||0)>=campGunTier()}
function campPad(){return Math.ceil(58*DF.sight)+10}
function campDanger(n,x,z){try{if(!n||n.k!=='settler'||(n.wt||0)>=campGunTier())return null;const hm=n.home||n.lot||{x:n.hx,z:n.hz};if(Math.hypot(n.x-hm.x,n.z-hm.z)<26&&Math.hypot(x-hm.x,z-hm.z)<30)return null;const pad=campPad();for(const c of RCAMPS){if(!c.raiders||!c.raiders.some(r=>r&&r.hp>0))continue;if(Math.hypot(x-c.x,z-c.z)<c.r+pad)return c}}catch(e){}return null}
function setSettlerWeapon(n,w){n.wp=w;n.wt=w.t;const tw=n.m&&n.m.userData&&n.m.userData.tw;if(!tw)return;while(tw.children.length)tw.remove(tw.children[0]);tw.userData.isGun=!!w.rng;let m;if(w.rng&&ITM[w.id]){m=itemModel(w.id);m.rotation.set(0,Math.PI/2,Math.PI/2);m.position.set(0,.08,0);tw.scale.setScalar(.52)}else if(w.rng){const L=(RGUN[w.id]||RGUN.pistol).len,b=new MB();b.cyl(.022,.028,L,6,0,.3+L/2,0,0x2a2d31);b.box(.08,.24,.1,0,.2,0,0x3a3d42);m=b.build();tw.scale.setScalar(.8)}else{m=itemModel(w.id);tw.scale.setScalar(.5)}tw.add(m)}
function weaponWork(n,dt){
 if(n.hp<=0)return false;
 const have=n.wt||0,want=wantTier();
 if(have>=want||have>=5||n.wHold>age)return false;
 const t=have+1,w=SWP[t][hash(Math.round(n.hx||0),t*3.7)>.5?1:0],need=w.need;
 if(n.wFor!==t){n.wFor=t;n.wStart=age;n.wc=0}
 if(age-n.wStart>200){n.wHold=age+100;n.wFor=null;return false}
 for(const k of Object.keys(need)){if((n.inv[k]||0)<need[k]&&n.tc&&!n.tc._gone)n.inv[k]=(n.inv[k]||0)+tcTake(n.tc,k,need[k]-(n.inv[k]||0));if((n.inv[k]||0)<need[k]){work(n,k,dt,need[k]);return true}}
 if(n.cd>0)return true;
 n.sw=.45;n.cd=.5;n.wc=(n.wc||0)+.5;
 if(n.wc<4)return true;
 for(const k of Object.keys(need))n.inv[k]-=need[k];
 setSettlerWeapon(n,Object.assign({t},w));n.wFor=null;
 if(Math.hypot(P.x-n.x,P.z-n.z)<70)say('A settler crafted a '+ITEMS[w.id].n+'.');
 return true}
function nextWork(n,dt){
  if(n.bp&&n.bp.length&&n.i>=n.bp.length){if(!n.home)finishYard(n);if(weaponWork(n,dt))return;if(upgradeWork(n,dt))return;roam(n,dt);return}
  if((n.nb||0)<3&&!n.bp.length&&(n.chk=(n.chk||0)-dt)<=0){n.chk=8;n.nb=(n.nb||0)+1;const bp=siteBp(n.hx,n.hz);if(bp){n.bp=bp;if(bp.plan)n.plan=bp.plan;n.i=0;n.wi=undefined;n.fail=0;const lot=lotOf(bp);if(lot){n.lot=lot;n.hx=lot.x;n.hz=lot.z}if(!n.farm)plantFarm(n);return}}
  if(weaponWork(n,dt))return;n.gt=(n.gt||0)+dt;work(n,GR[(n.gt/25|0)%GR.length],dt,4)}
function npcAI(n,dt){const st=n.bp[n.i];if(!st){nextWork(n,dt);return}
 const id=st[0],w=id==='wire',rec=w?null:REC.find(r=>r.out===id);if(!w&&!rec){n.i++;return}
 if(n.hold){stockFurnace(n);const want=(n.inv.wood||0)<40?'wood':(n.inv.ore||0)<8?'ore':(n.inv.stone||0)<80?'stone':'wood';work(n,want,dt,want==='wood'?40:want==='ore'?8:80);return}
 const need=w?{}:rec.need,miss=Object.keys(need).find(k=>(n.inv[k]||0)<need[k]);
 if(miss){if(miss!=='ore'&&miss!=='wood')stockFurnace(n);let ask=need[miss]-(n.inv[miss]||0);if(miss!=='metal')ask=Math.max(ask,ahead(n,miss)-(n.inv[miss]||0));work(n,miss,dt,Math.max(1,ask));return}
 const at=w?null:pieceAt(st),sx=at?at.sx:0,sz=at?at.sz:0;
 if(n.wi!==n.i){n.wi=n.i;n.ws=0}
 if(!w&&Math.hypot(sx-n.x,sz-n.z)>5.2){const ap=approachPoint(n,sx,sz);go(n,ap[0],ap[1],3.6,dt);if((n.ws+=dt)>6){const spot=clearRing(n,ap[0],ap[1]);if(spot){n.x=spot[0];n.z=spot[1];n.y=Math.max(G(n.x,n.z,n.y),H(n.x,n.z),0);n.m.position.set(n.x,n.y,n.z)}n.ws=0;n.pth=[];n.pT=null}return}
 if(n.cd>0)return;n.cd=.2;n.sw=.4;
 if(w){const a=n.devs[st[1]],b=n.devs[st[2]];if(a&&b){if(!wires.some(q=>(q.a===a&&q.b===b)||(q.a===b&&q.b===a)))addWire(a,b);n.i++;return}if((st._try=(st._try||0)+1)<=6){n.bp.push(st);n.i++;return}n.i++;return}
 const pl0=PCS.length;if(placePiece(n,st,false)){for(let q=pl0;q<PCS.length;q++)if(PCS[q].owner==='npc'&&!PCS[q].n)PCS[q].n=n;n.fail=0;n.i++;stockFurnace(n)}
 else if(++n.fail>8){n.fail=0;const tries=(st._try=(st._try||0)+1);if(tries<=4)n.bp.push(st);else n.skip=(n.skip||0)+1;n.i++}}
function tickSettler(n,dt){if(!n||n.hp<=0)return;n.cd-=dt;n._mv=0;npcAI(n,dt);animMan(n,dt)}
function warmSettlers(){
  if(!NP.some(n=>n.close)&&NP.length){const n=NP.slice().sort((a,b)=>Math.hypot((a.lot?a.lot.x:a.x)-SP.x,(a.lot?a.lot.z:a.z)-SP.z)-Math.hypot((b.lot?b.lot.x:b.x)-SP.x,(b.lot?b.lot.z:b.z)-SP.z))[0];if(n)n.close=1}
  for(const n of NP){if(n.bp&&n.i>=n.bp.length&&!n.home&&n.tc)finishYard(n);stockFurnace(n)}
}
function landNear(minD,maxD,tries){for(let i=0;i<(tries||40);i++){const a=Math.random()*6.283,r=minD+Math.random()*(maxD-minD),x=P.x+Math.cos(a)*r,z=P.z+Math.sin(a)*r;if(Math.abs(x)<B&&Math.abs(z)<B&&H(x,z)>.8)return[x,z]}return null}
function dropFoe(e){scene.remove(e.m);const i=things.indexOf(e.m);if(i>=0)things.splice(i,1)}

function bumpHeat(n){RT.heat=Math.min(5,RT.heat+n);RT.quiet=0}
function heatStars(){return RT.heat<.2?0:Math.min(5,Math.ceil(RT.heat))}
function rateScore(){return RT.scavenge*.45+RT.hunt*1.15+RT.build*.5+RT.blood*2.1+Math.min(days,60)*.18}
function rateStars(){return Math.max(0,Math.min(5,Math.floor(rateScore()/7)))}
function rate100(){return Math.max(0,Math.min(100,Math.round(rateScore()*2.6)))}
function daysToRaid(){const d=days+1;return d%5===0?0:5-(d%5)}
const RAIDSZ={};
function raidSize(N){if(RAIDSZ[N]!=null)return RAIDSZ[N];let v;if(N<=1)v=3+(Math.random()*4|0);else v=raidSize(N-1)+(N<=5?1+(Math.random()*5|0):10);RAIDSZ[N]=v;return v}
function raidCount(){return Math.max(2,Math.min(DF.cap,Math.round(raidSize(raidNo())*DF.raidMul)))}
function itId(it){for(const k in ITEMS)if(ITEMS[k]===it)return k;return ''}
function noteBuild(it,g,npc){if(REPLAY||npc)return;const id=itId(it);if(!id)return;BLOG.push({id,g:{x:+g.x,y:+g.y,z:+g.z,rot:g.rot||0,k:g.k,p:g.p,dx:g.dx||0,dz:g.dz||0,cx:g.cx,cz:g.cz}});if(BLOG.length>360)BLOG.shift();RT.build+=1;bumpHeat(.05)}
function replayBuilds(list){REPLAY=1;for(const rec of list||[]){const it=ITEMS[rec.id];if(!it)continue;try{construct(it,rec.g,0)}catch(err){}}REPLAY=0}
function blip(freq,dur,type){try{actx=actx||new AudioContext();if(actx.state==='suspended')actx.resume();const o=actx.createOscillator(),g=actx.createGain();o.type=type||'sawtooth';o.frequency.value=freq;g.gain.setValueAtTime(.05,actx.currentTime);g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+dur);o.connect(g);g.connect(actx.destination);o.start();o.stop(actx.currentTime+dur)}catch(e){}}
function ratingUI(c){const d=document.createElement('div');d.id='det';const rows=[['Scavenge',RT.scavenge],['Hunt',RT.hunt],['Build',RT.build],['Blood',RT.blood]];d.innerHTML='<b>Island rating</b><p>Loot, kills and building are remembered, the way a wipe remembers you. Heat cools if the days stay quiet, and it decides how mean the tenth-night crew is.</p>'+rows.map(r=>'<div class="srow"><span>'+r[0]+'</span><b>'+r[1].toFixed(1)+'</b></div>').join('')+'<div class="srow"><span>Rating</span><b>'+rate100()+' · '+RANKS[rateStars()]+'</b></div><div class="srow"><span>Heat</span><b>'+heatStars()+' / 5</b></div><div class="srow"><span>Difficulty</span><b>'+DF.n+'</b></div><div class="srow"><span>Next raid</span><b>'+(daysToRaid()?('in '+daysToRaid()+' days'):'tonight')+'</b></div>';c.appendChild(d)}
function paintRate(){const st=rateStars(),hs=heatStars(),dr=daysToRaid(),live=EN.filter(e=>e.siege&&e.hp>0).length;const key=st+'|'+hs+'|'+dr+'|'+raidPhase+'|'+live+'|'+(age>16?1:0)+'|'+DIFFK;if(key===rateKey)return;rateKey=key;const el=$('rate');if(el)el.innerHTML='<b>'+RANKS[st]+'</b><span class="pips">'+( '●'.repeat(st)+'○'.repeat(5-st))+'</span><small>Rating '+rate100()+' · Heat '+hs+' · '+(dr?('raid in '+dr+'d'):'raid tonight')+' · '+DF.n+'</small>';const b=$('raid');if(!b)return;if(raidPhase==='warning'){b.style.display='block';b.className='warn';b.textContent='Raid tonight — they move at dark'}else if(raidPhase==='active'||raidPhase==='retreat'){b.style.display='block';b.className=raidPhase==='active'?'hot':'warn';b.textContent=raidPhase==='active'?('Raid in progress · '+live+' still out'):('Falling back · '+live+' left')}else b.style.display='none';const h=$('hint');if(h&&age>16)h.style.display='none'}
const TC_R=26,TUR_R=30;
function tcCovering(x,z){let best=null,bd=TC_R;for(const d of devs){if(d.t!=='tc'||d._gone)continue;const q=Math.hypot(d.x-x,d.z-z);if(q<bd){bd=q;best=d}}return best}
function privWhy(x,z,npc){const tc=tcCovering(x,z);if(!tc)return '';if(npc)return tc.npc===npc?'':'Building blocked.';if(tc.owner==='you')return '';return 'Building blocked. Their tool cupboard holds this ground.'}
function playerTC(){let best=null,score=-1;for(const d of devs){if(d.t!=='tc'||d.owner!=='you'||d._gone)continue;let s=1;for(const c of ALLC)if(c.piece&&c.owner==='you'&&c.hp>0){const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2;if(Math.hypot(cx-d.x,cz-d.z)<=TC_R)s++}if(s>score){score=s;best=d}}return best}
function aggroSettler(n,sec){if(!n||n._dead||n.hp<=0)return;n.aggro=Math.max(n.aggro||0,sec);for(const o of NP)if(o!==n&&!o._dead&&o.hp>0&&Math.hypot(o.x-n.x,o.z-n.z)<24)o.aggro=Math.max(o.aggro||0,sec*.8)}
function pokeBase(x,z){let b=null,bd=26;for(const n of NP){if(n._dead||n.hp<=0)continue;const q=Math.hypot(n.x-x,n.z-z);if(q<bd){bd=q;b=n}}if(!b)return;const was=b.aggro>0;aggroSettler(b,28);if(!was)say('The settlers turn on you.')}
function killSettler(n){if(!n||n._dead)return;n._dead=1;n.hp=-1;dropFoe(n);const i=NP.indexOf(n);if(i>=0)NP.splice(i,1);if(Math.hypot(P.x-n.x,P.z-n.z)<48){give('wood',4+(Math.random()*6|0));if(Math.random()<.45)give('stone',3);if(Math.random()<.35)give('metal',2);say('Settler down.')}RT.blood+=1.1;bumpHeat(.25)}
function gdtOf(dt){const fwd=ch('freeze')?0:(CH.on?CH.ts:1);return dt*fwd*(pace/REF_PACE)}
function tcTake(d,id,n){let left=n;for(let i=0;i<d.sl.length&&left>0;i++){const s=d.sl[i];if(!s||s.id!==id)continue;const a=Math.min(s.n,left);s.n-=a;left-=a;if(s.n<=0)d.sl[i]=null}return n-left}
function upkeepTick(dt){const g=gdtOf(dt);if(g<=0)return;const UP={wood:.05,stone:.035,metal:.02,hq:.03};
 for(const tc of devs){if(tc.t!=='tc'||tc._gone||tc.owner!=='you')continue;const cost={wood:0,stone:0,metal:0},covered=[];
  for(const c of ALLC){if(!c.piece||c.owner!=='you'||!(c.hp>0)||!c.mesh)continue;const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2;if(tcCovering(cx,cz)!==tc)continue;if(covered.some(q=>q.mesh===c.mesh))continue;covered.push(c);const tier0=c.tier||'wood',tier=tier0==='hq'?'metal':tier0;cost[tier]+=UP[tier0]||UP.wood}
  for(const dev of devs){if(dev._gone||dev===tc||dev.owner!=='you'||isDoor(dev.t)||isWin(dev.t))continue;if(tcCovering(dev.x,dev.z)!==tc)continue;cost.metal+=UP.metal*.5}
  tc.cost=cost;tc.paid=true;tc.short='';tc.due=tc.due||{};
  for(const k of ['wood','stone','metal']){const need=(cost[k]||0)*g;if(need<=0)continue;tc.due[k]=(tc.due[k]||0)+need;const whole=Math.floor(tc.due[k]);if(whole>0){const got=tcTake(tc,k,whole);tc.due[k]-=got;if(got<whole){tc.paid=false;tc.short=k}}}
  if(!tc.paid){for(const c of covered){if(tc.short&&(c.tier==='hq'?'metal':(c.tier||'wood'))!==tc.short)continue;c.hp-=.5*g;for(const o of ALLC)if(o.mesh===c.mesh)o.hp=c.hp;wallDmg(c,0);if(c.hp<=0)smashPiece(c,true)}}}
 for(const c of ALLC.slice()){if(!c.piece||c.owner!=='you'||!(c.hp>0))continue;const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2;if(devs.some(t=>t.t==='tc'&&t.owner==='you'&&!t._gone&&Math.hypot(t.x-cx,t.z-cz)<=TC_R))continue;if(age-(c.born||0)<90)continue;c.hp-=.22*g;if(c.mesh)for(const o of ALLC)if(o.mesh===c.mesh)o.hp=c.hp;wallDmg(c,0);if(c.hp<=0)smashPiece(c,true)}}
function raidAnchor(){const tc=playerTC();if(tc)return{x:tc.x,z:tc.z,live:false,tc};if(CLAIM)return{x:CLAIM.x,z:CLAIM.z,live:false,tc:null};let sx=0,sz=0,n=0;for(const c of ALLC)if(c.piece&&c.owner==='you'){sx+=(c.x0+c.x1)/2;sz+=(c.z0+c.z1)/2;n++}for(const d of devs)if(d.owner==='you'){sx+=d.x;sz+=d.z;n++}if(n)return{x:sx/n,z:sz/n,live:false,tc:null};return{x:P.x,z:P.z,live:true,tc:null}}
function raidGround(x,z){if(Math.abs(x)>=B-2||Math.abs(z)>=B-2)return false;const h=H(x,z);if(!(h>1.05&&h<8.2))return false;for(const d of devs)if(d.t==='tc'&&!d._gone&&d.owner!=='you'&&Math.hypot(d.x-x,d.z-z)<40)return false;return true}
function ringSpawn(ax,az,minR,maxR){for(let i=0;i<64;i++){const a=Math.random()*6.283,r=minR+Math.random()*(maxR-minR),x=ax+Math.cos(a)*r,z=az+Math.sin(a)*r;if(raidGround(x,z))return[x,z]}for(let i=0;i<48;i++){const a=Math.random()*6.283,r=22+Math.random()*80,x=ax+Math.cos(a)*r,z=az+Math.sin(a)*r;if(raidGround(x,z))return[x,z]}return null}
const DMG_DARK=new T.Color(0x2a221b),DMG_CRK=new T.MeshBasicMaterial({color:0x100c08}),DMG_CHIP=new T.MeshBasicMaterial({color:0x1a1510}),DMG_GEO=new T.BoxGeometry(1,1,1);
function wallDmg(c,fxOn){const m=c&&c.mesh;if(!m||!c.maxHp)return;const r=Math.max(0,c.hp/c.maxHp),st=r>.75?0:r>.5?1:r>.25?2:3,U=m.userData;
 if(fxOn&&!(U._fx>age)){U._fx=age+.2;const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2,y0=(c.y||0)+1.3,q=Math.random,tc=({wood:0x8a6a44,stone:0x9a9a94,metal:0x9aa0a8,hq:0x4a525c})[c.tier]||0x8a8a84;
  for(let i=0;i<6;i++)fxAdd(1,i%3?tc:0x3a3028,cx+(q()-.5)*2.2,y0+(q()-.5)*2,cz+(q()-.5)*2.2,(q()-.5)*3,1+q()*2.2,(q()-.5)*3,.6+q()*.4,.06+q()*.07,0,0,9,.3)}
 if(U._ds===st)return;U._ds=st;
 if(!U._cl){U._cl=1;m.traverse(o=>{if(o.isMesh&&o.material&&o.material.color){o.material=o.material.clone();o.userData._c0=o.material.color.getHex()}})}
 m.traverse(o=>{if(o.isMesh&&o.userData._c0!=null)o.material.color.setHex(o.userData._c0).lerp(DMG_DARK,st*.17)});
 if(U._cg){m.remove(U._cg);U._cg=null}
 if(!st)return;
 const pc=PCS.find(q=>q.m===m),open=pc&&(pc.p==='doorway'||pc.p==='window'),g=new T.Group();let sd=0;for(const ch of String(c.wk||'x'))sd=(sd*31+ch.charCodeAt(0))>>>0;
 const rnd=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296},n=st*3;
 for(let f=-1;f<=1;f+=2)for(let i=0;i<n;i++){let x=(rnd()*2-1)*1.3;if(open&&Math.abs(x)<.75)x=(x<0?-1:1)*(.75+rnd()*.6);const y=.35+rnd()*2.3,len=.3+rnd()*.5*st,a=(rnd()-.5)*1.4;
  const k=new T.Mesh(DMG_GEO,DMG_CRK);k.scale.set(.035,len,.02);k.position.set(x,y,f*.175);k.rotation.z=a;g.add(k);
  if(rnd()<.6){const k2=new T.Mesh(DMG_GEO,DMG_CRK);k2.scale.set(.03,len*.6,.02);k2.position.set(x+Math.sin(a)*len*.45,y+Math.cos(a)*len*.45,f*.175);k2.rotation.z=a+(rnd()-.5)*1.6;g.add(k2)}}
 if(st>=2)for(let f=-1;f<=1;f+=2)for(let i=0;i<st-1;i++){let x=(rnd()*2-1)*1.2;if(open&&Math.abs(x)<.8)x=(x<0?-1:1)*.9;const k=new T.Mesh(DMG_GEO,DMG_CHIP);k.scale.set(.22+rnd()*.28,.18+rnd()*.3,.025);k.position.set(x,.5+rnd()*2.1,f*.176);k.rotation.z=rnd()*3;g.add(k)}
 m.add(g);U._cg=g}
const WB={c:null,u:0,bd:1e9,h:''};
function wbPoke(o){if(o){WB.c=o;WB.u=performance.now()+4000}}
function wbBlast(o,dist){if(dist<WB.bd){WB.bd=dist;wbPoke(o)}}
function wbAim(){const fx=-Math.sin(yaw),fz=-Math.cos(yaw),cp=Math.cos(pitch),fy=Math.sin(pitch);let best=null,bd=6.5;
 for(const c of ALLC){let o=null,cy=0;if(c.piece&&c.hp>0&&c.owner==='you'){o=c;cy=(c.y||0)+1.3}else if(c.d&&!c.d._gone&&c.d.hp>0&&c.d.owner==='you'&&!c.d.open){o=c.d;cy=(c.y||0)+1.1}if(!o)continue;
  const vx=(c.x0+c.x1)/2-P.x,vy=cy-P.y,vz=(c.z0+c.z1)/2-P.z,al=vx*fx*cp+vy*fy+vz*fz*cp;if(al<.2||al>=bd)continue;
  const L2=vx*vx+vy*vy+vz*vz,perp=Math.sqrt(Math.max(0,L2-al*al));if(perp>1.5)continue;bd=al;best=o}
 return best}
function wbInfo(o){const cap=s=>s?s[0].toUpperCase()+s.slice(1):'';
 if(o.piece){const pc=PCS.find(q=>q.m===o.mesh),tn=(TIER[o.tier]||{}).n||'';return{nm:(tn?tn+' ':'')+cap(pc?pc.p:'wall'),hp:o.hp,mx:o.maxHp||1}}
 return{nm:o.t==='tc'?'Tool cupboard':cap(o.t||'device'),hp:o.hp,mx:o.maxHp||o.hp||1}}
function wbHud(){const el=$('wbar');if(!el)return;let o=null;const now=performance.now();
 if(!dead&&!open){if(WB.c&&now<WB.u)o=WB.c;else o=wbAim()}
 if(!o){if(WB.h!==''){WB.h='';el.classList.remove('on')}return}
 const f=wbInfo(o),hp=Math.max(0,f.hp),r=Math.min(1,hp/f.mx),st=r>.75?0:r>.5?1:r>.25?2:3;
 if(hp<=0&&WB.c===o&&WB.u-now>1200)WB.u=now+1200;
 const h=f.nm+'|'+Math.ceil(hp)+'|'+Math.round(f.mx);if(h===WB.h)return;WB.h=h;
 el.innerHTML='<b>'+f.nm+'</b><span>'+(hp<=0?'Destroyed':Math.ceil(hp)+' / '+Math.round(f.mx))+'</span><div class="tr"><i style="width:'+(r*100).toFixed(1)+'%"></i></div>';
 el.dataset.s=st;el.classList.add('on')}
function smashPiece(c,quiet){const mesh=c.mesh,wk=c.wk;if(mesh){for(let i=ALLC.length-1;i>=0;i--)if(ALLC[i].mesh===mesh)ALLC.splice(i,1);scene.remove(mesh)}else{const i=ALLC.indexOf(c);if(i>=0)ALLC.splice(i,1)}if(wk){const w=WL.get(wk);if(w&&w.doorDev)killDev(w.doorDev);if(w&&w.winDev)killDev(w.winDev);WL.delete(wk)}if(!quiet)say('A wall comes down.')}
function killDev(d){if(!d||d._gone)return;d._gone=1;if(d.l)d.l.intensity=0;if(d.m){scene.remove(d.m);const ti=things.indexOf(d.m);if(ti>=0)things.splice(ti,1)}
 for(let i=ALLC.length-1;i>=0;i--)if(ALLC[i].d===d)ALLC.splice(i,1);
 for(const [,v] of WL){if(v.doorDev===d){v.door=0;v.doorDev=null}if(v.winDev===d){v.win=0;v.winDev=null}}
 for(let i=wires.length-1;i>=0;i--)if(wires[i].a===d||wires[i].b===d){scene.remove(wires[i].l);wires.splice(i,1)}
 const i=devs.indexOf(d);if(i>=0){const last=devs.pop();if(last!==d){devs[i]=last;last.i=i}}
 if(curBox===d){curBox=null;if(open){open=false;render()}}
 if(d.t==='tc'){if(d.npc)d.npc.tc=null;if(siegeAnchor.tc===d)siegeAnchor.tc=null}}
const BLAST={beancan:{fuse:2.35,rad:3.5,struct:78,hp:28,toss:13},satchel:{fuse:3.7,rad:4.7,struct:200,hp:40,toss:11,stick:1},c4:{fuse:5,rad:5.8,struct:480,hp:58,toss:0,stick:1},rocket:{fuse:3.4,rad:4.5,struct:310,hp:44,toss:0}};
const ORDS=[],flashes=[],puffs=[];
function ordMesh(kind){let m;if(kind==='rocket'){m=new T.Mesh(new T.CylinderGeometry(.06,.08,.46,6),LMat({color:0x2a2d31}));m.rotation.x=1.5708}
 else if(kind==='beancan')m=new T.Mesh(new T.CylinderGeometry(.09,.09,.2,8),LMat({color:0x3d4a28}));
 else if(kind==='c4')m=new T.Mesh(new T.BoxGeometry(.28,.12,.2),LMat({color:0xc4552a}));
 else m=new T.Mesh(new T.BoxGeometry(.32,.18,.14),LMat({color:0x6b4a2a}));scene.add(m);return m}
function dropOrd(o){if(!o||!o.mesh)return;scene.remove(o.mesh);if(o.mesh.geometry)o.mesh.geometry.dispose();if(o.mesh.material)o.mesh.material.dispose();o.mesh=null}
function spawnOrd(o){if(ORDS.length>18)dropOrd(ORDS.shift());o.fuse0=o.fuse;o.mesh=ordMesh(o.kind);o.mesh.position.set(o.x,o.y,o.z);ORDS.push(o);return o}
function ordBlocked(x,y,z){for(let i=0;i<ALLC.length;i++){const c=ALLC[i];if(c.ramp||(c.d&&(c.d.open||c.d._gone)))continue;if(c.found){if(y>c.top-.05||y<c.top-2.45)continue}else{const ch=c.h||3.1;if(c.y!==undefined&&(y<c.y-.15||y>c.y+ch+.1))continue;if(c.winWall&&y>c.y+1.02&&y<c.y+2.22&&Math.hypot(x-c.wx,z-c.wz)<.52)continue}if(x>c.x0-.18&&x<c.x1+.18&&z>c.z0-.18&&z<c.z1+.18)return true}return false}
function flashAt(x,y,z,rad,col){let m=flashes.find(f=>!f.userData.on);if(!m){m=new T.Mesh(new T.SphereGeometry(1,8,6),new T.MeshBasicMaterial({color:col,transparent:true,opacity:.85,depthWrite:false}));scene.add(m);flashes.push(m)}
 m.material.color.setHex(col);m.material.opacity=.85;m.userData.on=1;m.userData.life=.32;m.userData.rad=rad;m.position.set(x,y,z);m.scale.setScalar(.25);m.visible=true}
function puffAt(x,y,z){if(puffs.length>8){const old=puffs.shift();scene.remove(old.m);old.g.dispose();old.m.material.dispose()}
 const n=12,pos=new Float32Array(n*3),vel=[];for(let i=0;i<n;i++){pos[i*3]=x;pos[i*3+1]=y;pos[i*3+2]=z;vel.push((Math.random()-.5)*9,2+Math.random()*7,(Math.random()-.5)*9)}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));const m=new T.Points(g,new T.PointsMaterial({color:0x6a5848,size:.22,transparent:true,opacity:.9,depthWrite:false}));scene.add(m);puffs.push({m,g,pos,vel,life:.5,n})}
function boom(o){const spec=BLAST[o.kind];if(!spec){dropOrd(o);return}blastN++;const x=o.x,y=o.y,z=o.z,rad=spec.rad;dropOrd(o);
 flashAt(x,y,z,rad*(o.kind==='c4'?1:0.72),o.kind==='rocket'?0xffd24a:0xff7a2a);puffAt(x,y+.4,z);
 const pd=Math.hypot(P.x-x,P.z-z);if(pd<rad+8)shake=Math.max(shake,(1-pd/(rad+8))*((o.kind==='c4'||o.kind==='rocket')?.55:.32));
 if(pd<rad){const fall=1-pd/rad;hurtP(spec.hp*fall*(pd<1.2?1:1),o.owner==='you'?'Your own charge':'The blast')}
 const seen=new Set();let broke=0;WB.bd=1e9;
 for(const c of ALLC.slice()){if(c.piece&&c.hp>0&&c.mesh&&!seen.has(c.mesh)){const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2,dist=Math.hypot(x-cx,y-((c.y||0)+1.4),z-cz);if(dist>rad)continue;seen.add(c.mesh);const hp=c.hp-spec.struct*(1-dist/rad);for(const q of ALLC)if(q.mesh===c.mesh)q.hp=hp;c.hp=hp;wallDmg(c,1);wbBlast(c,dist);if(hp<=0){smashPiece(c,true);broke++}}
  else if(c.d&&!c.d._gone&&c.d.hp>0&&!c.d.open){const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2,dist=Math.hypot(x-cx,y-((c.y||0)+1.1),z-cz);if(dist>rad)continue;c.d.hp-=spec.struct*(1-dist/rad)*.9;wbBlast(c.d,dist);if(c.d.hp<=0){killDev(c.d);broke++}}}
 for(const d of devs.slice()){if(isDoor(d.t)||isWin(d.t)||d._gone)continue;const dist=Math.hypot(d.x-x,(d.y+1)-y,d.z-z);if(dist>rad)continue;d.hp-=spec.struct*(1-dist/rad)*.75;wbBlast(d,dist);if(d.hp<=0){killDev(d);broke++}}
 const bite=(arr,sc)=>{for(const e of arr){if(e.hp<=0)continue;const dist=Math.hypot(e.x-x,e.z-z);if(dist>rad)continue;const fall=(1-dist/rad)*sc;e.hp-=spec.hp*fall;if(e.hp<=0)e.hp=-1}};
 bite(EN,o.owner==='raid'?.4:1);bite(WV,1.2);bite(DE,.8);bite(NP,1);
 for(const n of NP.slice()){if(n._dead||Math.hypot(n.x-x,n.z-z)>rad)continue;if(n.hp<=0)killSettler(n);else if(o.owner==='you')aggroSettler(n,32)}
 if(o.owner==='you'&&(ALLC.some(c=>(c.owner==='npc'||(c.d&&c.d.owner==='npc'))&&Math.hypot(((c.x0+c.x1)/2)-x,((c.z0+c.z1)/2)-z)<rad)||devs.some(d=>d.owner==='npc'&&!d._gone&&Math.hypot(d.x-x,d.z-z)<rad)))pokeBase(x,z);
 for(let i=fires.length-1;i>=0;i--){const f=fires[i];if(Math.hypot(f.x-x,f.z-z)<rad*.7){scene.remove(f.g);fires.splice(i,1)}}
 if(o.owner==='you')bumpHeat(o.kind==='c4'||o.kind==='rocket'?.35:.16);
 if(broke)say(broke===1?'The blast takes a piece.':'The blast takes '+broke+' pieces.');
 blip(o.kind==='beancan'?90:55,.35,'square');blip(140,.12,'sawtooth')}
function plantSpot(){const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let best=null,bd=2.7;for(const c of ALLC){let ok=false,cx,cz,cy;if(c.piece&&c.hp>0){ok=true;cx=(c.x0+c.x1)/2;cz=(c.z0+c.z1)/2;cy=(c.y||0)+1.25}else if(c.d&&c.d.hp>0&&!c.d.open&&!c.d._gone){ok=true;cx=(c.x0+c.x1)/2;cz=(c.z0+c.z1)/2;cy=(c.y||0)+1.1}if(!ok)continue;const dx=cx-P.x,dz=cz-P.z,d=Math.hypot(dx,dz)||1;if(d>2.55)continue;if((dx*fx+dz*fz)/d<0.12)continue;if(d<bd){bd=d;best={x:cx,y:cy,z:cz}}}return best}
function plantHeld(kind){if(throwCd>0)return false;let spot=plantSpot();if(!spot){const x=P.x-Math.sin(yaw)*1.5,z=P.z-Math.cos(yaw)*1.5;if(H(x,z)<.3){say('Too wet to set a charge.');return false}spot={x,y:H(x,z)+.18,z}}
 spawnOrd({kind,x:spot.x,y:spot.y,z:spot.z,vx:0,vy:0,vz:0,fuse:BLAST[kind].fuse,stuck:true,owner:'you'});throwCd=.45;blip(kind==='c4'?640:220,.07,'square');say(kind==='c4'?'Charge set. Five seconds.':'Satchel stuck. Get clear.');return true}
function tossHeld(kind){if(throwCd>0)return false;if(kind==='satchel'&&plantSpot())return plantHeld('satchel');const spec=BLAST[kind],cp=Math.cos(Math.max(-.15,pitch)),spd=spec.toss;
 spawnOrd({kind,x:P.x-Math.sin(yaw)*.45,y:P.y-.05,z:P.z-Math.cos(yaw)*.45,vx:-Math.sin(yaw)*cp*spd,vy:Math.sin(pitch)*spd+2.6,vz:-Math.cos(yaw)*cp*spd,fuse:spec.fuse,owner:'you'});throwCd=.42;blip(260,.05,'square');return true}
function fireRocketPlayer(){if(throwCd>0||dead)return;if(cnt('rocket')<=0){say('No rockets.');throwCd=.3;return}take('rocket',1);const cp=Math.cos(pitch),spd=34;
 spawnOrd({kind:'rocket',rocket:1,x:P.x-Math.sin(yaw)*.5,y:P.y-.12,z:P.z-Math.cos(yaw)*.5,vx:-Math.sin(yaw)*cp*spd,vy:Math.sin(pitch)*spd,vz:-Math.cos(yaw)*cp*spd,fuse:3.2,owner:'you'});throwCd=.7;kickV=1;flashT=.08;blip(160,.1,'square');blip(70,.28,'sawtooth');rocketFx()}
function rocketFx(){lnT=.9;const q=Math.random,v=vb();camK=Math.min(.09,camK+.05);camY+=(q()-.5)*.03;camR+=(q()-.5)*.04;shake=Math.max(shake,.03);
 for(let i=0;i<9;i++)fxAdd(0,i%3?0x9a9a9a:0xff9a3c,P.x-v.f[0]*.7+(q()-.5)*.3,P.y-.15+(q()-.5)*.2,P.z-v.f[2]*.7+(q()-.5)*.3,-v.f[0]*(3+q()*4)+(q()-.5)*2,.6+q()*1.2,-v.f[2]*(3+q()*4)+(q()-.5)*2,.5+q()*.4,.22+q()*.2,0,0,.4);
 for(let i=0;i<6;i++)fxAdd(0,i%2?0xcfcfcf:0xffc060,P.x+v.f[0]*1.3+(q()-.5)*.2,P.y-.12+v.f[1]*1.3,P.z+v.f[2]*1.3+(q()-.5)*.2,v.f[0]*(2+q()*3),v.f[1]*2+.3,v.f[2]*(2+q()*3),.3+q()*.25,.16+q()*.14,0,0,.2);
 setTimeout(()=>blip(420,.04,'square'),520);setTimeout(()=>blip(300,.05,'square'),700)}
function ordTick(dt){throwCd=Math.max(0,throwCd-dt);
 for(let i=ORDS.length-1;i>=0;i--){const o=ORDS[i];o.fuse-=dt;
  if(o.rocket&&!o.stuck){const nx=o.x+o.vx*dt,ny=o.y+o.vy*dt,nz=o.z+o.vz*dt;if(ny<=H(nx,nz)+.25||ordBlocked(nx,ny,nz)){o.x=nx;o.y=Math.max(ny,H(nx,nz)+.3);o.z=nz;o.fuse=0}else{o.x=nx;o.y=ny;o.z=nz}}
  else if(!o.stuck){o.vy-=9.4*dt;const nx=o.x+o.vx*dt,ny=o.y+o.vy*dt,nz=o.z+o.vz*dt,gnd=H(nx,nz),spec=BLAST[o.kind];
   if(ny<=gnd+.14){if(spec.stick){o.x=nx;o.y=gnd+.16;o.z=nz;o.stuck=1;o.vx=o.vy=o.vz=0}else{o.x=nx;o.y=gnd+.16;o.z=nz;o.vy=Math.abs(o.vy)*.4;o.vx*=.68;o.vz*=.68;o.b=(o.b||0)+1;if(o.b>3)o.stuck=1}}
   else if(ordBlocked(nx,ny,nz)){if(spec.stick){o.x=nx;o.y=ny;o.z=nz;o.stuck=1;o.vx=o.vy=o.vz=0}else{o.vx*=-.45;o.vz*=-.45;o.b=(o.b||0)+1}}
   else{o.x=nx;o.y=ny;o.z=nz}}
  if(o.mesh)o.mesh.position.set(o.x,o.y,o.z);
  if((o.kind==='c4'||o.kind==='satchel')&&o.fuse<o.fuse0&&(o.beep=(o.beep||0)-dt)<=0){o.beep=o.fuse<1.15?.16:.42;if(Math.hypot(o.x-P.x,o.z-P.z)<30)blip(o.kind==='c4'?860:380,.04,'square')}
  if(o.fuse<=0){const dead=o;ORDS.splice(i,1);boom(dead)}}
 for(const m of flashes){if(!m.userData.on)continue;m.userData.life-=dt;const k=1-Math.max(0,m.userData.life)/.32;m.scale.setScalar(m.userData.rad*(.3+k*.7));m.material.opacity=.8*(1-k);if(m.userData.life<=0){m.userData.on=0;m.visible=false}}
 for(let i=puffs.length-1;i>=0;i--){const p=puffs[i];p.life-=dt;for(let k=0;k<p.n;k++){p.vel[k*3+1]-=12*dt;p.pos[k*3]+=p.vel[k*3]*dt;p.pos[k*3+1]+=p.vel[k*3+1]*dt;p.pos[k*3+2]+=p.vel[k*3+2]*dt}p.g.attributes.position.needsUpdate=true;p.m.material.opacity=Math.max(0,p.life/.5);if(p.life<=0){scene.remove(p.m);p.g.dispose();p.m.material.dispose();puffs.splice(i,1)}}}
function nearestBreach(x,z){const tx=siegeAnchor.x,tz=siegeAnchor.z;let best=null,bd=1e9;
 const consider=(cx,cy,cz)=>{const q=Math.hypot(x-cx,z-cz);if(q>18)return;const score=q+Math.hypot(cx-tx,cz-tz)*.25;if(score<bd){bd=score;best={x:cx,y:cy,z:cz,d:q}}};
 for(const c of ALLC){let ok=false,cx,cz,cy;if(c.piece&&c.owner==='you'&&c.hp>0){ok=true;cx=(c.x0+c.x1)/2;cz=(c.z0+c.z1)/2;cy=(c.y||0)+1.35}else if(c.d&&c.d.t==='door'&&c.d.owner==='you'&&!c.d.open&&c.d.hp>0&&!c.d._gone){ok=true;cx=(c.x0+c.x1)/2;cz=(c.z0+c.z1)/2;cy=(c.y||0)+1.15}if(ok)consider(cx,cy,cz)}
 const tc=siegeAnchor.tc;if(tc&&!tc._gone)consider(tc.x,tc.y+.85,tc.z);return best}
function kitFor(idx,siege,heavy){if(!siege)return Math.random()<.3?{kit:'beancan',nades:1}:{kit:'melee',nades:0};const h=heatStars();const table=['satchel','beancan','satchel','melee','beancan','c4','satchel','rocket','beancan','satchel'];let kit=table[idx%table.length];if(kit==='rocket'&&!(heavy||h>=2))kit='satchel';if(kit==='c4'&&!(heavy||h>=1))kit='satchel';const nades=kit==='melee'?0:kit==='beancan'?(heavy?3:2):kit==='satchel'?(heavy?2:1):1;return{kit,nades}}
function tossFrom(e,tgt,kind){const dx=tgt.x-e.x,dy=tgt.y-(e.y+1.45),dz=tgt.z-e.z,dist=Math.hypot(dx,dz)||1,ft=Math.max(.45,Math.min(1.35,dist/12));spawnOrd({kind,x:e.x,y:e.y+1.5,z:e.z,vx:dx/ft,vy:dy/ft+4.2*ft,vz:dz/ft,fuse:BLAST[kind].fuse,owner:'raid'});e.armUp=.45}
function fireRocketFrom(e,tx,ty,tz){const dx=tx-e.x,dy=ty-(e.y+1.4),dz=tz-e.z,d=Math.hypot(dx,dy,dz)||1,spd=30;spawnOrd({kind:'rocket',rocket:1,x:e.x,y:e.y+1.45,z:e.z,vx:dx/d*spd,vy:dy/d*spd,vz:dz/d*spd,fuse:3.3,owner:'raid'});e.armUp=.4}
function plantFrom(e,tgt,kind){spawnOrd({kind,x:tgt.x,y:tgt.y,z:tgt.z,vx:0,vy:0,vz:0,fuse:BLAST[kind].fuse,stuck:true,owner:'raid'});e.back=Math.min(3.2,BLAST[kind].fuse*.72);e.armUp=.35;if(age>raidChat&&Math.hypot(P.x-tgt.x,P.z-tgt.z)<26){raidChat=age+2.4;say(kind==='c4'?'Timed charge on the wall.':'Satchel on the wall.')}}
function alertCamp(camp,tx,tz){
 if(!camp)return;camp.alertT=24;
 for(const r of camp.raiders){if(!r||r.hp<=0)continue;r.alertX=tx;r.alertZ=tz;r.alertT=24;if(!r.strafeDir)r.strafeDir=(r.idx%2?1:-1)}}
function alertRaiders(src,tx,tz){
 if(src&&src.camp)alertCamp(src.camp,tx,tz);
 for(const r of EN){if(r.hp<=0||r===src)continue;if(Math.hypot(r.x-src.x,r.z-src.z)<48){r.alertX=tx;r.alertZ=tz;r.alertT=18;if(!r.strafeDir)r.strafeDir=(r.idx%2?1:-1)}}}
function findCoverSpot(e,fromX,fromZ){
 let best=null,bs=1e9;const dx=e.x-fromX,dz=e.z-fromZ,d=Math.hypot(dx,dz)||1,ux=dx/d,uz=dz/d;
 for(const o of NEAR){const k=o.userData&&o.userData.k;if(k!=='tree'&&k!=='rock')continue;const ox=o.position.x,oz=o.position.z,cd=Math.hypot(ox-e.x,oz-e.z);if(cd>14||cd<1.2)continue;
  const cx=ox+ux*1.4,cz=oz+uz*1.4;if(H(cx,cz)<.7||blkAt(e,cx,cz))continue;
  if(cd<bs){bs=cd;best=[cx,cz]}}
 return best}
function tacticalMove(e,tx,tz,dp,pref,speed,dt){
 const dx=tx-e.x,dz=tz-e.z,d=dp||Math.hypot(dx,dz)||1,nx=dx/d,nz=dz/d,px=-nz,pz=nx;
 e.stT=(e.stT||0)-dt;if(e.stT<=0){e.stT=1.1+Math.random()*1.4;e.strafeDir=(Math.random()<.5?1:-1)*(e.role==='flanker'?1.35:1)}
 const sd=e.strafeDir||1;
 // If reloading or low HP, seek cover or strafe-back
 if(e.rl>0){e.crouchT=.25;const cov=findCoverSpot(e,tx,tz);if(cov){stepTo(e,cov[0],cov[1],speed*.95,dt);return}stepTo(e,e.x-nx*4+px*sd*5,e.z-nz*4+pz*sd*5,speed*.88,dt);return}
 if(d>pref+3.5){const flk=e.role==='flanker'?sd*.55:sd*.22;stepTo(e,e.x+(nx+px*flk)*6,e.z+(nz+pz*flk)*6,speed*.92,dt)}
 else if(d<pref*.55){stepTo(e,e.x-nx*6+px*sd*3.5,e.z-nz*6+pz*sd*3.5,speed*.85,dt)}
 else{stepTo(e,e.x+px*sd*4.5,e.z+pz*sd*4.5,speed*.78,dt)}}
function driveSiege(e,dt){if(e.flee){const dx=e.x-siegeAnchor.x,dz=e.z-siegeAnchor.z,d=Math.hypot(dx,dz)||1;stepTo(e,e.x+dx/d*24,e.z+dz/d*24,3.4,dt);e.fleeT=(e.fleeT||0)+dt;if(d>80||e.fleeT>16)e.hp=-99;animMan(e,dt);return}
 const live=siegeAnchor.live;const ax=(live?P.x:siegeAnchor.x)+(e.idx%2?1.3:-1.3),az=(live?P.z:siegeAnchor.z)+((e.idx%3)-1)*1.3;const dp=Math.hypot(P.x-e.x,P.z-e.z);const speed=2.35+Math.min(1.1,RT.heat*.16)+(e.heavy?-.15:0);
 e.ordCd=Math.max(0,(e.ordCd||0)-dt);e.back=Math.max(0,(e.back||0)-dt);
 // Tactical field bandage when critically wounded
 if(e.hp<(e.maxHp||80)*.38&&(e.meds||0)>0&&e.back<=0){e.meds--;e.hp=Math.min(e.maxHp||80,e.hp+Math.round(28*DF.hp));e.back=1.4;e.crouchT=1.2}
 if(e.back>0){const dx=e.x-ax,dz=e.z-az,d=Math.hypot(dx,dz)||1;const cov=findCoverSpot(e,ax,az);if(cov)stepTo(e,cov[0],cov[1],3.3,dt);else stepTo(e,e.x+dx/d*10,e.z+dz/d*10,3.3,dt);animMan(e,dt);return}
 const breach=nearestBreach(e.x,e.z);const axd=Math.hypot(ax-e.x,az-e.z);const home={x:ax,z:az,y:H(ax,az)+1.2,d:axd};const tt=(age<(e.tIgn||0))?null:raidTurret(e);const brk=tt?{x:tt.x,y:tt.y+.8,z:tt.z,d:Math.hypot(tt.x-e.x,tt.z-e.z)}:breach;const tgt=brk||home;
 const bashIfStuck=()=>{if((e._mv||0)<.012){e.stuck=(e.stuck||0)+dt;if(e.stuck>.4)bash(e,(e.heavy?22:15)*dt)}else e.stuck=0};
 const away=(tx,tz,sp)=>{const dx=e.x-tx,dz=e.z-tz,l=Math.hypot(dx,dz)||1;stepTo(e,e.x+dx/l*14,e.z+dz/l*14,sp||speed,dt)};
 if(e.nades>0&&e.kit&&e.kit!=='melee'){
  if(e.kit==='rocket'){if(tgt.d>12&&tgt.d<40&&e.ordCd<=0){fireRocketFrom(e,tgt.x,tgt.y,tgt.z);e.nades--;e.ordCd=4.2}else if(tgt.d>=40)go(e,tgt.x,tgt.z,speed,dt);else away(tgt.x,tgt.z);bashIfStuck();animMan(e,dt);return}
  if(e.kit==='beancan'){if(tgt.d>5.2&&tgt.d<17&&e.ordCd<=0){tossFrom(e,tgt,'beancan');e.nades--;e.ordCd=3.1}else if(tgt.d<=5.2)away(tgt.x,tgt.z);else go(e,tgt.x,tgt.z,speed,dt);bashIfStuck();animMan(e,dt);return}
  if(e.kit==='satchel'||e.kit==='c4'){if(brk&&tgt.d<2.9&&e.ordCd<=0){plantFrom(e,tgt,e.kit);e.nades--;e.ordCd=.8}else if(!brk&&dp>5.5&&dp<16&&e.ordCd<=0){tossFrom(e,{x:P.x,y:P.y-.4,z:P.z},e.kit);e.nades--;e.ordCd=3.4}else if(!brk&&dp<=5.5)away(P.x,P.z);else go(e,tgt.x,tgt.z,speed,dt);bashIfStuck();animMan(e,dt);return}}
 if(tt){e.tt=(e.tt||0)+dt;if(e.tt>16){e.tIgn=age+25;e.tt=0}else if(raidTurretAct(e,dt,speed,tt)){bashIfStuck();animMan(e,dt);return}}else e.tt=0;
 {const ft=raidFoe(e,dp);if(ft){e.tgtSettler=ft;if(raidSettler(e,dt,speed,ft)){animMan(e,dt);return}}else e.tgtSettler=null}
 if(e.gun&&gunSiege(e,dt,speed)){animMan(e,dt);return}
 if(dp<1.65&&turretSees(e,{x:P.x,y:P.y-1.7,z:P.z})){hurtP((e.heavy?11:8)*dt,'The raid');if(!(e.sw>0))e.sw=.45;animMan(e,dt);return}
 if(dp<80){
  // Flankers curve around the player's left/right flank when closing distance
  if(e.role==='flanker'&&dp>8&&dp<36){const dx=P.x-e.x,dz=P.z-e.z,fl=(e.idx%2?1:-1)*7.5;go(e,P.x-dz/dp*fl,P.z+dx/dp*fl,speed*1.15,dt)}
  else go(e,P.x,P.z,speed*1.12,dt);
 }else if(axd>2.3)go(e,ax,az,speed,dt);
 bashIfStuck();animMan(e,dt)}
function bash(e,dmg){const tc=siegeAnchor.tc;if(tc&&!tc._gone&&Math.hypot(e.x-tc.x,e.z-tc.z)<2.6){tc.hp-=dmg*1.2;wbPoke(tc);if(!(e.sw>0))e.sw=.4;if(tc.hp<=0){killDev(tc);say('They destroyed the tool cupboard. Privilege is gone.')}return true}let best=null,bd=2.7,door=null,dd=2.35;for(const c of ALLC){if(c.d&&c.d.open)continue;const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2,q=Math.hypot(e.x-cx,e.z-cz);if(c.d&&(isDoor(c.d.t)||c.d.t==='barricade')&&c.d.owner==='you'&&q<dd){dd=q;door=c}else if(c.piece&&c.owner==='you'&&c.hp>0&&q<bd){bd=q;best=c}}const hit=door||best;if(!hit)return false;if(hit.d&&(isDoor(hit.d.t)||hit.d.t==='barricade')){hit.d.hp-=dmg;wbPoke(hit.d);if(hit.d.hp<=0){killDev(hit.d);say(hit.d.t==='barricade'?'They smashed a barricade.':'They smashed the door.')}return true}hit.hp-=dmg;for(const o of ALLC)if(o.mesh&&o.mesh===hit.mesh)o.hp=hit.hp;wallDmg(hit,1);wbPoke(hit);if(hit.hp<=0)smashPiece(hit);return true}
const RGUN={pistol:{dmg:6,rate:.85,range:30,mag:12,acc:.42,len:.3},revolver:{dmg:10,rate:1.25,range:34,mag:6,acc:.48,len:.38},shotgun:{dmg:15,rate:1.5,range:17,mag:6,acc:.62,len:.7},pump:{dmg:17,rate:1.2,range:20,mag:6,acc:.64,len:.74},smg:{dmg:4,rate:.14,range:26,mag:25,acc:.3,len:.45},thompson:{dmg:5.5,rate:.15,range:32,mag:20,acc:.34,len:.52},sar:{dmg:9,rate:.36,range:48,mag:16,acc:.42,len:.76},rifle:{dmg:12,rate:.8,range:62,mag:10,acc:.45,len:.85},ak:{dmg:6.5,rate:.16,range:48,mag:30,acc:.36,len:.8}};
let RGT=0;
function raidNo(){return Math.max(1,Math.floor((days+1)/5))}
function raidTier(N){return{guns:N<2?['pistol','revolver','pistol']:N<3?['pistol','revolver','shotgun','smg','smg']:N<4?['revolver','shotgun','smg','rifle','rifle']:['smg','rifle','ak','ak','shotgun'],h:Math.min(.95,.05+.25*N),v:Math.min(.9,.25*(N-1)),l:Math.max(0,Math.min(.85,.3*(N-2)))}}
// ===== AI COVER: wood barricades =====
// A raider or settler that gets shot with nothing between it and the shooter hides behind a nearby barricade, or sets one down (raiders carry 1-2, settlers spend 20 wood).
function underFire(e,sx,sz,sy){if(!e)return;e.fireT=age+4;e.fx=sx;e.fz=sz;e.fy=sy==null?H(sx,sz):sy}
function coverSpot(e,x,z){return!turretSees({x:e.fx,y:e.fy,z:e.fz},{x,y:H(x,z),z})}
function aiCover(e,dt,speed){
 if(!(e.fireT>age)&&!(e.cvHold>age))return false;
 if(e.k==='raider'&&e.walls===undefined)e.walls=e.heavy?2:1;
 if(e.cvHold>age){
  if(coverSpot(e,e.x,e.z)){e.crouchT=Math.max(e.crouchT||0,.3);const G=e.k==='raider'&&RGUN[e.gun];if(G&&e.rl<=0&&e.mag<G.mag*.6&&e.ammo>0)e.rl=2.2;return true}
  e.cvHold=0;return false}
 const fd=Math.hypot(e.fx-e.x,e.fz-e.z);
 if(fd<5||age<(e.cvCd||0)||coverSpot(e,e.x,e.z))return false;
 let best=null,bd=14;
 for(const d of devs){if(d.t!=='barricade'||d._gone)continue;const dx=d.x-e.fx,dz=d.z-e.fz,l=Math.hypot(dx,dz)||1,sx=d.x+dx/l*1.25,sz=d.z+dz/l*1.25,q=Math.hypot(sx-e.x,sz-e.z);if(q<bd&&Math.hypot(sx-e.fx,sz-e.fz)>5&&coverSpot(e,sx,sz)){bd=q;best={x:sx,z:sz}}}
 if(best){if(bd<.8){e.cvHold=age+3.5+Math.random()*2.5;e.cvCd=age+9;return true}stepTo(e,best.x,best.z,speed*1.2,dt);return true}
 const can=e.k==='settler'?(e.inv&&e.inv.wood>=20):e.walls>0;
 if(!can||!ITEMS.barricade){e.cvCd=age+3;return false}
 let ai=0;for(const d of devs)if(d.t==='barricade'&&d.owner!=='you'&&!d._gone)ai++;
 const ux=(e.fx-e.x)/fd,uz=(e.fz-e.z)/fd,x=e.x+ux*1.5,z=e.z+uz*1.5,y=H(x,z);
 let bad=ai>=14||y<.5||Math.abs(y-e.y)>1.2;
 if(!bad)for(const c of ALLC){if(c.ramp||(c.d&&(c.d.open||c.d._gone)))continue;if(x>c.x0-.9&&x<c.x1+.9&&z>c.z0-.9&&z<c.z1+.9&&(c.found||c.y===undefined||(y>c.y-1&&y<c.y+(c.h||3.05)))){bad=true;break}}
 if(bad){e.cvCd=age+2.5;return false}
 construct(ITEMS.barricade,{x,y,z,rot:Math.atan2(ux,uz)},true);
 const d=devs[devs.length-1];if(!d||d.t!=='barricade'){e.cvCd=age+3;return false}
 d.owner=e.k==='settler'?'npc':'raid';d.ttl=e.k==='settler'?480:240;d.born=age;
 if(e.k==='settler')e.inv.wood-=20;else e.walls--;
 e.cvHold=age+3.5+Math.random()*2.5;e.cvCd=age+9;puffAt(x,y+.7,z);if(Math.hypot(P.x-x,P.z-z)<60)blip(150,.09,'square');
 return true}
function gunSiege(e,dt,speed){const G=RGUN[e.gun];if(!G)return false;e.gcd=Math.max(0,(e.gcd||0)-dt);
 if(e.rl>0){e.rl-=dt;if(e.rl<=0){const k=Math.min(G.mag,e.ammo);e.mag=k;e.ammo-=k}}else if(e.mag<=0){if(e.ammo>0)e.rl=2.2;else return false}
 if(aiCover(e,dt,speed))return true;
 const dx=P.x-e.x,dz=P.z-e.z,dp=Math.hypot(dx,dz);
 if(dp>G.range||dp<2.2||!turretSees({x:e.x,y:e.y,z:e.z},{x:P.x,y:P.y-1.7,z:P.z}))return false;
 const pref=G.range*(e.role==='marksman'?.62:.45);e._mv=0;e.aimT=.35;
 tacticalMove(e,P.x,P.z,dp,pref,speed,dt);
 e.m.rotation.y=Math.atan2(dx,dz);
 if(e.rl>0||e.mag<=0||e.gcd>0)return true;
 e.gcd=G.rate*(.9+Math.random()*.4);e.mag--;e.armUp=.22;
 const oy=e.y+1.4,ty=P.y-.35,L=Math.hypot(dp,ty-oy)||1,acc=Math.max(.1,G.acc*(1-dp/(G.range*1.2)))*(e.accK||1);
 tracer(e.x,oy,e.z,dx/L,(ty-oy)/L,dz/L,L,e.m.rotation.y);
 if(Math.random()<acc)hurtP(G.dmg*(e.dmgK||1),'The raid');
 if(age>RGT){RGT=age+.08;if(dp<60)blip(e.gun==='shotgun'?95:(e.gun==='ak'||e.gun==='rifle')?140:190,.05,'square')}
 return true}
function raidTurret(e){let b=null,bd=70;for(const d of devs){if(d.t!=='turret'||d._gone||d.hp<=0)continue;const q=Math.hypot(d.x-e.x,d.z-e.z);if(q<bd){bd=q;b=d}}return b}
function raidHitTurret(d,dm){d.hp-=dm;wbPoke(d);if(d.hp<=0){killDev(d);say(d.owner==='you'?'A turret of yours was destroyed.':'A settler turret was destroyed.')}}
function raidTurretAct(e,dt,speed,d){const G=RGUN[e.gun],dx=d.x-e.x,dz=d.z-e.z,q=Math.hypot(dx,dz)||1;e.gcd=Math.max(0,(e.gcd||0)-dt);
 if(G){if(e.rl>0){e.rl-=dt;if(e.rl<=0){const k=Math.min(G.mag,e.ammo);e.mag=k;e.ammo-=k}}else if(e.mag<=0&&e.ammo>0)e.rl=2.2}
 if(G&&q<G.range&&q>2.4&&(e.mag>0||e.rl>0)&&turretSees(e,{x:d.x,y:d.y-.2,z:d.z})){e._mv=0;e.aimT=.35;const pref=G.range*.48;tacticalMove(e,d.x,d.z,q,pref,speed,dt);e.m.rotation.y=Math.atan2(dx,dz);
  if(e.rl<=0&&e.mag>0&&e.gcd<=0){e.gcd=G.rate*(.9+Math.random()*.4);e.mag--;e.armUp=.22;const oy=e.y+1.4,ty=d.y+.9,L=Math.hypot(q,ty-oy)||1;tracer(e.x,oy,e.z,dx/L,(ty-oy)/L,dz/L,L,e.m.rotation.y);if(Math.random()<Math.max(.2,G.acc*(1-q/(G.range*1.2)))*(e.accK||1)+.2)raidHitTurret(d,G.dmg*(e.dmgK||1)*1.6);if(age>RGT){RGT=age+.08;if(Math.hypot(P.x-e.x,P.z-e.z)<60)blip(150,.05,'square')}}
  return true}
 if(q<2.2){raidHitTurret(d,(e.heavy?22:15)*dt);if(!(e.sw>0))e.sw=.45;return true}
 go(e,d.x,d.z,speed*1.1,dt);return true}
function raidFoe(e,dp){let b=null,bd=dp>45?75:Math.min(75,dp);for(const n of NP){if(n._dead||n.hp<=0)continue;const q=Math.hypot(n.x-e.x,n.z-e.z);if(q<bd){bd=q;b=n}}return b}
function raidSettler(e,dt,speed,n){const G=RGUN[e.gun],dx=n.x-e.x,dz=n.z-e.z,d=Math.hypot(dx,dz)||1;e.gcd=Math.max(0,(e.gcd||0)-dt);
 if(G){if(e.rl>0){e.rl-=dt;if(e.rl<=0){const k=Math.min(G.mag,e.ammo);e.mag=k;e.ammo-=k}}else if(e.mag<=0&&e.ammo>0)e.rl=2.2}
 const dmgS=dm=>{n.hp-=dm;underFire(n,e.x,e.z,e.y);if(n.hp<=0){killSettler(n);say('Raiders killed a settler.')}else if(age>(n._rs||0)){n._rs=age+8;say('Raiders are attacking a settler!')}};
 if(G&&d<G.range&&d>2.4&&(e.mag>0||e.rl>0)&&turretSees(e,n)){e._mv=0;e.aimT=.35;const pref=G.range*.45;tacticalMove(e,n.x,n.z,d,pref,speed,dt);e.m.rotation.y=Math.atan2(dx,dz);
  if(e.rl<=0&&e.mag>0&&e.gcd<=0){e.gcd=G.rate*(.9+Math.random()*.4);e.mag--;e.armUp=.22;const oy=e.y+1.4,ty=n.y+1.1,L=Math.hypot(d,ty-oy)||1;tracer(e.x,oy,e.z,dx/L,(ty-oy)/L,dz/L,L,e.m.rotation.y);if(Math.random()<Math.max(.15,G.acc*(1-d/(G.range*1.2)))*(e.accK||1)+.15)dmgS(G.dmg*(e.dmgK||1)*1.4);if(age>RGT){RGT=age+.08;if(Math.hypot(P.x-e.x,P.z-e.z)<60)blip(150,.05,'square')}}
  return true}
 if(d<1.7){dmgS((e.heavy?11:8)*dt*1.3);if(!(e.sw>0))e.sw=.45;return true}
 go(e,n.x,n.z,speed*1.1,dt);return true}
function spawnSiege(idx){const sT=NP.filter(n=>n.hp>0&&!n._dead&&Math.hypot(n.x-P.x,n.z-P.z)<170),g3=idx%3,sn=sT.length&&((idx*7)%10)<DF.sTgt?sT[idx%sT.length]:null,anch=sn?{x:sn.x,z:sn.z}:g3===0?{x:P.x,z:P.z}:(siegeAnchor.live?{x:P.x,z:P.z}:siegeAnchor);const q=ringSpawn(anch.x,anch.z,sn?42:36,sn?64:58);if(!q)return null;const N=raidNo(),NT=Math.max(1,N+DF.tier),T=raidTier(NT),heavy=Math.random()<Math.min(.85,(.15+.06*NT)*DF.heavy)+RT.heat*.05;const kit=kitFor(idx,true,heavy);
 const gun=T.guns[(Math.random()*T.guns.length)|0],G=RGUN[gun],ar={h:heavy||Math.random()<T.h,v:heavy||Math.random()<T.v,l:heavy||Math.random()<T.l},hpK=Math.min(1.8,1+DF.grow*(N-1)),maxHp=Math.round(((heavy?84:56)+RT.heat*5)*hpK*DF.hp);
 const role=kit.kit!=='melee'&&kit.nades>0?'breacher':gun==='rifle'?'marksman':idx%2===1?'flanker':'assault';
 const e={k:'raider',role,x:q[0],z:q[1],y:H(q[0],q[1]),hp:maxHp,maxHp,meds:heavy?2:1,heavy,cheat:true,siege:true,idx,pth:[],side:1,strafeDir:idx%2?1:-1,kit:kit.kit,nades:kit.nades,ordCd:.6+Math.random()*1.4,back:0,gun,mag:G.mag,ammo:G.mag*(2+N),gcd:.5+Math.random(),rl:0,accK:Math.min(1.7,(.8+.08*NT)*DF.acc),dmgK:(1+.07*(NT-1))*DF.dmg,armr:ar,armorK:(ar.h?.88:1)*(ar.v?.72:1)*(ar.l?.9:1),m:spawnMan(0x6e2218,true,{heavy,kit:kit.kit,gun,arm:ar})};e.m.userData.k='raider';e.m.userData.a=e;e.m.position.set(e.x,e.y,e.z);things.push(e.m);EN.push(e);return e}
function launchRaid(){if(ch('peace'))return say('Peace is on.');raidSawDark=false;raidWarned=days;siegeAnchor=raidAnchor();const n=raidCount();let made=0;for(let i=0;i<n;i++)if(spawnSiege(i))made++;if(!made){say('Nowhere dry to land a raid.');return}raidPhase='active';raidSpawned=days;say('Raid crew incoming. '+made+' on the ridge.');blip(68,.5,'square')}
function skipToRaid(){const dayNum=days+1;if(dayNum%5!==0)days+=5-dayNum%5;else days+=5;t=.84;raidPhase='calm';raidSawDark=false;raidWarned=-1;raidSpawned=-1;say('Evening before a raid night. Day '+(days+1)+'. Tap the clock to speed the day, or start the crew now.')}
let claimName=(opts&&opts.claimName)||'Blackpine Ridge',slotId=(opts&&opts.slotId)||('slot_'+Date.now()+'_'+Math.random().toString(36).slice(2,6));
function serSlot(s){return s?{id:s.id,n:s.n,dur:s.dur,mag:s.mag,at:s.at,mods:s.mods&&typeof s.mods==='object'?(Array.isArray(s.mods)?[...s.mods]:{...s.mods}):undefined,att:s.att?{...s.att}:undefined}:null}
function snapshot(customName){
 if(customName)claimName=String(customName).trim()||claimName;
 const slots=[];for(let i=0;i<30;i++)slots.push(serSlot(SL[i]));
 const yours=devs.filter(d=>d.owner==='you'&&!d._gone);
 const hr=Math.floor(t*24),mn=Math.floor((t*24-hr)*60),timeStr=String(hr).padStart(2,'0')+':'+String(mn).padStart(2,'0');
 const biome=BIOME_N[biomeAt(P.x,P.z)]||'Pine forest',wxLabel=WXNAME[wx]||'Clear',stars=rateStars(),nowTs=Date.now();
 const meta={
  name:claimName,slotId,ts:nowTs,day:days+1,timeStr,wx:wxLabel,biome,
  rating:rate100(),stars,rank:RANKS[stars]||'Unmarked',heat:heatStars(),
  hp:Math.round(S.health),hunger:Math.round(S.hunger),thirst:Math.round(S.thirst),energy:Math.round(S.energy),warmth:Math.round(S.warmth),
  builds:BLOG.length,devs:yours.length,bpCount:BPK.size,scrap:cnt('scrap'),
  held:SL[sel]&&ITEMS[SL[sel].id]?ITEMS[SL[sel].id].n:'Unarmed',
  coords:`(${P.x|0}, ${P.z|0})`,pace,gather:GATHER,diff:DIFFK,
  hasTC:yours.some(d=>d.t==='tc'),hasBed:!!(CLAIM&&CLAIM.kind==='bed')
 };
 return{
  v:1,slotId,name:claimName,ts:nowTs,meta,gather:GATHER,diff:DIFFK,
  bp:[...BPK],as:ammoSel,S:{...S},t,days,pace,yaw,pitch,p:{x:P.x,y:P.y,z:P.z},
  slots,eq:{head:EQ.head,chest:EQ.chest,legs:EQ.legs,feet:EQ.feet},rt:{...RT},
  claim:CLAIM?{x:CLAIM.x,z:CLAIM.z,kind:CLAIM.kind}:null,blog:BLOG,
  raidWarned,raidSpawned,rs:{...RAIDSZ},wx:{k:wx,t:wxT},
  mk:MK.map(m=>({x:Math.round(m.x*10)/10,z:Math.round(m.z*10)/10,n:m.n,c:m.c})),
  fires:fires.map(f=>({x:f.x,z:f.z,life:f.life})),
  devices:yours.map(d=>({t:d.t,x:d.x,z:d.z,hp:d.hp,water:d.water||0,sl:d.sl.map(serSlot),burn:d.burn||0,ch:d.ch||0,on:d.on!==false,open:!!d.open})),
  wires:wires.filter(w=>w.a.owner==='you'&&w.b.owner==='you').map(w=>[{t:w.a.t,x:w.a.x,z:w.a.z},{t:w.b.t,x:w.b.x,z:w.b.z}])
 }}
function persist(kind){try{const snap=snapshot();const json=JSON.stringify(snap);localStorage.setItem(SAVEK,json);if(window.__bpSaveStore&&typeof window.__bpSaveStore.commit==='function')window.__bpSaveStore.commit(snap,kind||'auto')}catch(e){}}
function loadRaw(){try{if(window.__bpSaveStore&&typeof window.__bpSaveStore.latestRaw==='function'){const r=window.__bpSaveStore.latestRaw();if(r)return r}return JSON.parse(localStorage.getItem(SAVEK)||'null')}catch(e){return null}}
function devAt(rec){return devs.find(q=>q.owner==='you'&&q.t===rec.t&&Math.hypot(q.x-rec.x,q.z-rec.z)<.8)}
function applySave(s){if(!s||s.v!==1||!s.p)return false;
 MK.length=0;if(Array.isArray(s.mk))for(const m of s.mk.slice(0,40))if(m&&isFinite(m.x)&&isFinite(m.z))MK.push({x:+m.x,z:+m.z,n:String(m.n||'Marker').slice(0,24),c:/^#[0-9a-f]{6}$/i.test(m.c)?m.c:MKC[0]});mkN=MK.length;
 if(s.name||(s.meta&&s.meta.name))claimName=s.name||(s.meta&&s.meta.name)||claimName;
 if(s.slotId||(s.meta&&s.meta.slotId))slotId=s.slotId||(s.meta&&s.meta.slotId)||slotId;
 if(s.gather&&+s.gather>0)GATHER=+s.gather;if(s.diff&&DIFFS[s.diff]){DIFFK=s.diff;DF=DIFFS[s.diff];CAMP_RESPAWN=DF.campResp}
 Object.assign(S,s.S||{});if(AMMO[s.as])ammoSel=s.as;
 BPK.clear();if(Array.isArray(s.bp))for(const k of s.bp)BPK.add(k);else for(const k in RCOST)BPK.add(k);
 t=s.t??t;days=s.days||0;if(PACES.includes(s.pace))setPace(s.pace);
 yaw=s.yaw||0;pitch=s.pitch||0;P.x=LP.x=s.p.x;P.z=LP.z=s.p.z;P.y=s.p.y;
 if(Array.isArray(s.slots))for(let i=0;i<30;i++){const x=s.slots[i];SL[i]=x?{...x,mods:x.mods&&typeof x.mods==='object'?(Array.isArray(x.mods)?[...x.mods]:{...x.mods}):undefined,att:x.att?{...x.att}:undefined}:null}
 if(s.eq){EQ.head=s.eq.head||0;EQ.chest=s.eq.chest||0;EQ.legs=s.eq.legs||0;EQ.feet=s.eq.feet||0}
 if(s.rt)Object.assign(RT,s.rt);raidWarned=s.raidWarned??-1;raidSpawned=s.raidSpawned??-1;
 if(s.rs)Object.assign(RAIDSZ,s.rs);if(s.wx&&WXNAME[s.wx.k]){wx=s.wx.k;wxT=s.wx.t||70}
 if(s.claim)placeClaimAt(s.claim.x,s.claim.z,true,s.claim.kind);
 replayBuilds(s.blog);flushTerrain();
 for(const f of s.fires||[])lightFire(f.x,f.z,f.life||120);
 for(const rec of s.devices||[]){const d=devAt(rec);if(!d)continue;if(Array.isArray(rec.sl))d.sl=rec.sl.map(x=>x?{...x,mods:x.mods&&typeof x.mods==='object'?(Array.isArray(x.mods)?[...x.mods]:{...x.mods}):undefined,att:x.att?{...x.att}:undefined}:null);if(rec.hp!=null)d.hp=rec.hp;if(rec.water!=null)d.water=rec.water;d.burn=rec.burn||0;d.ch=rec.ch||0;d.on=rec.on!==false;d.open=!!rec.open}
 for(const pair of s.wires||[]){const A=devAt(pair[0]),B=devAt(pair[1]);if(A&&B&&A!==B)addWire(A,B)}
 vmId=null;syncVM();render();say(claimName+' restored · Day '+(days+1)+' · Rating '+rate100()+'.');return true}
function placeClaimAt(x,z,quiet,kind){const y=Math.max(G(x,z),H(x,z),.2),isBed=kind==='bed';if(claimMesh){scene.remove(claimMesh);claimMesh=null}const b=new MB();
 if(isBed){
  // Full wooden four-poster Respawn Bed with headboard, mattress, rust blanket & pillow
  for(const sx of[-.88,.88])for(const sz of[-.5,.5])b.box(.1,.68,.1,sx,.34,sz,0x4a321c);
  b.box(1.84,.14,1.08,0,.24,0,0x6b4828);b.box(.1,.58,1.08,-.88,.54,0,0x5a3c20);b.box(.08,.38,1.08,.88,.42,0,0x5a3c20);
  b.box(1.68,.16,.96,0,.36,0,0xe6dfd0);b.box(1.12,.18,.98,.24,.38,0,0xb84228);b.box(.34,.12,.68,-.58,.46,0,0xf5f2eb);
 }else{
  b.box(.9,.08,.5,0,.06,0,0x6b4a2a);b.box(.62,.05,.32,0,.12,0,0xc4552a);b.box(.045,.62,.045,-.28,.34,0,0x3a2a1c);b.box(.34,.2,.03,-.28,.68,0,0xc4552a);
 }
 const g=b.build();g.position.set(x,y,z);g.rotation.y=yaw;scene.add(g);claimMesh=g;CLAIM={x,z,kind:isBed?'bed':'bedroll'};
 if(!quiet)say(isBed?'Respawn Bed placed (replaces any previous bed). You will wake here well-rested.':'Bedroll down. This is the claim they raid.')}
function placeClaim(){const x=P.x-Math.sin(yaw)*1.6,z=P.z-Math.cos(yaw)*1.6;if(H(x,z)<.45){say('Too wet for a bedroll.');return false}placeClaimAt(x,z,false,'bedroll');return true}
function placeBed(){const x=P.x-Math.sin(yaw)*1.8,z=P.z-Math.cos(yaw)*1.8;if(H(x,z)<.45){say('Too wet for a bed.');return false}placeClaimAt(x,z,false,'bed');return true}
function wake(){if(!dead)return;dead=false;demise='';$('over').style.display='none';hurtFx=0;const isBed=CLAIM&&CLAIM.kind==='bed';S.health=isBed?85:48;S.hunger=isBed?68:42;S.thirst=isBed?68:48;S.energy=isBed?85:56;S.warmth=isBed?80:62;const x=CLAIM?CLAIM.x+1.2:SP.x,z=CLAIM?CLAIM.z+1.2:SP.z;P.x=LP.x=x;P.z=LP.z=z;P.y=Math.max(G(x,z),H(x,z),-2)+1.7;RT.heat=Math.max(0,RT.heat-.8);say(isBed?'You wake well-rested in your Respawn Bed.':CLAIM?'You wake at the bedroll.':'You wake where you first stood.');ensureStarter();persist()}

function spawnRaider(cheat){let q=null;for(let i=0;i<24&&!q;i++){const t=cheat?landNear(18,30):landNear(50,100);if(t&&(cheat||raidGround(t[0],t[1])))q=t}if(!q)return;
 const heavy=Math.random()<.3,kit=kitFor(0,false,heavy),hasGun=Math.random()<(.38+Math.min(.42,RT.heat*.1)+DF.tier*.06),gun=hasGun?(heavy?'shotgun':Math.random()<.5?'pistol':'revolver'):null,G=gun?RGUN[gun]:null,maxHp=Math.round((heavy?75:55)*DF.hp);
 const e={k:'raider',role:hasGun?'flanker':'assault',x:q[0],z:q[1],y:H(q[0],q[1]),hp:maxHp,maxHp,meds:1,heavy,cheat:!!cheat,siege:false,idx:EN.length,pth:[],side:1,strafeDir:Math.random()<.5?1:-1,kit:kit.kit,nades:kit.nades,ordCd:1,back:0,gun,mag:G?G.mag:0,ammo:G?G.mag*2:0,gcd:.6,rl:0,accK:.88*DF.acc,dmgK:DF.dmg,m:spawnMan(0x8a2222,true,{heavy,kit:kit.kit,gun})};
 e.m.userData.k='raider';e.m.userData.a=e;e.m.position.set(e.x,e.y,e.z);things.push(e.m);EN.push(e)}
function raidTick(dt){const pc=ch('peace');const raidDay=(days+1)%5===0;
 if(!pc&&raidDay&&raidWarned!==days&&t>.7&&t<.95&&dl()>.22){raidWarned=days;raidPhase='warning';const floor=Math.min(4,RT.build*.045+RT.scavenge*.03+RT.blood*.02);if(RT.heat<floor)RT.heat=floor;const tc=playerTC();say('Raid wave '+raidNo()+'. Heat '+heatStars()+'. About '+raidCount()+' are coming for '+(tc?'the tool cupboard.':CLAIM?'the bedroll.':'you.')+'.');blip(92,.35,'sawtooth');setTimeout(()=>blip(64,.45,'square'),260)}
 if(!pc&&raidDay&&raidSpawned!==days&&dl()<.2&&age>=raidTryAt){siegeAnchor=raidAnchor();const n=raidCount();let made=0;for(let i=0;i<n;i++)if(spawnSiege(i))made++;if(made){raidSpawned=days;raidPhase='active';raidSawDark=false;say('They are coming through the trees. '+made+' of them.');blip(58,.55,'square')}else{raidTryAt=age+12;if(raidPhase!=='active')raidPhase='warning';say('The crew is circling. No dry ground close enough yet.')}}
 if(raidPhase==='active'&&dl()<.3)raidSawDark=true;if(raidPhase==='active'&&raidSawDark&&dl()>.45){raidPhase='retreat';raidSawDark=false;say('Dawn. The crew falls back.');for(const q of EN)if(q.siege&&q.hp>0)q.flee=1}
 if((raidPhase==='active'||raidPhase==='retreat')&&raidSpawned===days&&!EN.some(e=>e.siege&&e.hp>0)){const broke=raidPhase==='active';raidPhase='calm';if(broke){RT.blood+=.4;say('The raid is broken.')}}
 if(!pc&&!raidDay&&dl()<.3&&EN.filter(e=>!e.siege&&!e.camp).length<DF.nightMax&&(rt-=dt)<=0){rt=DF.night;spawnRaider(false)}
 campTick(dt,pc);
 for(let i=EN.length-1;i>=0;i--){const e=EN[i];if(pc&&e.hp>0)e.hp=-99;else if(!e.siege&&!e.camp&&dl()>.55&&!e.cheat&&e.hp>0)e.hp=-99;if(e.hp<=0){dropFoe(e);EN.splice(i,1);if(e.hp>-50){const rem=e.camp?e.camp.raiders.filter(q=>q&&q!==e&&q.hp>0).length:0;say(e.warlord?'Raider Warlord eliminated!':e.camp?('Camp raider eliminated ('+rem+' left at '+e.camp.n+').'):e.siege?'Siege raider down.':'Raider eliminated.');lootRaider(e);RT.blood+=e.warlord?2.5:e.camp?1.4:1;bumpHeat(e.warlord?.25:.1)}continue}
  if(e.camp){driveCampRaider(e,dt);continue}
  if(e.siege){if(!e.flee&&Math.hypot(e.x-(siegeAnchor.live?P.x:siegeAnchor.x),e.z-(siegeAnchor.live?P.z:siegeAnchor.z))>420){e.hp=-99;continue}driveSiege(e,dt);continue}
  const d=Math.hypot(P.x-e.x,P.z-e.z);e._mv=0;if(d>160){e.hp=-99;continue}e.ordCd=Math.max(0,(e.ordCd||0)-dt);
  if(e.hp<(e.maxHp||65)*.35&&(e.meds||0)>0){e.meds--;e.hp=Math.min(e.maxHp||65,e.hp+Math.round(22*DF.hp));e.crouchT=.9}
  if(e.nades>0&&e.kit==='beancan'&&d>6&&d<16&&e.ordCd<=0){tossFrom(e,{x:P.x,y:P.y-.2,z:P.z},'beancan');e.nades--;e.ordCd=4.2;animMan(e,dt);continue}
  {const ft=raidFoe(e,d);if(ft&&raidSettler(e,dt,2.65,ft)){animMan(e,dt);continue}}
  if(e.gun&&gunSiege(e,dt,2.6)){animMan(e,dt);continue}
  if(d>1.4)go(e,P.x,P.z,2.65,dt);if(d<1.65&&turretSees(e,{x:P.x,y:P.y-1.7,z:P.z})){hurtP(8*dt,'Raiders');if(!(e.sw>0))e.sw=.45}animMan(e,dt)}}
function turretSees(d,e){const x0=d.x,y0=d.y+1.2,z0=d.z,dx=e.x-x0,dy=(e.y||0)+1.15-y0,dz=e.z-z0,L=Math.hypot(dx,dy,dz);if(L<1.3)return true;
 const m=L-.35;return blockDist(x0,y0,z0,dx/L,dy/L,dz/L,m)>=m}
function turrets(dt){for(const d of devs){if(d.t!=='turret'||d._gone)continue;d.cd=(d.cd||0)-dt;const g=d.m&&d.m.userData.gun;if(!g)continue;let b=null;
 if(d.pw>.45){if((d.seeT=(d.seeT||0)-dt)<=0){d.seeT=.26;d.foe=null;const foes=[];for(const e of EN)if(e.hp>0){if(d.owner==='you')foes.push(e);else{const tc=d.npc&&d.npc.tc;if(tc&&!tc._gone?Math.hypot(e.x-tc.x,e.z-tc.z)<TC_R+8:Math.hypot(e.x-d.x,e.z-d.z)<TUR_R)foes.push(e)}}for(const w of WV)if(w.hp>0)foes.push(w);
  if(d.owner==='you'){for(const n of NP)if(n.hp>0&&n.aggro>0)foes.push(n)}
  else if(!dead&&!ch('peace')&&NP.some(n=>n.hp>0&&n.aggro>0&&(Math.hypot(n.x-d.x,n.z-d.z)<26||(n.tc&&!n.tc._gone&&Math.hypot(n.tc.x-d.x,n.tc.z-d.z)<TC_R+6))))foes.push({x:P.x,z:P.z,y:P.y-1.1,hp:999,_ply:1,heavy:false,k:'you'});
  const fk=q=>Math.hypot(q.x-d.x,q.z-d.z)-(q.k==='raider'?(q.role==='breacher'?16:10):0);foes.sort((a,c)=>fk(a)-fk(c));
  for(let i=0;i<foes.length&&i<8;i++){if(Math.hypot(foes[i].x-d.x,foes[i].z-d.z)>TUR_R)break;if(turretSees(d,foes[i])){d.foe=foes[i];break}}}
  const f=d.foe;if(f&&(f._ply||f.hp>0)&&Math.hypot(f.x-d.x,f.z-d.z)<TUR_R)b=f}
 if(b){const targetYaw=Math.atan2(b.x-d.x,b.z-d.z)-(d.m.rotation.y||0);g.rotation.y=targetYaw;if(d.cd<=0){d.cd=.68;if(b._ply)hurtP(9,'A turret');else if(b.k==='settler'){b.hp-=b.heavy?12:20;if(b.hp<=0)killSettler(b)}else if(b.k==='wolf'){b.hp-=2;if(b.hp<=0)killAnimal(b,false)}else b.hp-=22*foeMit(b.heavy?.64:1,1);poolTracer(d.x,d.y+1.25,d.z,b.x,(b.y||0)+1.15,b.z,0xffd24a,90)}}
 else if(d.pw>.45){g.rotation.y=Math.sin(age*.85+d.x)*.65}}}
function loot(){
 const r=Math.random,L={scrap:2+(r()*4|0)};
 if(r()<.45)L.gears=1+(r()*2|0);
 if(r()<.28)L.blade=1+(r()*2|0);
 if(r()<.28)L.rope=1+(r()*2|0);
 if(r()<.26)L.sheet=1;
 if(r()<.22)L.propane=1;
 if(r()<.22)L.tarp=1;
 if(r()<.22)L.sewing_kit=1+(r()*2|0);
 if(r()<.20)L.pipe=1;
 if(r()<.16)L.spring=1;
 if(r()<.16)L.road_sign=1;
 if(r()<.14)L.fuse=1;
 return L;
}
function barrelLoot(kind){
 const r=Math.random,L={},add=(id,n)=>{if(n>0)L[id]=(L[id]||0)+n};
 // Fuel & Oil barrels ONLY spawn Low Grade Fuel and Crude Oil (no scrap or components)
 if(kind==='red'){
  add('fuel',4+(r()*5|0));
  add('crude',2+(r()*4|0));
  return L;
 }
 if(kind==='oil'){
  add('crude',6+(r()*6|0));
  add('fuel',3+(r()*4|0));
  return L;
 }
 // All non-fuel barrels guarantee 2-6 Scrap (100% drop rate)
 L.scrap=2+(r()*5|0);
 // Tier 1 Components (strictly 15%-16% drop rate each): Metal Blades, Rope, Metal Sheets
 if(r()<.155)add('blade',1+(r()<.35?1:0));
 if(r()<.155)add('rope',1+(r()<.35?1:0));
 if(r()<.155)add('sheet',1+(r()<.30?1:0));
 // Tier 2 Components: Empty Propane Tanks, Sewing Kits, Tarps
 const t2=kind==='blue'?.16:.12;
 if(r()<t2)add('propane',1);
 if(r()<t2)add('sewing_kit',1+(r()<.4?1:0));
 if(r()<t2)add('tarp',1+(r()<.35?1:0));
 // Tier 3 Components & Items: Electric Fuse, Gears, Metal Pipes, Metal Springs, Road Signs, Semi-Automatic Body
 const t3=kind==='blue'?.14:.07;
 if(r()<t3)add('fuse',1);
 if(r()<t3*1.15)add('gears',1+(r()<.35?1:0));
 if(r()<t3*1.15)add('pipe',1+(r()<.35?1:0));
 if(r()<t3*.9)add('spring',1);
 if(r()<t3)add('road_sign',1+(r()<.3?1:0));
 if(r()<(kind==='blue'?.10:.05))add('semi_body',1);
 // Ensure at least one component or medical item accompanies the guaranteed 2-6 Scrap without altering Tier 1 15-16% rates
 if(Object.keys(L).length===1){
  if(kind==='white'){
   const pick=['sewing_kit','tarp','propane','bandage','medkit'][(r()*5)|0];
   add(pick,1);
  }else if(kind==='blue'){
   const pick=['fuse','gears','pipe','spring','road_sign','semi_body','propane','sewing_kit','tarp'][(r()*9)|0];
   add(pick,1);
  }else{
   const pick=['propane','sewing_kit','tarp','gears','pipe','spring','road_sign','fuse'][(r()*8)|0];
   add(pick,1);
  }
 }
 return L;
}
const gJb=new T.CylinderGeometry(.34,.34,.9,8),gJc=new T.BoxGeometry(.85,.6,.85),gJs=new T.BoxGeometry(1.3,.08,.8),mJb=LMat({color:0x7a4a2a,flatShading:true}),mJc=LMat({color:0x6b5a3a,flatShading:true}),mJs=LMat({color:0x8a8f94,flatShading:true});
function mkJunk(){const g=new T.Group(),base=new T.Mesh(gRock,mRock2),a=new T.Mesh(gJb,mJb),b=new T.Mesh(gJc,mJc),c=new T.Mesh(gJs,mJs),d=new T.Mesh(gJb,mJb);
 base.scale.set(2.35,.52,2.15);base.position.set(-.04,-.06,.08);
 a.position.set(.38,.38,.08);b.position.set(-.42,.24,-.18);b.rotation.y=.5;c.position.set(0,.68,.18);c.rotation.set(.25,.4,.15);d.position.set(-.08,.24,.64);d.rotation.z=1.42;d.scale.setScalar(.8);g.add(base,a,b,c,d);g.rotation.y=Math.random()*6;g.userData.uses=2;g.userData.rad=.82;return g}
__mark('props');
function clearNodes(x,z,r){for(let i=things.length-1;i>=0;i--){const o=things[i],k=o.userData.k;if((k==='tree'||k==='rock'||k==='bush'||k==='hemp'||k==='junk')&&Math.hypot(o.position.x-x,o.position.z-z)<r){scene.remove(o);things.splice(i,1)}}
 for(let i=RN.length-1;i>=0;i--){const n=RN[i];if(Math.hypot(n.o.position.x-x,n.o.position.z-z)<r){scene.remove(n.o);if(n.stump)scene.remove(n.stump);RN.splice(i,1)}}}
function clearPlan(p){if(!p||p.cx==null)return;const x0=(p.cx-1)*C-1.4,x1=(p.cx+p.w)*C+1.4,z0=(p.cz-1)*C-1.4,z1=(p.cz+p.d)*C+1.4;for(let i=things.length-1;i>=0;i--){const o=things[i];if(!o.userData||o.userData.farm)continue;const k=o.userData.k;if(k!=='tree'&&k!=='rock'&&k!=='bush'&&k!=='hemp'&&k!=='junk')continue;const x=o.position.x,z=o.position.z;if(x>x0&&x<x1&&z>z0&&z<z1){scene.remove(o);things.splice(i,1)}}}
function settlerCombat(n,foe,isPlayer,step,fd){
 const W=n.wp,tx=foe.x,tz=foe.z,ty=isPlayer?P.y-.35:(foe.y||0)+(foe.k==='wolf'?.55:1.1),d=Math.hypot(tx-n.x,tz-n.z)||1;
 // Self-heal with bandage if wounded (<38% HP)
 n.healCd=Math.max(0,(n.healCd||0)-step);
 if(n.hp<n.maxHp*.38&&n.healCd<=0){n.hp=Math.min(n.maxHp,n.hp+28);n.healCd=14;n.crouchT=.9;if(n.tc&&!n.tc._gone&&d<16){go(n,n.tc.x,n.tc.z,3.8,step);return}}
 if(W&&W.rng){
  if(aiCover(n,step,3.7))return;
  const pref=W.rng*.58,los=turretSees({x:n.x,y:n.y,z:n.z},{x:tx,y:ty-1,z:tz});
  if(d>W.rng*.92||!los){go(n,tx,tz,3.7,step);return}
  // Tactical lateral strafe & standoff management
  const nx=(tx-n.x)/d,nz=(tz-n.z)/d,px=-nz,pz=nx;
  n.stT=(n.stT||0)-step;if(n.stT<=0){n.stT=1.2+Math.random()*1.2;n.side=-(n.side||1)}
  const sd=n.side||1;
  if(d>pref+3)stepTo(n,n.x+(nx+px*sd*.3)*5,n.z+(nz+pz*sd*.3)*5,3.4,step);
  else if(d<pref*.5)stepTo(n,n.x-nx*5+px*sd*3,n.z-nz*5+pz*sd*3,3.3,step);
  else stepTo(n,n.x+px*sd*3.8,n.z+pz*sd*3.8,3.1,step);
  n.m.rotation.y=Math.atan2(tx-n.x,tz-n.z);n.aimT=.35;
  n.fcd=(n.fcd||0)-step;
  if(n.fcd<=0){
   n.fcd=W.cd*(.92+Math.random()*.2);n.armUp=.22;
   if(isPlayer){if(Math.random()<.58)hurtP(W.dmg*.65,'A settler')}
   else if(foe.k==='wolf'){foe.hp-=Math.max(1.5,W.dmg*.18);if(foe.hp<=0)killAnimal(foe,fd<45)}
   else{foe.hp-=W.dmg*foeMit(foe.heavy?.75:1,foe.armorK||1);underFire(foe,n.x,n.z,n.y)}
   if(fd<130){poolTracer(n.x,n.y+1.35,n.z,tx,ty,tz,0xffd24a,70);if(fd<65&&age>RGT){RGT=age+.08;blip(W.id==='shotgun'?98:W.id==='rifle'||W.id==='ak'?145:195,.045,'square')}}
  }
  return}
 // Melee combat with equipped melee weapon or fists
 if(d>1.55)go(n,tx,tz,3.7,step);
 else{
  n.m.rotation.y=Math.atan2(tx-n.x,tz-n.z);
  const melDmg=W&&W.mel?W.mel:11;
  if(isPlayer)hurtP(melDmg*.65*step,'A settler');
  else if(foe.k==='wolf'){foe.hp-=melDmg*.22*step;if(foe.hp<=0)killAnimal(foe,fd<45)}
  else foe.hp-=melDmg*step*foeMit(foe.heavy?.6:1,foe.armorK||1);
  if(!(n.sw>0))n.sw=.45}}
function npcTick(dt){for(const d of devs)if(d.ac&&age>d.ac&&!NP.some(n=>Math.hypot(n.x-d.x,n.z-d.z)<2.5)&&Math.hypot(P.x-d.x,P.z-d.z)>2.5){d.open=false;d.ac=0}
 for(let i=NP.length-1;i>=0;i--){const n=NP[i];if(n.hp<=0){killSettler(n);continue}
  // Passive health regeneration when out of combat near camp
  if(n.hp<n.maxHp&&!(n.aggro>0))n.hp=Math.min(n.maxHp,n.hp+dt*.45);
  const fd=Math.hypot(n.x-P.x,n.z-P.z);if(!n.told&&fd<36){n.told=1;say(n.home?'That settler roams for ore and monuments. The turrets only shoot while the windmill keeps the battery up.':'A settler is still raising the camp.')}n.cd-=dt;n._mv=0;n._acc=(n._acc||0)+dt;let step=dt;const far=fd>190&&!(n.aggro>0);if(far){n.m.visible=false;if(n._acc<0.22)continue;step=n._acc;n._acc=0}else{n.m.visible=fd<240;n._acc=0}
  if(!ch('peace')&&n.aggro>0){n.aggro-=dt;if(fd>52)n.aggro=0;else{settlerCombat(n,P,true,step,fd);animMan(n,step);continue}}
  if(!settlerArmed(n)){
   // Unarmed settlers run home from camp raiders and back out of any live camp's range
   const hm=n.home||n.lot||{x:n.hx,z:n.hz};let th=null,td=36;
   for(const r of EN){if(r.hp<=0||!r.camp)continue;const q=Math.hypot(r.x-n.x,r.z-n.z);if(q<td){td=q;th=r}}
   const cd=th?null:campDanger(n,n.x,n.z);
   if(th&&Math.hypot(n.x-hm.x,n.z-hm.z)>6){n.job=null;go(n,hm.x+2.4,hm.z+3.2,4.3,step);animMan(n,step);continue}
   if(cd){n.job=null;n.pT=null;const dx=n.x-cd.x,dz=n.z-cd.z,l=Math.hypot(dx,dz)||1;stepTo(n,n.x+dx/l*14,n.z+dz/l*14,4,step);animMan(n,step);continue}}
  {const W=n.wp;let rr=null,rd=Math.max(18,W&&W.rng?W.rng:0);
   for(const r of EN){if(r.k!=='raider'||r.hp<=0||(r.camp&&!settlerArmed(n)&&Math.hypot(r.x-n.x,r.z-n.z)>8))continue;const q=Math.hypot(r.x-n.x,r.z-n.z);if(q<rd){rd=q;rr=r}}
   if(!rr){for(const w of WV){if(w.hp<=0)continue;const q=Math.hypot(w.x-n.x,w.z-n.z);if(q<Math.min(rd,20)){rd=q;rr=w}}}
   if(rr){settlerCombat(n,rr,false,step,fd);animMan(n,step);continue}}
  npcAI(n,step);animMan(n,step)}}
// ===== WILDLIFE =====
const DE=[],WV=[];let wrt=25,drt=10;
const furDeer=LMat({color:0x8d6b3c,flatShading:true}),furDeerD=LMat({color:0x6a4e2c,flatShading:true}),bellyDeer=LMat({color:0xd2b48a,flatShading:true}),antlerM=LMat({color:0xe4d7b8,flatShading:true}),furWolf=LMat({color:0x6d7278,flatShading:true}),furWolfD=LMat({color:0x3c4146,flatShading:true}),bellyWolf=LMat({color:0x9a9590,flatShading:true}),eyeW=LMat({color:0xe8c56b,flatShading:true}),eyeD=LMat({color:0x241810,flatShading:true}),hoofM=LMat({color:0x2a2420,flatShading:true});
function mkAnimal(k,x,z){const wolf=k==='wolf',g=new T.Group(),sc=wolf?.92:1.18,fur=wolf?furWolf:furDeer,dark=wolf?furWolfD:furDeerD,belly=wolf?bellyWolf:bellyDeer,rig=new T.Group();
 const box=(w,h,d,px,py,pz,mt,parent)=>{const q=new T.Mesh(new T.BoxGeometry(w,h,d),mt||fur);q.position.set(px,py,pz);(parent||rig).add(q);return q};
 const leg=(px,py,pz)=>{const piv=new T.Group();piv.position.set(px,py,pz);rig.add(piv);box(.1,.26,.1,0,-.16,0,dark,piv);box(.08,.24,.08,0,-.38,0,fur,piv);box(.1,.07,.12,0,-.52,.03,hoofM,piv);return piv};
 box(wolf?.46:.4,wolf?.34:.32,wolf?1.15:.98,0,wolf?.62:.78,0);box(wolf?.38:.32,.12,wolf?.72:.62,0,wolf?.46:.62,.02,belly);
 const hip=wolf?.62:.78,legs=[leg(-.16,hip,.34),leg(.16,hip,.34),leg(-.16,hip,-.34),leg(.16,hip,-.34)];
 const neck=new T.Group();neck.position.set(0,wolf?.78:.96,wolf?.48:.4);neck.rotation.x=wolf?-.35:-.65;rig.add(neck);box(.2,.28,.22,0,.12,.06,fur,neck);
 const headG=new T.Group();headG.position.set(0,.24,.1);neck.add(headG);box(wolf?.28:.22,wolf?.22:.2,wolf?.4:.32,0,.06,.1,fur,headG);
 if(wolf){box(.16,.12,.26,0,.02,.32,dark,headG);box(.05,.12,.04,-.09,.2,.04,dark,headG);box(.05,.12,.04,.09,.2,.04,dark,headG);box(.045,.045,.04,-.08,.08,.28,eyeW,headG);box(.045,.045,.04,.08,.08,.28,eyeW,headG)}
 else{box(.16,.16,.2,0,.08,.18,fur,headG);box(.07,.16,.03,-.1,.16,.02,dark,headG);box(.07,.16,.03,.1,.16,.02,dark,headG);box(.04,.04,.04,-.06,.08,.24,eyeD,headG);box(.04,.04,.04,.06,.08,.24,eyeD,headG);box(.02,.2,.02,-.06,.24,0,antlerM,headG);box(.02,.2,.02,.06,.24,0,antlerM,headG);box(.16,.02,.02,-.14,.32,0,antlerM,headG);box(.16,.02,.02,.14,.32,0,antlerM,headG);box(.02,.08,.02,-.2,.36,0,antlerM,headG);box(.02,.08,.02,.2,.36,0,antlerM,headG)}
 const tail=new T.Group();tail.position.set(0,wolf?.72:.88,wolf?-.58:-.48);rig.add(tail);box(wolf?.1:.07,wolf?.1:.08,wolf?.46:.18,0,.02,wolf?-.18:-.08,dark,tail);
 if(typeof mergeStatic==='function'){for(const p of[rig,...legs,neck,headG,tail])mergeStatic(p)}rig.scale.setScalar(sc);g.add(rig);
 const a={k,x,z,y:H(x,z),hp:wolf?5:3,m:g,tx:x,tz:z,wt:0,cd:0,flee:0,aggro:0,legs,tail,headG,rig,ph:Math.random()*6};g.userData.k=k;g.userData.a=a;g.position.set(x,a.y,z);scene.add(g);things.push(g);(wolf?WV:DE).push(a);return a}
function animBeast(a,dt){const moving=(a._mv||0)>.002;a.ph=(a.ph||0)+(moving?9:1.8)*dt;const sw=Math.sin(a.ph)*(moving?.8:.05);
 if(a.legs){a.legs[0].rotation.x=sw;a.legs[1].rotation.x=-sw;a.legs[2].rotation.x=-sw;a.legs[3].rotation.x=sw}
 if(a.rig)a.rig.position.y=Math.abs(Math.cos(a.ph))*(moving?.05:.012);
 if(a.tail){a.tail.rotation.x=(a.k==='wolf'?-.45:0)+Math.sin(a.ph*(a.k==='wolf'?2.2:1))*.28;a.tail.rotation.z=Math.sin(a.ph*(a.k==='wolf'?1.5:.7))*(a.k==='wolf'?.35:.1)}
 if(a.headG)a.headG.rotation.y=Math.sin(a.ph*.35+a.x)*.1}
function killAnimal(a,drop){dropFoe(a);const arr=a.k==='wolf'?WV:DE,i=arr.indexOf(a);if(i>=0)arr.splice(i,1);if(drop){const n=a.k==='deer'?3:2,nl=a.k==='deer'?3:2;dropFood(a.x,a.z,'meat',n);dropFood(a.x+.35,a.z+.25,'leather',nl);RT.hunt+=a.k==='wolf'?1.2:.55;bumpHeat(a.k==='wolf'?.2:.05);say(a.k==='deer'?'The deer dropped meat and leather. Pick them up.':'The wolf dropped meat and leather. Pick them up.')}}
function hit(o,M){const a=o.userData.a;if(!a||a.hp<=0)return;S.energy=Math.max(0,S.energy-2);const h=M||tool('hatchet');if(h)wear();
 if(a.k==='raider'||a.k==='settler'){a.hp-=(M?M.dmg:h?20*CMUL[toolTier()]:8)*(a.k==='raider'?foeMit(a.heavy?.6:1,a.armorK||1):(a.heavy?.6:1)*(a.armorK||1));if(a.k==='settler'){const was=a.aggro>0;aggroSettler(a,32);if(a.hp<=0){killSettler(a);return}if(!was)say('You hit the settler. They come for you.');return}if(a.hp>0)say('You hit the raider.');return}
 a.hp-=M?M.dmg/10:h?2*CMUL[toolTier()]:1;if(a.hp<=0)return killAnimal(a,true);if(a.k==='deer'){a.flee=6;say('The deer bolts!')}else{a.aggro=12;say('The wolf snarls!')}}
function stepBeast(a,tx,tz,sp,dt){const px=a.x,pz=a.z,dx=tx-a.x,dz=tz-a.z,d=Math.hypot(dx,dz);if(d>.15){const s=Math.min(d,sp*dt);a.x+=dx/d*s;a.z+=dz/d*s;a.m.rotation.y=Math.atan2(dx,dz)}
 if(H(a.x,a.z)<.3||Math.abs(a.x)>B||Math.abs(a.z)>B){a.x=px;a.z=pz;a.tx=a.x;a.tz=a.z;a.wt=0}col(a);a.y+=(G(a.x,a.z,a.y)-a.y)*Math.min(1,dt*8);a._mv=(a._mv||0)+Math.hypot(a.x-px,a.z-pz);a.m.position.set(a.x,a.y,a.z);return d}
function wander(a,sp,dt){a.wt-=dt;if(a.wt<=0){a.wt=3+Math.random()*5;const g=Math.random()*6.283;a.tx=a.x+Math.cos(g)*10;a.tz=a.z+Math.sin(g)*10}if(Math.hypot(a.tx-a.x,a.tz-a.z)>.5)stepBeast(a,a.tx,a.tz,sp,dt)}
function scareDeerNear(x,z,rad){
 for(const a of DE){if(a.hp<=0)continue;if(Math.hypot(a.x-x,a.z-z)<rad){a.flee=Math.max(a.flee||0,6);a.fleeX=x;a.fleeZ=z}}}
function alertWolfPack(src){
 for(const w of WV){if(w.hp<=0||w===src)continue;if(Math.hypot(w.x-src.x,w.z-src.z)<34)w.aggro=Math.max(w.aggro||0,12)}}
function animalTick(dt){const pc=ch('peace');
 if(DE.length<22&&(drt-=dt)<=0){drt=25;const q=landNear(40,120);if(q)mkAnimal('deer',q[0],q[1])}
 if(!pc&&WV.length<5&&(wrt-=dt)<=0){wrt=45;const q=landNear(60,130);if(q)mkAnimal('wolf',q[0],q[1])}
 for(let i=DE.length-1;i>=0;i--){const a=DE[i];a._mv=0;const d=Math.hypot(P.x-a.x,P.z-a.z);if(a.hp<=0||d>260){killAnimal(a,a.hp<=0&&d<=80);continue}
  // Check nearby wolf predators
  let predX=P.x,predZ=P.z,scared=d<14;
  for(const w of WV){if(w.hp>0&&Math.hypot(w.x-a.x,w.z-a.z)<18){scared=true;predX=w.x;predZ=w.z;break}}
  if(scared){a.flee=Math.max(a.flee||0,3.5);a.fleeX=predX;a.fleeZ=predZ}
  if(a.flee>0){
   a.flee=Math.max(0,a.flee-dt);
   // Herd panic propagation to nearby deer
   for(const o of DE)if(o!==a&&o.hp>0&&!(o.flee>0)&&Math.hypot(o.x-a.x,o.z-a.z)<14){o.flee=2.8;o.fleeX=a.fleeX||P.x;o.fleeZ=a.fleeZ||P.z}
   const fx=a.fleeX!=null?a.fleeX:P.x,fz=a.fleeZ!=null?a.fleeZ:P.z,dx=a.x-fx,dz=a.z-fz,l=Math.hypot(dx,dz)||1;
   let tx=a.x+dx/l*12,tz=a.z+dz/l*12;if(H(tx,tz)<.45){tx=a.x-dz/l*12;tz=a.z+dx/l*12;if(H(tx,tz)<.45){tx=a.x+dz/l*12;tz=a.z-dx/l*12}}
   stepBeast(a,tx,tz,5.6,dt);
  }else wander(a,1.3,dt);
  animBeast(a,dt)}
 for(let i=WV.length-1;i>=0;i--){const a=WV[i];a._mv=0;const d=Math.hypot(P.x-a.x,P.z-a.z);if(a.hp<=0||pc||d>220){killAnimal(a,a.hp<=0&&!pc&&d<=80);continue}
  a.cd=Math.max(0,a.cd-dt);a.aggro=Math.max(0,a.aggro-dt);
  const detectR=(dl()<.4?32:17);
  if(d<detectR||a.aggro>0){
   if(a.aggro<=0){a.aggro=8;alertWolfPack(a)}
   if(d>1.55){
    // Pack flanking: offset approach angle slightly per wolf so pack encircles prey
    const dx=P.x-a.x,dz=P.z-a.z,l=Math.hypot(dx,dz)||1,flk=d>4.5?((i%2?1:-1)*2.4):0;
    const bx=a.x,bz=a.z;stepBeast(a,P.x-dz/l*flk,P.z+dx/l*flk,4.35,dt);
    if(Math.hypot(a.x-bx,a.z-bz)<.01)stepBeast(a,a.x-dz/l*4,a.z+dx/l*4,3.5,dt);
   }
   const nd=Math.hypot(P.x-a.x,P.z-a.z);if(nd<2.45&&a.cd<=0){a.cd=1.02;hurtP(10,'A wolf')}
  }else{
   // Hunt nearby deer if un-aggroed on player
   let prey=null,pd=22;for(const dr of DE){if(dr.hp>0){const q=Math.hypot(dr.x-a.x,dr.z-a.z);if(q<pd){pd=q;prey=dr}}}
   if(prey){stepBeast(a,prey.x,prey.z,4.1,dt);if(pd<1.8&&a.cd<=0){a.cd=1.1;prey.hp-=1.5;prey.flee=6;prey.fleeX=a.x;prey.fleeZ=a.z;if(prey.hp<=0)killAnimal(prey,d<55)}}
   else wander(a,1.25,dt);
  }
  animBeast(a,dt)}}
for(let i=0;i<22;i++){const q=landNear(25,200,80);if(q)mkAnimal('deer',q[0],q[1])}
for(let i=0;i<4;i++){const q=landNear(60,200,80);if(q)mkAnimal('wolf',q[0],q[1])}
__mark('wildlife');

// ===== MONUMENTS + LOOT CRATES =====
const MONS=[],RCAMPS=[],CR=[];let mi=0,rci=0;
const CRT={1:{n:'Supply Crate',cd:180},2:{n:'Military Crate',cd:240},3:{n:'Elite Crate',cd:360},4:{n:'Raider War-Chest',cd:180}};
function lootTable(tier){const r=Math.random,ri=(a,b)=>a+(r()*(b-a+1)|0),L=[],add=(id,a,b,p)=>{if(r()<(p===undefined?1:p))L.push([id,ri(a,b||a)])},pk=a=>a[r()*a.length|0];
 // Tier 1-3 crates: components, scrap, armor, meds, tools. Military (2) can hold a pistol or shotgun, Elite (3) an SMG or shotgun. No explosives or attachments.
 if(tier===1){
  add('scrap',6,14,.95);add('blade',1,3,.5);add('rope',1,3,.5);add('sheet',1,2,.45);
  add('propane',1,2,.35);add('sewing_kit',1,3,.4);add('tarp',1,2,.38);
  add('pipe',1,2,.3);add('road_sign',1,2,.25);add('fuse',1,1,.22);add('semi_body',1,1,.14);
  if(r()<.3)add(pk(['spear','club','knife','hatchet','pickaxe']),1);
  add('gears',1,3,.45);add('bandage',1,3,.45);add('ammo',10,24,.5);add('rations',1,2,.38);
  add('circuit',1,2,.25);add('leather',2,5,.38);add('fuel',4,9,.45);add('metal',12,28,.45);
 }else if(tier===2){
  add('scrap',16,32,.95);add('propane',1,3,.5);add('sewing_kit',2,4,.55);add('tarp',1,3,.48);
  add('fuse',1,2,.45);add('road_sign',2,4,.52);add('pipe',1,3,.58);add('spring',1,3,.5);
  add('sheet',2,3,.5);add('blade',2,4,.42);add('tech',1,2,.42);add('semi_body',1,2,.38);
  add('gears',3,7,.75);add('circuit',1,3,.7);add('ammo',20,45,.65);
  add('medkit',1,2,.55);add('bandage',2,4,.6);add('rations',1,3,.6);
  add('fuel',8,16,.65);add('crude',5,12,.48);add('leather',3,7,.45);add('metal',25,55,.6);
  add('cctv',1,2,.35);add('targeting_computer',1,1,.28);
  if(r()<.45)add(pk(['machete','knife','spear','club','hatchet','pickaxe']),1);
  if(r()<.3)add(pk(['metal_hatchet','metal_pickaxe']),1);
  if(r()<.55)add(pk(['helmet','vest','legs']),1);
  add(pk(['pistol','shotgun']),1,1,.55);
 }else if(tier===3){
  // Elite Crate: High-tier components, armor, tech, scrap & medical supplies (plus an SMG or shotgun at random)
  add('scrap',30,65,1);add('fuse',1,3,.75);add('road_sign',2,5,.75);
  add('pipe',2,5,.88);add('spring',2,5,.88);add('sheet',2,5,.82);
  add('sewing_kit',2,5,.72);add('propane',2,4,.65);add('tarp',2,4,.65);
  add('tech',2,5,.85);add('semi_body',1,3,.7);add('smg_body',1,3,.65);
  add('gears',8,15,1);add('circuit',3,7,.9);add('targeting_computer',1,2,.65);add('cctv',1,2,.65);
  add('medkit',1,3,.85);add('rations',2,4,.8);add('fuel',12,28,.7);add('metal',40,85,.85);
  add('ammo',40,80,.75);add('ammo_hp',12,28,.45);add('ammo_ap',10,24,.45);add('ammo_inc',10,24,.4);
  for(const a of['helmet','vest','legs'])add(a,1,1,.65);
  add(pk(['smg','shotgun']),1,1,.7);
  if(r()<.35)add(pk(['metal_hatchet','metal_pickaxe']),1);
  if(r()<.22)add(pk(['chainsaw','jackhammer']),1);
 }else{
  // Tier 4: Raider War-Chest — Exclusive home of Guns, Explosives & Weapon Attachments!
  add(pk(['ak','ak','rifle','launcher','pump','thompson','sar','smg']),1,1,1);
  add(pk(['ak','rifle','thompson','smg','pump','sar','pistol','revolver','shotgun']),1,1,.9);
  add(pk(['c4','satchel','rocket','beancan','explosives']),1,3,1);
  add('c4',1,2,.8);add('satchel',2,4,.85);add('rocket',2,5,.8);add('beancan',2,5,.75);add('explosives',4,10,.9);
  add(pk(['scope8x','holo','silencer','muzzle_boost','muzzle_brake','laser','flashlight','ext_mag']),1,1,1);
  add(pk(['scope8x','holo','silencer','muzzle_boost','muzzle_brake','laser','flashlight','ext_mag']),1,1,.85);
  add('scrap',45,90,1);
  add('ammo',60,140,.9);add('ammo_ap',20,45,.8);add('ammo_inc',20,45,.75);add('ammo_hp',20,45,.75);
 }
 return L}
function crateLoot(tier){let P=[];for(let i=0;i<10&&!P.length;i++)P=lootTable(tier);for(let i=P.length-1;i>0;i--){const j=Math.random()*(i+1)|0,t=P[i];P[i]=P[j];P[j]=t}
 if(tier===4){
  const GUN_IDS=['ak','rifle','launcher','pump','thompson','sar','smg','pistol','revolver','shotgun'];
  const EXP_IDS=['c4','satchel','rocket','beancan','explosives'];
  const ATT_IDS=['scope8x','holo','silencer','muzzle_boost','muzzle_brake','laser','flashlight','ext_mag'];
  const gn=P.find(x=>GUN_IDS.includes(x[0]))||['ak',1];
  const ex=P.find(x=>EXP_IDS.includes(x[0]))||['c4',1];
  const at=P.find(x=>ATT_IDS.includes(x[0]))||['holo',1];
  const sc=P.find(x=>x[0]==='scrap')||['scrap',60];
  const out=[gn,ex,at];
  for(const item of P){
   if(out.length>=6)break;
   if(!out.some(q=>q[0]===item[0]))out.push(item);
  }
  if(!out.some(q=>q[0]==='scrap'))out.push(sc);
  return out;
 }
 const out=P.slice(0,1+(Math.random()*3|0)),sc=P.find(x=>x[0]==='scrap'),gun=P.find(x=>['pistol','shotgun','smg'].includes(x[0]));if(gun&&!out.includes(gun))out[out.length-1]=gun;if(sc&&!out.includes(sc))out.push(sc);return out}
function mkCrate(tier){const b=new MB(),g=b.g,u=g.userData,w=[.9,1.1,1.2,1.38][tier-1],h=[.55,.62,.7,.78][tier-1],d=[.6,.7,.75,.84][tier-1],
 bc=[0x7a5a38,0x4f5a3a,0x23272c,0x3a1414][tier-1],tc=[0x4a3626,0xc9a437,0xd4af37,0xe5b83b][tier-1];
 b.box(w,h,d,0,h/2,0,bc);b.box(w+.04,.05,d+.04,0,.03,0,tc);
 if(tier===1){for(const x of[-.3,.3])b.box(.08,h+.02,d+.02,x,h/2,0,tc);b.box(w+.02,.03,.05,0,h*.5,d/2+.01,0x6a4a2a)}
 else if(tier===4){
  // Armored Raider War-Chest with steel corner ribs, gold hazard straps, twin padlocks & front skull emblem
  for(const sx of[-1,1])for(const sz of[-1,1])b.box(.09,h+.02,.09,sx*(w/2-.02),h/2,sz*(d/2-.02),0x1a1c20);
  for(const sx of[-.36,.36]){b.box(.08,h+.02,d+.03,sx,h/2,0,tc);b.box(.11,.14,.05,sx,h*.62,d/2+.025,0xd4af37)}
  b.box(w*.52,.16,.02,0,h*.52,d/2+.015,0x1a1c20);
  b.sph(.065,0,h*.55,d/2+.03,0xe8dfd1,.9,7);b.box(.06,.045,.03,0,h*.47,d/2+.03,0xd8cfc0);
  for(const sx of[-.024,.024])b.sph(.014,sx,h*.56,d/2+.085,0xff2a2a,1,5);
  for(const x of[-1,1])b.box(.05,.14,.1,x*(w/2+.025),h*.58,0,0x1a1c20);
 }else{b.box(w*.6,.1,.01,0,h*.55,d/2+.01,tc);for(const x of[-1,1]){b.box(.04,.12,.06,x*(w/2+.02),h*.6,0,0x111111);b.box(.1,.06,.03,x*.25,h-.02,d/2+.02,0x777777)}}
 const lid=new T.Group();lid.position.set(0,h,-d/2);g.add(lid);const lm=new MB();lm.box(w+.04,.1,d+.04,0,.05,d/2,bc);lm.box(w+.05,.03,.06,0,.1,d/2,tc);
 if(tier===4){for(const sx of[-.36,.36])lm.box(.09,.12,d+.05,sx,.05,d/2,tc);lm.box(.34,.03,.28,0,.115,d/2,0xff2222)}
 else if(tier>1)lm.box(.2,.02,.2,0,.11,d/2,tier===3?0xff3030:0x222222);
 lid.add(lm.build());
 if(tier>=3){u.glow=new T.Mesh(new T.BoxGeometry(w*(tier===4?.62:.5),.045,.025),new T.MeshBasicMaterial({color:tier===4?0xffb020:0xff3030}));u.glow.position.set(0,h*.82,d/2+.025);g.add(u.glow)}
 u.k='crate';u.tier=tier;u.nm=CRT[tier].n;u.lid=lid;u.cd=0;u.op=0;u.loot=null;u.box=null;return g}
function addCrate(t,x,y,z,rot){const g=mkCrate(t);g.position.set(x,y,z);g.rotation.y=rot||0;scene.add(g);things.push(g);CR.push(g)}
const CRATE_SLOTS=[6,8,12,12];
// Every crate keeps a real inventory (u.box). It is rolled from the loot table the first time it is opened.
function crateBox(o){const u=o.userData;
 if(!u.box){const L=u.loot||crateLoot(u.tier);u.loot=null;const sl=[];
  for(const q of L){const it=ITEMS[q[0]];if(!it)continue;let left=q[1];const m=it.max||1;while(left>0){const a=Math.min(m,left);sl.push({id:q[0],n:a,dur:it.dur,mag:it.gun?0:undefined});left-=a}}
  const n=Math.min(24,Math.max(CRATE_SLOTS[u.tier-1]||8,sl.length));while(sl.length<n)sl.push(null);sl.length=n;
  u.box={t:'crate',nm:CRT[u.tier].n,sl,x:o.position.x,z:o.position.z,y:o.position.y}}
 return u.box}
function openCrate(o){const u=o.userData,bx=crateBox(o);if(!u.rated){u.rated=1;RT.scavenge+=u.tier;bumpHeat(.22*u.tier)}u.op=1;
 curBox=bx;open=true;tab='bag';pick=null;render();lookLock(false);say(CRT[u.tier].n+': take what you want. Drag stacks to your bag, or press Take all.')}
function crateTick(dt){for(const o of CR){const u=o.userData;u.lid.rotation.x+=((u.op?-1.9:0)-u.lid.rotation.x)*Math.min(1,dt*6);if(u.glow)u.glow.material.color.setHex(Math.sin(age*(u.tier===4?6:4))>0?(u.tier===4?0xffd24a:0xff3030):(u.tier===4?0xb81d1d:0x701818));
  if(u.box&&u.cd<=0&&!(open&&curBox===u.box)&&u.box.sl.every(q=>!q))u.cd=CRT[u.tier].cd;
  if(u.cd>0&&(u.cd-=dt)<=0){u.op=0;u.loot=null;u.box=null;u.cd=0}}
 for(const m of MONS)if(!m.seen&&Math.hypot(P.x-m.x,P.z-m.z)<m.r+(m.raiderCamp?14:0)){m.seen=1;if(m.raiderCamp){const alive=m.raiders?m.raiders.filter(r=>r&&r.hp>0).length:0;say('Discovered Raider Camp: '+m.n+' ('+alive+' raiders guarding Raider War-Chests)!')}else say('Discovered: '+m.n+'. Its crates hold better loot.')}}

let nearT=0,hudT=0,ftA=0,ftN=0,prT=0;const PRMAX=Math.min(devicePixelRatio||1,1.35)*(IS_MOBILE?.75:1);let prC=PRMAX;
function adaptRes(dt){if(dt<=0||dt>.25)return;ftA+=dt;ftN++;prT+=dt;if(prT<1.5)return;const fps=ftN/ftA;ftA=0;ftN=0;prT=0;let n=prC;if(fps<45)n=Math.max(IS_MOBILE?.5:.65,prC-.15);else if(fps>56)n=Math.min(PRMAX,prC+.1);if(Math.abs(n-prC)>.01){prC=n;ren.setPixelRatio(n)}}
function mon(name,cx,cz,w,d,y,build){const X=(cx+(w-1)/2)*C,Z=(cz+(d-1)/2)*C,b=new MB();b.g.position.set(X,y,Z);scene.add(b.g);
 for(let i=0;i<w;i++)for(let j=0;j<d;j++){FD.set(key(cx+i,cz+j),{y});const fx=(cx+i)*C,fz=(cz+j)*C;ALLC.push({x0:fx-1.5,x1:fx+1.5,z0:fz-1.5,z1:fz+1.5,y:y-2.6,top:y,found:1})}clearNodes(X,Z,Math.hypot(w,d)*C/2+3);b.box(w*C,3,d*C,0,-1.5,0,0x7d7b76);monDeck(b,w*C,d*C,X,Z);
 const rc=(x0,z0,x1,z1,h,extra)=>ALLC.push(Object.assign({x0:X+x0,x1:X+x1,z0:Z+z0,z1:Z+z1,y,h:h||2.85},extra||{}));
 let MP=null;const k={b,rc,X,Z,y,pad(x,z){MP=[x,z];monPad(b,x,z)},wall(x0,z0,x1,z1,h,c){b.box(x1-x0,h,z1-z0,(x0+x1)/2,h/2,(z0+z1)/2,c);rc(x0,z0,x1,z1,h)},post(x,z,h,c,r){const pr=r||.15;b.cyl(pr,pr,h,8,x,h/2,z,c);rc(x-pr,z-pr,x+pr,z+pr,h)},crate(t,lx,lz,rot,up){addCrate(t,X+lx,y+(up||0),Z+lz,rot)},solid(x,z,sx,sz,sy,c){b.box(sx,sy,sz,x,sy/2,z,c);if(sy<=.55){const p={x0:X+x-sx/2,x1:X+x+sx/2,z0:Z+z-sz/2,z1:Z+z+sz/2,y:y-.4,top:y+sy,found:1,pad:1};ALLC.push(p);DECKS.push(p)}else{const p={top:y+sy,deck:sy<=1.5?1:0};rc(x-sx/2,z-sz/2,x+sx/2,z+sz/2,sy,p);if(p.deck)DECKS.push(ALLC[ALLC.length-1])}}};
 build(k);mergeStatic(b.g);MONS.push({g:b.g,n:name,x:X,z:Z,w,d,y,cx,cz,rp:MP&&[X+MP[0],Z+MP[1]],r:Math.hypot(w,d)*C/2+6,seen:0})}
const MR=rng(77);
function site(w,d){for(let t=0;t<900;t++){const x=(MR()*2-1)*(B-55),z=(MR()*2-1)*(B-40),cx=Math.round(x/C),cz=Math.round(z/C),X=(cx+(w-1)/2)*C,Z=(cz+(d-1)/2)*C;let lo=1e9,hi=-1e9;
  for(let i=0;i<=w*2;i++)for(let j=0;j<=d*2;j++){const h=H(cx*C-1.5+i*1.5,cz*C-1.5+j*1.5);lo=Math.min(lo,h);hi=Math.max(hi,h)}
  const maxSlope=t>450?1.85:1.45,minMon=t>450?42:48;
  if(lo>.78&&hi-lo<maxSlope&&hi<7.1&&Math.hypot(X-SP.x,Z-SP.z)>76&&NP.every(n=>Math.hypot(n.hx-X,n.hz-Z)>30)&&MONS.every(m=>Math.hypot(m.x-X,m.z-Z)>minMon))return{cx,cz,y:hi+.02}}return null}
const MC={conc:0x8c8b85,concD:0x66665f,asph:0x2f3135,rust:0x9a4d28,steel:0x56606a,corr:0x6c767c,corrD:0x4d565c,yel:0xd1a02a,red:0xa63a24,blue:0x2f5b78,wood:0x7a5a38,woodD:0x55402a,olive:0x56603f,blk:0x1d1f22,lamp:0xfff0b8,sand:0xa89a6a,wht:0xe4dfcf};
function monDeck(b,W,D,X,Z){const R=rng(((X*7+Z*13)|0)+5);b.box(W-.4,.04,D-.4,0,.02,0,MC.asph);
 for(const s of[-1,1]){b.box(W,.2,.3,0,.1,s*(D/2-.15),MC.conc);b.box(.3,.2,D-.6,s*(W/2-.15),.1,0,MC.conc);b.box(W-1.4,.02,.1,0,.05,s*(D/2-.6),MC.yel);b.box(.1,.02,D-1.4,s*(W/2-.6),.05,0,MC.yel)}
 for(let i=0;i<5;i++)b.cyl(.5+R()*.8,.5+R()*.8,.01,10,(R()*2-1)*(W/2-1.5),.045,(R()*2-1)*(D/2-1.5),0x232528);
 for(let i=0;i<4;i++)b.box(.05,.015,1+R()*1.6,(R()*2-1)*(W/2-1.5),.045,(R()*2-1)*(D/2-1.5),0x222427,[0,R()*3,0])}
function monPad(b,x,z){b.box(2.6,.03,2.6,x,.055,z,0x3d3f43);for(const s of[-1,1]){b.box(2.6,.035,.12,x,.06,z+s*1.24,MC.yel);b.box(.12,.035,2.6,x+s*1.24,.06,z,MC.yel)}for(const[sx,sz]of[[-1,-1],[1,-1],[-1,1],[1,1]])b.box(.4,.04,.4,x+sx*1.05,.065,z+sz*1.05,MC.blk)}
function monKit(k){const b=k.b,K={
 wall(x0,z0,x1,z1,h,c){k.wall(x0,z0,x1,z1,h,c||MC.corr);const cx=(x0+x1)/2,cz=(z0+z1)/2;b.box(x1-x0+.1,.55,z1-z0+.1,cx,.28,cz,MC.concD);b.box(x1-x0+.14,.12,z1-z0+.14,cx,h+.06,cz,MC.blk)},
 ribs(x0,z0,x1,z1,h,sp){sp=sp||1;const ax=x1-x0>z1-z0,L=ax?x1-x0:z1-z0,hh=h-.9;for(let t=.5;t<L;t+=sp){if(ax){const x=x0+t;b.box(.09,hh,.07,x,.6+hh/2,z0-.02,MC.corrD);b.box(.09,hh,.07,x,.6+hh/2,z1+.02,MC.corrD)}else{const z=z0+t;b.box(.07,hh,.09,x0-.02,.6+hh/2,z,MC.corrD);b.box(.07,hh,.09,x1+.02,.6+hh/2,z,MC.corrD)}}},
 win(x,y,z,w,h,ax){b.box(ax?w:.08,h,ax?.08:w,x,y,z,0x1b2630);for(const s of[-1,1])b.box(ax?w+.2:.12,.1,ax?.12:w+.2,x,y+s*(h/2+.05),z,MC.blk)},
 roof(x,z,w,d,y,c){b.box(w,.3,d,x,y,z,c||MC.steel);for(const s of[-1,1]){b.box(w+.2,.12,.2,x,y+.2,z+s*d/2,MC.blk);b.box(.2,.12,d,x+s*w/2,y+.2,z,MC.blk)}for(let t=.6;t<w-.3;t+=1.1)b.box(.08,.1,d-.2,x-w/2+t,y+.2,z,MC.corrD)},
 vent(x,y,z){b.box(.8,.5,.8,x,y+.25,z,MC.corrD);b.cyl(.28,.28,.2,8,x,y+.6,z,MC.blk)},
 barrel(x,z,c){k.post(x,z,.9,c||MC.red,.34);for(const y of[.2,.7])b.cyl(.36,.36,.07,10,x,y,z,MC.blk)},
  pallet(x,z,w,d,up){w=w||1.3;d=d||1.1;const u=up||0;b.box(w,.06,d,x,u+.14,z,MC.wood);for(const i of[-1,0,1])b.box(w*.2,.1,d,x+i*w*.4,u+.05,z,MC.woodD)},
  crate(t,x,z,r,up){K.pallet(x,z,1.3,1.1,up||0);k.crate(t,x,z,r,(up||0)+.17)},
 jersey(x,z,len,ax){const sx=ax?len:.6,sz=ax?.6:len;b.box(sx,.3,sz,x,.15,z,MC.concD);b.box(ax?len:.34,.55,ax?.34:len,x,.57,z,MC.conc);b.box(ax?len:.36,.08,ax?.36:len,x,.4,z,MC.yel);k.rc(x-sx/2,z-sz/2,x+sx/2,z+sz/2,.85)},
 mast(x,z,h){k.post(x,z,h,MC.steel,.1);b.box(1,.2,.45,x,h,z,MC.blk);b.box(.9,.08,.35,x,h-.14,z,MC.lamp)},
 wire(x0,z0,x1,z1,y){const ax=Math.abs(x1-x0)>Math.abs(z1-z0),L=ax?Math.abs(x1-x0):Math.abs(z1-z0),n=Math.max(1,Math.round(L/2));for(let i=0;i<=n;i++)b.cyl(.03,.03,.7,5,x0+(x1-x0)*i/n,y+.35,z0+(z1-z0)*i/n,MC.blk);for(const d of[.15,.4,.65])b.box(ax?L:.025,.025,ax?.025:L,(x0+x1)/2,y+d,(z0+z1)/2,0x777b7e)},
 sandbags(x,z,len,ax){const n=Math.round(len/.55);for(let r=0;r<2;r++)for(let i=0;i<n;i++){const o=(i-(n-1)/2)*.55+(r?.27:0);b.box(ax?.5:.4,.24,ax?.4:.5,ax?x+o:x,.14+r*.24,ax?z:z+o,r?0x9a8c5e:MC.sand)}k.rc(ax?x-len/2:x-.25,ax?z-.25:z-len/2,ax?x+len/2:x+.25,ax?z+.25:z+len/2,.52)},
 tires(x,z){k.post(x,z,.75,MC.blk,.4);for(const y of[.12,.37,.62])b.tor(.34,.1,x,y,z,0x3a3c40,[1.5708,0,0])},
 sign(x,y,z,w,h,c,ax){b.box(ax?w:.1,h,ax?.1:w,x,y,z,MC.blk);b.box(ax?w-.15:.12,h-.15,ax?.12:w-.15,x,y,z,c)},
 car(x,z,ax,c){const f=(a,s)=>ax?[x+a,z+s]:[x+s,z+a],L=3.6,Wd=1.6;let p=f(0,0);b.box(ax?L:Wd,.55,ax?Wd:L,p[0],.6,p[1],c);p=f(-.2,0);b.box(ax?L*.45:Wd-.1,.5,ax?Wd-.1:L*.45,p[0],1.1,p[1],shade(c,.8));b.box(ax?L*.45+.02:Wd-.06,.3,ax?Wd-.06:L*.45+.02,p[0],1.15,p[1],0x1b2630);for(const a of[-1.15,1.15])for(const s of[-.8,.8]){p=f(a,s);b.cyl(.3,.3,.2,10,p[0],.3,p[1],MC.blk,ax?[1.5708,0,0]:[0,0,1.5708])}k.rc(x-(ax?L:Wd)/2,z-(ax?Wd:L)/2,x+(ax?L:Wd)/2,z+(ax?Wd:L)/2,1.35)},
 stripes(x,z,len,ax,n){for(let i=0;i<n;i++){const o=(i+.5)*len/n-len/2;b.box(ax?len/n:.5,.03,ax?.5:len/n,ax?x+o:x,.06,ax?z:z+o,i%2?MC.blk:MC.yel)}},
 container(x,z,ax,c,c2){const L=6,Wd=2.4,H=2.6,sx=ax?L:Wd,sz=ax?Wd:L,rib=(y,col)=>{for(let t=.5;t<L;t+=.75)b.box(ax?.07:Wd+.06,H-.3,ax?Wd+.06:.07,ax?x-L/2+t:x,y,ax?z:z-L/2+t,col)};k.solid(x,z,sx,sz,H,c);rib(H/2,shade(c,.78));b.box(sx+.04,.12,sz+.04,x,H+.04,z,MC.blk);if(c2){b.box(sx,H,sz,x,H*1.5+.1,z,c2);rib(H*1.5+.1,shade(c2,.78))}},
 forklift(x,z){k.solid(x,z,1.1,1.8,.8,MC.yel);b.box(1.1,.6,.4,x,.7,z+.85,MC.steel);b.box(1,.08,1.1,x,2,z+.2,MC.blk);for(const sx of[-.5,.5]){b.cyl(.04,.04,1.2,6,x+sx,1.4,z+.65,MC.blk);b.box(.1,2.2,.1,x+sx*.7,1.2,z-1.1,MC.steel);b.box(.12,.06,1.1,x+sx*.6,.1,z-1.5,MC.steel)}b.box(.8,.4,.5,x,1.0,z+.3,shade(MC.yel,.8))}
};return K}
function gasStation(){const s=site(4,4);if(!s)return;mon('Gas Station',s.cx,s.cz,4,4,s.y,k=>{const K=monKit(k),b=k.b,W=MC.corr;k.pad(4.4,-4.4);
 K.wall(-5,-5.6,1.4,-5.2,3.2,W);K.wall(-5,-5.6,-4.6,-1.4,3.2,W);K.wall(1,-5.6,1.4,-1.4,3.2,W);K.wall(-5,-1.8,-1.8,-1.4,3.2,W);K.wall(-.6,-1.8,1.4,-1.4,3.2,W);
 K.ribs(-5,-5.6,1.4,-5.2,3.2,1.1);K.ribs(-5,-1.8,-1.8,-1.4,3.2,1.1);K.ribs(-.6,-1.8,1.4,-1.4,3.2,1.1);K.win(-3.4,1.9,-1.38,1.6,1.1,true);
 for(const x of[-1.74,-.66])b.box(.12,2.7,.5,x,1.35,-1.6,MC.blk);b.box(1.3,.2,.5,-1.2,2.7,-1.6,MC.blk);
 K.roof(-1.8,-3.4,6.8,4.6,3.35);K.vent(-3.6,3.5,-4);K.vent(-.4,3.5,-4.4);
 b.box(.1,.9,.1,-3,3.75,-1.5,MC.blk);b.box(.1,.9,.1,-.6,3.75,-1.5,MC.blk);K.sign(-1.8,4.3,-1.5,2.8,.9,MC.red,true);b.box(1.8,.3,.16,-1.8,4.3,-1.5,MC.wht);
 k.solid(-2.6,-2.8,2.2,.6,1,MC.woodD);b.box(2.3,.06,.7,-2.6,1.03,-2.8,MC.wht);k.solid(-4.5,-3.6,.5,2.4,1.8,MC.steel);
 K.crate(1,-3.2,-4.7,0);K.crate(2,-.4,-4.6,0);
 for(const x of[-4.6,4.6])for(const z of[1.8,5]){k.post(x,z,4.2,MC.wht,.18);b.cyl(.2,.2,.5,8,x,.25,z,MC.red)}
 b.box(11,.4,5.4,0,4.4,3.4,MC.red);b.box(11.1,.14,5.5,0,4.1,3.4,MC.wht);for(const x of[-3,0,3])b.box(.8,.06,.4,x,4.03,3.4,MC.lamp);
 for(const x of[-1.6,1.6]){b.box(.9,.18,2.6,x,.1,3.4,MC.conc);k.solid(x,3.4,.6,.45,1.25,MC.blue);b.box(.5,.3,.47,x,1.4,3.4,MC.blk);b.box(.35,.18,.49,x,1.34,3.4,0x7fd06a)}
 K.barrel(2.3,-2.6);K.barrel(2.9,-2.6,MC.blue);K.barrel(2.6,-2,MC.rust);K.tires(-5.2,-.2);K.car(3.2,3.2,false,MC.rust);K.mast(-5.6,5.6,6.5);
 k.post(5.4,.8,6,MC.steel,.12);K.sign(5.4,6,.8,1.5,1.7,MC.yel,false)})}
function warehouse(){const s=site(5,4);if(!s)return;mon('Warehouse',s.cx,s.cz,5,4,s.y,k=>{const K=monKit(k),b=k.b,W=MC.corr;k.pad(5.2,-4.3);
 const segs=[[-7.5,-6.2,7.5,-5.8],[-7.5,-6.2,-7.1,6.2],[7.1,-6.2,7.5,6.2],[-7.5,5.8,-1.8,6.2],[1.8,5.8,7.5,6.2]];for(const q of segs){K.wall(q[0],q[1],q[2],q[3],4.5,W);K.ribs(q[0],q[1],q[2],q[3],4.5,1.2)}
 b.box(3.6,1,.4,0,4,6,W);b.box(3.6,.25,.5,0,3.5,6,MC.yel);for(const x of[-1.8,1.8])b.box(.2,3.5,.5,x,1.75,6,MC.blk);
 K.roof(0,0,15.4,12.6,4.65);for(const x of[-4.5,0,4.5])b.box(2.2,.06,9,x,4.88,0,0x8fb0b8);K.vent(-6,4.8,4);K.vent(6,4.8,-1);K.vent(0,4.8,-5);
 for(const x of[-5,-2,2,5])K.win(x,3.4,-6.22,1.4,.8,true);for(const z of[-3,0,3]){K.win(7.52,3.4,z,1.4,.8,false);K.win(-7.52,3.4,z,1.4,.8,false)}
 for(const x of[-4,4]){k.solid(x,-1,1.1,4.8,2.4,0x2a2c2f);for(const z of[-3.4,1.4])for(const sx of[-.62,.62])b.box(.1,2.5,.1,x+sx,1.25,z,MC.rust);
  for(const lv of[.8,1.6,2.4]){b.box(1.3,.08,5,x,lv,-1,MC.rust);if(lv<2.4)for(let i=0;i<4;i++)b.box(1,.6,1,x,lv+.34,-1+(i-1.5)*1.2,[MC.wood,MC.olive,MC.blue,MC.woodD][(i+(lv>1?1:0))%4])}}
 for(const x of[-1.8,1.8])b.box(.15,.02,10,x,.07,0,MC.yel);for(const x of[-4,0,4])b.box(1.6,.08,.4,x,4.1,2,MC.lamp);
 K.forklift(-1.2,3.4);K.crate(2,-4,-4.9,0);K.crate(2,1.6,-4.9,0);K.crate(1,-6.4,-3.2,1.57);K.crate(1,-6.4,3.8,1.57);
 K.barrel(6.4,.6,MC.blue);K.barrel(6.4,1.3,MC.red);K.barrel(5.7,1,MC.blue);K.stripes(0,5.5,3.4,true,8)})}
function outpost(){const s=site(6,6);if(!s)return;mon('Military Outpost',s.cx,s.cz,6,6,s.y,k=>{const K=monKit(k),b=k.b,W=MC.conc,G=MC.olive;k.pad(7.1,-7.1);
 const P=[[-9,-9,9,-8.6],[-9,-9,-8.6,9],[8.6,-9,9,9],[-9,8.6,-2,9],[2,8.6,9,9]];for(const q of P){K.wall(q[0],q[1],q[2],q[3],2.4,W);K.wire(q[0],q[1],q[2],q[3],2.46)}
 for(const x of[-2.1,2.1])b.box(.4,3.2,.5,x,1.6,8.8,MC.concD);b.box(4.6,.4,.5,0,3.3,8.8,MC.yel);for(let i=0;i<6;i++)b.box(.35,.42,.52,-1.9+i*.76,3.3,8.8,MC.blk);
 const B=[[-3,-6,3,-5.6],[-3,-6,-2.6,-1],[2.6,-6,3,-1],[-3,-1.4,-1,-1],[1,-1.4,3,-1]];for(const q of B)K.wall(q[0],q[1],q[2],q[3],3.2,MC.concD);
 b.box(2.6,.8,.4,0,2.8,-1.2,MC.concD);K.sign(0,2.8,-.95,1.6,.5,MC.yel,true);K.roof(0,-3.5,6.4,5.4,3.35,MC.concD);K.vent(-2,3.5,-4);
 K.crate(3,0,-5.2,0);K.crate(2,-2,-5,0);K.sandbags(-2.4,.4,1.6,false);K.sandbags(2.4,.4,1.6,false);
 for(const[x,z]of[[-7.5,-7.5],[7.5,7.5]]){for(const[dx,dz]of[[-1,-1],[1,-1],[-1,1],[1,1]])k.post(x+dx,z+dz,5,MC.woodD,.12);b.box(3,.3,3,x,5,z,MC.wood);
  b.box(3,.9,.1,x,5.6,z-1.5,MC.woodD);b.box(3,.9,.1,x,5.6,z+1.5,MC.woodD);b.box(.1,.9,3,x-1.5,5.6,z,MC.woodD);b.box(.1,.9,3,x+1.5,5.6,z,MC.woodD);
  for(const[dx,dz]of[[-1.3,-1.3],[1.3,-1.3],[-1.3,1.3],[1.3,1.3]])b.cyl(.06,.06,1.3,6,x+dx,5.8,z+dz,MC.woodD);b.cone(2.5,1.2,4,x,6.9,z,MC.corrD,[0,.785,0]);b.box(.4,.4,.5,x,5.5,z,MC.blk);
  for(const dx of[-.3,.3])b.box(.06,5,.06,x+dx,2.5,z+1.35,MC.steel);for(let y=.5;y<5;y+=.8)b.box(.6,.05,.05,x,y,z+1.35,MC.steel)}
 K.container(-6.8,1.8,false,MC.rust,MC.blue);K.container(6.6,3,false,G);K.barrel(4.6,-7.6,MC.red);K.barrel(5.2,-7.6,MC.blue);
 K.crate(1,-4.4,5,.4);K.crate(1,4.6,5,-.4);for(let i=0;i<5;i++)b.box(.8,.3,.4,-3.2+i*.8,.2,7.4,i%2?G:shade(G,1.2));
 k.post(6.5,-5,9,0x888888,.1);b.sph(.15,6.5,9.1,-5,0xff2a2a,1,6);k.post(0,6,6,MC.wht,.06);b.box(1.2,.7,.04,.7,5.5,6,G);K.mast(-8,8,6.5)})}
function shack(){const s=site(3,2);if(!s)return;mon('Roadside Shack',s.cx,s.cz,3,2,s.y,k=>{const K=monKit(k),b=k.b,W=0x7a6a50;k.pad(3,0);
 K.wall(-4,-2.4,.8,-2,2.8,W);K.wall(-4,-2.4,-3.6,2.4,2.8,W);K.wall(.4,-2.4,.8,2.4,2.8,W);K.wall(-4,2,-2.2,2.4,2.8,W);K.wall(-1,2,.8,2.4,2.8,W);
 for(const y of[.9,1.5,2.1]){b.box(4.8,.04,.06,-1.6,y,-2.43,0x5a4a36);b.box(.06,.04,4.8,-4.03,y,0,0x5a4a36);b.box(.06,.04,4.8,.83,y,0,0x5a4a36)}
 K.roof(-1.6,0,5.2,5,2.95,MC.corr);b.cyl(.15,.15,1.2,8,-3,3.5,-1.4,MC.corrD);for(const x of[-2.14,-1.06])b.box(.12,2.5,.4,x,1.25,2.2,MC.blk);b.box(1.2,.2,.4,-1.6,2.6,2.2,MC.blk);
 K.sign(-3,2,2.45,1.2,.5,MC.red,true);K.win(.83,1.7,0,1.2,.8,false);k.solid(-1.6,-1.5,2.6,.5,1.8,MC.woodD);
 K.crate(1,-2.9,1,0);K.crate(1,-.7,.9,0);K.barrel(2.2,-1.8,MC.rust);K.barrel(2.4,2.2,MC.red);K.tires(3.9,2.3);K.mast(4.2,-2.4,4.5)})}
function satDish(){const s=site(5,5);if(!s)return;mon('Satellite Dish',s.cx,s.cz,5,5,s.y,k=>{const K=monKit(k),b=k.b;k.pad(5.4,-5.4);
 // Perimeter security walls with barbed wire and entry gates
 const P=[[-7.2,-7.2,7.2,-6.8],[-7.2,-7.2,-6.8,7.2],[6.8,-7.2,7.2,7.2],[-7.2,6.8,-2.2,7.2],[2.2,6.8,7.2,7.2]];
 for(const q of P){K.wall(q[0],q[1],q[2],q[3],2.2,MC.conc);K.wire(q[0],q[1],q[2],q[3],2.26)}
 // Central reinforced concrete azimuth pedestal + rotating steel turret
 b.cyl(2.7,3.2,2.2,12,0,1.1,-.4,MC.concD);b.cyl(2.1,2.3,1.8,12,0,3.0,-.4,MC.conc);b.cyl(1.3,1.5,1.5,10,0,4.5,-.4,MC.corrD);
 k.rc(-3.1,-3.5,3.1,2.7);
 // Elevation yoke arms & counterweight truss
 for(const sx of[-1.1,1.1]){b.box(.32,1.9,.7,sx,5.6,-.4,MC.steel);b.box(.22,.5,2.2,sx,6.1,-1.3,MC.corrD)}
 b.box(1.9,.65,1.1,0,5.8,-2.2,MC.rust);
 // Giant parabolic dish (concentric stepped rings + radial ribs + quad feed-horn struts)
 const dy=6.6,dz=.1;b.cyl(1.4,1.1,.45,12,0,dy,dz,MC.corrD);
 b.cyl(3.2,1.4,.72,14,0,dy+.52,dz+.15,MC.wht);b.cyl(4.8,3.2,.82,16,0,dy+1.2,dz+.35,MC.conc);b.cyl(5.05,4.8,.25,16,0,dy+1.68,dz+.45,MC.red);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;b.box(.14,.22,4.4,Math.cos(a)*2.2,dy+.92,dz+.25+Math.sin(a)*2.2,MC.steel)}
 for(const sx of[-1.5,1.5])for(const sz of[-1.3,1.7])b.box(.1,3.1,.1,sx*.5,dy+2.35,dz+.35+sz*.45,MC.blk);
 b.cyl(.38,.46,.72,8,0,dy+3.75,dz+.5,MC.blk);b.cyl(.12,.12,.85,6,0,dy+4.3,dz+.5,MC.red);
 // Telemetry bunker & server room (SW corner)
 const B=[[-6.2,-6.0,-1.8,-5.6],[-6.2,-6.0,-5.8,-2.0],[-2.2,-6.0,-1.8,-4.4],[-2.2,-3.2,-1.8,-2.0],[-6.2,-2.4,-1.8,-2.0]];
 for(const q of B)K.wall(q[0],q[1],q[2],q[3],3.0,MC.concD);
 K.roof(-4.0,-4.0,4.6,4.2,3.12,MC.conc);K.vent(-4.8,3.25,-4.6);K.sign(-4.0,2.4,-1.92,2.0,.42,MC.yel,true);K.win(-4.0,1.65,-1.96,1.5,.75,true);
 for(const rx of[-5.2,-4.2,-3.2]){b.box(.7,2.0,.5,rx,1.0,-5.1,MC.blk);b.box(.52,.16,.54,rx,1.6,-5.08,MC.olive);b.box(.52,.12,.54,rx,1.2,-5.08,MC.red)}
 // Backup generator shed (SE corner) + loot crates
 K.container(4.4,-4.2,false,MC.olive);
 K.crate(3,-3.8,-3.8,0);K.crate(2,0,4.2,0);K.crate(2,4.4,2.2,1.57);
 K.barrel(2.8,4.6,MC.red);K.barrel(3.6,4.8,MC.blue);K.barrel(-3.2,4.8,MC.rust);K.tires(-5.4,4.2);K.mast(-6.0,5.8,6.5);K.mast(6.0,5.8,6.5)})}
function oilDepot(){const s=site(5,4);if(!s)return;mon('Oil Depot',s.cx,s.cz,5,4,s.y,k=>{const K=monKit(k),b=k.b;k.pad(5.4,-4.2);
 // Containment berm & twin mammoth crude-oil storage silos (west side)
 k.solid(-3.2,-.8,7.4,4.6,.42,MC.concD);
 for(const sx of[-5.0,-1.4]){
  k.post(sx,-.8,4.6,MC.wht,1.62);b.cyl(1.66,1.66,.22,14,sx,1.2,-.8,MC.blk);b.cyl(1.66,1.66,.22,14,sx,3.4,-.8,MC.red);
  b.cyl(1.7,1.7,.14,14,sx,4.65,-.8,MC.concD);b.cyl(.32,.32,.45,8,sx,4.9,-.8,MC.rust);
  for(let y=.5;y<=4.5;y+=.45)b.box(.32,.05,.08,sx,y,.92,MC.yel);
  b.box(.06,4.4,.06,sx-.16,2.3,.9,MC.yel);b.box(.06,4.4,.06,sx+.16,2.3,.9,MC.yel)}
 // Elevated catwalk bridge between silos + overhead pipeline manifold to pump house
 b.box(4.2,.12,.85,-3.2,4.72,-.8,MC.steel);b.box(4.2,.55,.06,-3.2,5.0,-.4,MC.yel);b.box(4.2,.55,.06,-3.2,5.0,-1.2,MC.yel);
 b.box(5.8,.24,.24,-.2,3.5,-1.6,MC.rust);b.box(5.8,.2,.2,-.2,3.0,-1.6,MC.yel);
 for(const vx of[-2.8,0,2.2]){b.box(.22,3.4,.22,vx,1.7,-1.6,MC.corrD);b.cyl(.26,.26,.1,8,vx,1.5,-1.35,MC.red)}
 // Pump manifold house (east side)
 const P=[[1.8,-4.2,6.2,-3.8],[5.8,-4.2,6.2,.6],[1.8,.2,6.2,.6],[1.8,-4.2,2.2,-2.4],[1.8,-1.0,2.2,.6]];
 for(const q of P){K.wall(q[0],q[1],q[2],q[3],3.2,MC.corr);K.ribs(q[0],q[1],q[2],q[3],3.2,1.1)}
 K.roof(4.0,-1.8,4.6,5.0,3.35,MC.corrD);K.vent(4.0,3.5,-1.8);K.sign(4.0,2.5,.68,2.2,.45,MC.yel,true);
 // Tall flare stack tower (NE corner)
 k.post(5.8,4.2,7.8,MC.rust,.32);b.cyl(.38,.32,.9,10,5.8,8.1,4.2,MC.blk);b.box(.26,.26,.26,5.8,8.7,4.2,MC.red);
 K.crate(3,4.0,-1.8,0);K.crate(2,-3.2,3.6,0);K.crate(2,.6,3.6,1.57);
 for(const p of[[-5.6,3.4],[-4.7,3.6],[-3.8,3.3],[2.2,3.6],[3.0,3.8],[3.8,3.5]])K.barrel(p[0],p[1],MC.blk);
 K.barrel(-.4,3.8,MC.red);K.barrel(-1.2,3.6,MC.red);K.jersey(0,5.4,4.2,true);K.mast(-6.2,5.2,6.5)})}
function sawmill(){const s=site(5,4);if(!s)return;mon('Abandoned Sawmill',s.cx,s.cz,5,4,s.y,k=>{const K=monKit(k),b=k.b;k.pad(5.4,3.8);
 // Open-sided heavy timber mill hall (west/center) with pitched roof & clerestory beams
 for(const gx of[-5.8,-3.0,-.2,2.6])for(const gz of[-3.6,2.0])k.post(gx,gz,3.6,MC.woodD,.2);
 for(const gz of[-3.6,2.0])b.box(8.8,.28,.28,-1.6,3.5,gz,MC.wood);
 K.roof(-1.6,-.8,9.4,6.2,3.7,MC.corr);b.box(9.2,.65,2.4,-1.6,4.15,-.8,MC.corrD);
 // Saw carriage track, log deck & twin circular buzzsaw blades
 k.solid(-1.6,-.8,7.8,1.4,.38,MC.corrD);b.box(7.4,.12,.14,-1.6,.44,-1.3,MC.steel);b.box(7.4,.12,.14,-1.6,.44,-.3,MC.steel);
 b.cyl(.46,.5,4.6,10,-2.6,.88,-.8,MC.woodD,[0,0,1.5708]);b.cyl(.4,.42,4.2,10,-2.4,1.65,-.8,MC.wood,[0,0,1.5708]);
 b.cyl(.72,.72,.08,14,.6,1.15,-.8,MC.steel,[1.5708,0,0]);b.cyl(.52,.52,.08,12,1.5,1.0,-.8,MC.steel,[1.5708,0,0]);
 k.solid(-4.4,1.0,1.6,1.1,.85,MC.rust);b.box(.8,.55,.8,-4.4,1.1,1.0,MC.yel);
 // Conical steel wigwam sawdust burner / cyclone silo (east side)
 k.post(4.8,-2.0,4.2,MC.rust,1.8);b.cyl(.95,1.75,2.4,12,4.8,5.4,-2.0,MC.corrD);b.cyl(1.0,1.0,.35,12,4.8,6.7,-2.0,MC.blk);
 b.box(3.8,.32,.32,2.4,3.6,-1.8,MC.corr);
 // Stacked timber log piles & drying lumber racks (south yard)
 for(let r=0;r<4;r++)for(let l=0;l<3-Math.floor(r/2);l++)b.cyl(.26,.28,3.6,8,-4.4+r*.58,.28+l*.52,4.0,l%2?MC.wood:MC.woodD,[0,0,1.5708]);
 k.rc(-4.8,2.2,-2.2,5.6);
 for(const ly of[.35,1.05,1.75])b.box(2.8,.22,1.2,.8,ly,4.0,MC.wood);
 k.post(-.4,3.5,2.1,MC.woodD,.12);k.post(2.0,3.5,2.1,MC.woodD,.12);
 K.crate(2,-1.2,-.8,0,.38);K.crate(2,4.4,1.6,0);K.crate(1,-4.4,-2.4,1.57);
 K.barrel(2.8,1.8,MC.red);K.barrel(3.5,2.2,MC.rust);K.tires(5.2,-4.6);K.forklift(2.6,4.2);K.mast(-6.2,4.8,6.0)})}
function powerSub(){const s=site(5,5);if(!s)return;mon('Power Substation',s.cx,s.cz,5,5,s.y,k=>{const K=monKit(k),b=k.b;k.pad(5.4,5.4);
 const P=[[-7.2,-7.2,7.2,-6.8],[-7.2,-7.2,-6.8,7.2],[6.8,-7.2,7.2,7.2],[-7.2,6.8,-2.2,7.2],[2.2,6.8,7.2,7.2]];
 for(const q of P){K.wall(q[0],q[1],q[2],q[3],2.2,MC.conc);K.wire(q[0],q[1],q[2],q[3],2.26)}
 // Hyperboloid concrete cooling tower (NW quadrant)
 b.cyl(2.5,3.3,2.8,16,-3.4,1.4,-3.0,MC.concD);b.cyl(2.1,2.5,2.8,16,-3.4,4.2,-3.0,MC.conc);
 b.cyl(2.4,2.1,2.2,16,-3.4,6.7,-3.0,MC.conc);b.cyl(2.5,2.4,.32,16,-3.4,7.92,-3.0,MC.red);b.cyl(2.15,2.15,.25,14,-3.4,7.7,-3.0,MC.blk);
 k.rc(-6.5,-6.1,-.3,.1);
 // High-voltage transformer bank & ceramic insulator bushings (NE quadrant)
 k.solid(3.2,-3.0,5.2,4.6,.32,MC.concD);
 for(const tx of[1.8,4.4]){
  k.solid(tx,-3.0,1.8,2.3,2.4,MC.corrD);
  for(let f=-.8;f<=.81;f+=.4)b.box(2.1,1.8,.12,tx,1.35,-3.0+f,MC.steel);
  for(const iz of[-.65,0,.65]){b.cyl(.14,.18,1.15,8,tx,3.0,-3.0+iz,MC.rust);b.cyl(.22,.22,.12,8,tx,3.2,-3.0+iz,MC.wht);b.cyl(.22,.22,.12,8,tx,3.5,-3.0+iz,MC.wht)}}
 // Steel HV transmission gantry frame
 for(const gx of[.6,5.6]){k.post(gx,-.6,5.8,MC.steel,.16);k.post(gx,-5.4,5.8,MC.steel,.16);b.box(.24,.24,5.0,gx,5.65,-3.0,MC.steel)}
 b.box(5.4,.28,.28,3.1,5.65,-.6,MC.steel);b.box(5.4,.28,.28,3.1,5.65,-5.4,MC.steel);
 // Switchhouse control building (SW quadrant)
 const S=[[-6.0,1.4,-1.2,1.8],[-6.0,1.4,-5.6,5.4],[-1.6,1.4,-1.2,2.8],[-1.6,4.0,-1.2,5.4],[-6.0,5.0,-1.2,5.4]];
 for(const q of S)K.wall(q[0],q[1],q[2],q[3],3.0,MC.conc);
 K.roof(-3.6,3.4,5.0,4.2,3.12,MC.concD);K.vent(-3.6,3.25,3.4);K.sign(-3.6,2.4,1.32,2.2,.45,MC.yel,true);
 K.crate(3,-3.6,3.4,0);K.crate(2,3.1,-3.0,0,.32);K.crate(2,1.2,3.2,1.57);
 K.barrel(3.6,2.6,MC.yel);K.barrel(4.4,3.0,MC.red);K.barrel(2.8,3.4,MC.blue);K.mast(6.0,-5.8,6.5);K.mast(-6.0,5.8,6.5)})}
function helipadMon(){const s=site(5,4);if(!s)return;mon('Radar Helipad',s.cx,s.cz,5,4,s.y,k=>{const K=monKit(k),b=k.b;k.pad(-5.2,3.8);
 // Elevated reinforced concrete helipad deck (east side) with yellow H markings & corner beacons
 k.solid(2.2,0,7.2,7.2,1.3,MC.concD);b.box(7.4,.14,7.4,2.2,1.36,0,MC.asph);
 for(let s2=0;s2<5;s2++)b.box(.55,.26*(s2+1),2.4,-1.65+s2*.26,.13*(s2+1),2.0,MC.conc);
 {const rp={x0:k.X-2.05,x1:k.X-.32,z0:k.Z+.8,z1:k.Z+3.2,y0:k.y,y1:k.y+1.43,ramp:1};ALLC.push(rp);DECKS.push(rp)}
 for(const sx of[-1.1,5.5])b.box(.22,.05,6.6,sx,1.45,0,MC.yel);
 for(const sz of[-3.2,3.2])b.box(6.6,.05,.22,2.2,1.45,sz,MC.yel);
 b.box(.42,.06,3.4,1.15,1.45,0,MC.yel);b.box(.42,.06,3.4,3.25,1.45,0,MC.yel);b.box(2.4,.06,.42,2.2,1.45,0,MC.yel);
 for(const cx of[-1.1,5.5])for(const cz of[-3.2,3.2]){b.cyl(.14,.18,.35,6,cx,1.6,cz,MC.blk);b.box(.18,.18,.18,cx,1.82,cz,cz<0?MC.olive:MC.yel)}
 // Hardened concrete radar bunker (west side) with rooftop geodesic radome & sweep bar
 const B=[[-6.2,-3.6,-2.0,-3.2],[-6.2,-3.6,-5.8,2.0],[-2.4,-3.6,-2.0,-.8],[-2.4,.4,-2.0,2.0],[-6.2,1.6,-2.0,2.0]];
 for(const q of B)K.wall(q[0],q[1],q[2],q[3],3.1,MC.conc);
 K.roof(-4.1,-.8,4.6,5.8,3.22,MC.concD);K.sign(-4.1,2.45,2.08,2.2,.42,MC.olive,true);K.win(-1.95,1.75,-1.8,1.5,.65,false);
 b.cyl(1.15,1.35,1.2,10,-4.1,3.9,-.8,MC.concD);b.sph(1.45,-4.1,5.2,-.8,MC.wht,1,12);
 b.box(2.9,.26,.42,-4.1,6.85,-.8,MC.red);b.cyl(.18,.18,1.1,6,-4.1,6.4,-.8,MC.blk);
 // Windsock pole & military sandbag positions
 k.post(-1.2,-3.8,4.8,MC.steel,.08);b.cone(.28,1.1,8,-.65,4.55,-3.8,MC.red,[0,0,-1.35]);
 K.sandbags(2.2,-4.4,2.8,true);K.sandbags(2.2,4.4,2.8,true);
 K.crate(3,2.2,0,0,1.36);K.crate(2,-4.1,-1.8,0);K.crate(2,-4.1,.6,1.57);
 K.barrel(-1.8,-4.2,MC.red);K.barrel(-1.0,-4.4,MC.blue);K.tires(-2.2,3.8);K.mast(6.0,-4.6,6.5)})}
const RCR=rng(913);
function campSite(w,d){
 for(let t=0;t<1600;t++){
  const x=(RCR()*2-1)*(B-62),z=(RCR()*2-1)*(B-52),cx=Math.round(x/C),cz=Math.round(z/C),X=(cx+(w-1)/2)*C,Z=(cz+(d-1)/2)*C;
  let lo=1e9,hi=-1e9;
  for(let i=0;i<=w*2;i++)for(let j=0;j<=d*2;j++){const h=H(cx*C-1.5+i*1.5,cz*C-1.5+j*1.5);lo=Math.min(lo,h);hi=Math.max(hi,h)}
  const maxSlope=t>900?2.35:t>450?1.85:1.45,minMon=t>900?34:t>450?40:46,minCamp=t>900?95:145,minSp=t>900?82:105;
  if(lo>.75&&hi-lo<maxSlope&&hi<7.2&&Math.hypot(X-SP.x,Z-SP.z)>minSp&&NP.every(n=>Math.hypot(n.hx-X,n.hz-Z)>32)&&MONS.every(m=>Math.hypot(m.x-X,m.z-Z)>minMon)&&RCAMPS.every(c=>Math.hypot(c.x-X,c.z-Z)>minCamp))return{cx,cz,y:hi+.02};
 }
 return null;
}
function rcKit(k,K){
 const b=k.b;
 return {
  skull(x,y,z,sc,ry){
   const s=sc||1;
   b.sph(.22*s,x,y+.12*s,z,0xe6dfd0,.95,8);
   b.box(.22*s,.15*s,.22*s,x,y-.04*s,z+.04*s,0xd8cfc0,[0,ry||0,0]);
   for(const sx of[-.08,.08])b.sph(.048*s,x+sx*s,y+.12*s,z+.18*s,0xff2424,1,6);
   for(const sx of[-1,1]){
    b.cone(.065*s,.38*s,6,x+sx*.26*s,y+.24*s,z,0x4a3b2c,[.25,0,-sx*.85]);
    b.cone(.045*s,.26*s,6,x+sx*.42*s,y+.40*s,z+.06*s,0xc8bfa8,[.4,0,-sx*.35]);
   }
  },
  totem(x,z,h){
   h=h||4.8;k.post(x,z,h,MC.woodD,.16);
   for(const y of[1.1,2.2,3.3])b.cyl(.19,.19,.12,8,x,y,z,MC.blk);
   b.box(.95,.55,.08,x,h-1.35,z,MC.red,[0,.25,0]);
   b.box(.75,.75,.07,x,h-2.25,z,0xd94826,[0,0,.785]);
   this.skull(x,h+.15,z,1.15,0);
   for(const sx of[-.45,.45])b.cone(.04,.55,5,x+sx,h-.5,z,MC.steel,[0,0,-sx*1.1]);
  },
  brazier(x,z,up){
   const u=up||0;
   k.post(x,z,u+.85,MC.blk,.38);
   b.cyl(.44,.32,.48,8,x,u+.62,z,0x2a2220);
   for(const y of[.46,.78])b.cyl(.46,.46,.06,8,x,u+y,z,MC.rust);
   b.cyl(.38,.36,.12,8,x,u+.84,z,0xff4518);
   b.cone(.28,.65,7,x,u+1.16,z,0xff8a20);
   b.cone(.16,.42,6,x,u+1.22,z,0xfff0a8);
  },
  spikes(x,z,len,ax){
   const n=Math.max(2,Math.round(len/.75));
   b.box(ax?len:.26,.22,ax?.26:len,x,.32,z,MC.woodD);
   for(let i=0;i<n;i++){
    const o=(i-(n-1)/2)*.72;
    for(const s of[-1,1]){
     b.cone(.09,1.25,5,ax?x+o:x+s*.22,.58,ax?z+s*.22:z+o,i%2?MC.wood:MC.rust,ax?[s*.68,0,0]:[0,0,-s*.68]);
    }
   }
   k.rc(ax?x-len/2:x-.45,ax?z-.45:z-len/2,ax?x+len/2:x+.45,ax?z+.45:z+len/2,.95);
  },
  cage(x,y,z){
   b.box(1.1,.08,1.1,x,y+.04,z,MC.blk);b.box(1.1,.08,1.1,x,y+1.65,z,MC.blk);
   for(const sx of[-.48,0,.48])for(const sz of[-.48,0,.48]){if(!sx&&!sz)continue;b.cyl(.025,.025,1.6,6,x+sx,y+.85,z+sz,0x34383d)}
   b.sph(.13,x,y+.28,z,0xd8cfc0,.9,7);
   k.rc(x-.55,z-.55,x+.55,z+.55,1.7);
  },
  gunRack(x,y,z,ax){
   const sx=ax?1.8:.45,sz=ax?.45:1.8;
   b.box(sx,1.55,sz,x,y+.78,z,MC.woodD);
   b.box(ax?1.68:.36,.08,ax?.36:1.68,x,y+.45,z,MC.blk);
   b.box(ax?1.68:.36,.08,ax?.36:1.68,x,y+1.15,z,MC.blk);
   for(let i=-1.5;i<=1.5;i+=1){
    const o=i*.42;
    b.cyl(.03,.035,1.18,6,ax?x+o:x,y+.82,ax?z:z+o,0x22262b);
    b.box(ax?.08:.22,.28,ax?.22:.08,ax?x+o:x,y+.36,ax?z:z+o,i%2?0x6b4a2a:0x3a3d42);
   }
   k.rc(x-sx/2,z-sz/2,x+sx/2,z+sz/2,1.55);
  },
  tower(x,z,h,rampDir){
   // Walkable 3.2x3.2 watchtower at height h with stepped access ramp
   const W=3.2,hw=W/2;
   for(const sx of[-1,1])for(const sz of[-1,1]){
    k.post(x+sx*(hw-.2),z+sz*(hw-.2),h+2.3,MC.woodD,.15);
   }
   // Cross bracing
   for(const s of[-1,1]){
    b.box(W-.3,.12,.12,x,h*.5,z+s*(hw-.2),MC.wood);
    b.box(.12,.12,W-.3,x+s*(hw-.2),h*.5,z,MC.wood);
   }
   // Walkable upper deck at y+h
   b.box(W,.22,W,x,h-.08,z,MC.wood);
   const dk={x0:k.X+x-hw,x1:k.X+x+hw,z0:k.Z+z-hw,z1:k.Z+z+hw,y:k.y+h-.35,top:k.y+h+.04,found:1,pad:1};
   ALLC.push(dk);DECKS.push(dk);
   // Parapet guard walls (with opening on ramp side)
   if(rampDir!=='S')b.box(W,.88,.14,x,h+.44,z+hw-.08,MC.corrD);
   if(rampDir!=='N')b.box(W,.88,.14,x,h+.44,z-hw+.08,MC.corrD);
   if(rampDir!=='E')b.box(.14,.88,W,x+hw-.08,h+.44,z,MC.corrD);
   if(rampDir!=='W')b.box(.14,.88,W,x-hw+.08,h+.44,z,MC.corrD);
   // Pitched roof & skull banner
   b.box(W+.4,.18,W+.4,x,h+2.35,z,MC.corr);
   b.cone(W*.78,.95,4,x,h+2.9,z,MC.red,[0,.785,0]);
   this.skull(x,h+.65,z+(rampDir==='S'?-hw-.12:hw+.12),.85,0);
   // Walkable stepped ramp along rampDir
   const steps=8,rLen=3.4;
   if(rampDir==='S'){
    for(let s=0;s<steps;s++){const u=(s+1)/steps;b.box(1.35,h*u,rLen/steps,x,h*u/2,z+hw+rLen*(1-(s+.5)/steps),MC.woodD)}
    const rp={x0:k.X+x-.68,x1:k.X+x+.68,z0:k.Z+z+hw,z1:k.Z+z+hw+rLen,y0:k.y+h+.04,y1:k.y,ramp:1,az:1};ALLC.push(rp);DECKS.push(rp);
   }else if(rampDir==='N'){
    for(let s=0;s<steps;s++){const u=(s+1)/steps;b.box(1.35,h*u,rLen/steps,x,h*u/2,z-hw-rLen*(1-(s+.5)/steps),MC.woodD)}
    const rp={x0:k.X+x-.68,x1:k.X+x+.68,z0:k.Z+z-hw-rLen,z1:k.Z+z-hw,y0:k.y,y1:k.y+h+.04,ramp:1,az:1};ALLC.push(rp);DECKS.push(rp);
   }else if(rampDir==='E'){
    for(let s=0;s<steps;s++){const u=(s+1)/steps;b.box(rLen/steps,h*u,1.35,x+hw+rLen*(1-(s+.5)/steps),h*u/2,z,MC.woodD)}
    const rp={x0:k.X+x+hw,x1:k.X+x+hw+rLen,z0:k.Z+z-.68,z1:k.Z+z+.68,y0:k.y+h+.04,y1:k.y,ramp:1};ALLC.push(rp);DECKS.push(rp);
   }
  },
  warTruck(x,z){
   // 6-Wheel Armored Raider Convoy War-Truck (aligned along Z, front at z-3.1, walkable rear flatbed at z+.4..z+2.9)
   b.box(2.35,.55,5.8,x,.68,z,0x2a2624);
   // Armored cab (front: z-2.5 to z-.6)
   b.box(2.3,1.35,2.0,x,1.62,z-1.65,0x5a221c);
   b.box(2.36,.32,2.04,x,1.88,z-1.65,0x1e2024);
   b.box(1.9,.22,.08,x,1.88,z-2.66,0xd4af37);
   // Spiked V-plow ram bumper on front
   b.box(2.65,.68,.45,x,.66,z-3.05,MC.steel);
   for(let i=-2;i<=2;i++)b.cone(.11,.65,5,x+i*.48,.68,z-3.52,0xd4af37,[-1.57,0,0]);
   this.skull(x,1.45,z-2.72,.85,0);
   // 6 heavy off-road wheels
   for(const wz of[-2.0,.2,2.0])for(const wx of[-1.22,1.22]){
    b.cyl(.48,.48,.34,12,x+wx,.48,z+wz,MC.blk,[0,0,1.5708]);
    b.cyl(.24,.24,.36,8,x+wx,.48,z+wz,MC.rust,[0,0,1.5708]);
   }
   // Walkable flatbed deck at y+.98
   const dk={x0:k.X+x-1.18,x1:k.X+x+1.18,z0:k.Z+z-.55,z1:k.Z+z+2.9,y:k.y+.4,top:k.y+.98,found:1,pad:1};
   ALLC.push(dk);DECKS.push(dk);
   // Side armored gun-shields on flatbed
   for(const sx of[-1.12,1.12])b.box(.12,.75,3.2,x+sx,1.35,z+1.15,0x3c3e42);
   // Walkable rear boarding ramp at z+2.9..z+4.3
   for(let s=0;s<4;s++){const u=(s+1)/4;b.box(1.8,.98*u,.36,x,.98*u/2,z+2.9+(1-u)*1.4,MC.steel)}
   const rp={x0:k.X+x-.9,x1:k.X+x+.9,z0:k.Z+z+2.9,z1:k.Z+z+4.35,y0:k.y+.98,y1:k.y,ramp:1,az:1};
   ALLC.push(rp);DECKS.push(rp);
   k.rc(x-1.25,z-3.3,x+1.25,z-.55,2.3);
  }
 };
}
function raiderMon(name,kind,cx,cz,w,d,y,rCount,build){
 let spawns=[];
 mon(name,cx,cz,w,d,y,k=>{
  k.spawns=spawns;
  build(k);
 });
 const m=MONS[MONS.length-1];
 if(m){
  m.raiderCamp=true;m.campKind=kind;m.targetCount=rCount;m.raiders=[];m.spawns=spawns;m.cleared=false;m.respawnT=0;
  RCAMPS.push(m);
 }
}
// VARIETY 1: Raider Warlord Citadel (6x6 Fortified Bastion, 8-10 Raiders, 2 Tier-4 War-Chests + 3 Tier-3 Elite Crates)
function raiderCitadel(){
 const s=campSite(6,6);if(!s)return;
 const rCount=8+((RCR()*3)|0); // 8 to 10 Raiders
 raiderMon('Raider Warlord Citadel','citadel',s.cx,s.cz,6,6,s.y,rCount,k=>{
  const K=monKit(k),R=rcKit(k,K),b=k.b;k.pad(7.0,6.2);
  // Outer reinforced concrete & rusted steel perimeter wall with barbed wire
  const P=[[-8.8,-8.8,8.8,-8.4],[-8.8,-8.8,-8.4,8.8],[8.4,-8.8,8.8,8.8],[-8.8,8.4,-2.4,8.8],[2.4,8.4,8.8,8.8]];
  for(const q of P){K.wall(q[0],q[1],q[2],q[3],2.6,0x4a2420);K.wire(q[0],q[1],q[2],q[3],2.66)}
  // Exterior spiked cheval-de-frise barricades flanking gate
  R.spikes(-5.4,9.3,4.2,true);R.spikes(5.4,9.3,4.2,true);
  // Towering Skull Gatehouse Arch (south entrance)
  for(const sx of[-2.5,2.5]){k.post(sx,8.6,4.8,MC.blk,.22);R.brazier(sx*1.35,7.4,0)}
  b.box(5.6,.65,.55,0,4.55,8.6,0x7a1c18);b.box(5.8,.18,.62,0,4.92,8.6,0xd4af37);
  R.skull(0,4.65,8.95,1.35,0);
  R.cage(-3.8,0,6.8);R.cage(3.8,0,6.8);
  // Twin Walkable Corner Sniper Watchtowers (NW & NE) with stepped ramps
  R.tower(-6.4,-6.4,3.2,'S');
  R.tower(6.4,-6.4,3.2,'S');
  // Central Warlord Command Bunker & Vault Stronghold
  const B=[[-3.8,-5.8,3.8,-5.4],[-3.8,-5.8,-3.4,-.4],[3.4,-5.8,3.8,-.4],[-3.8,-.8,-1.3,-.4],[1.3,-.8,3.8,-.4]];
  for(const q of B){K.wall(q[0],q[1],q[2],q[3],3.2,MC.concD);K.ribs(q[0],q[1],q[2],q[3],3.2,1.1)}
  K.roof(0,-3.1,8.0,5.8,3.35,0x3a1c1a);
  // Make bunker roof a walkable overwatch deck (y+3.5) with exterior stepped ramp on West side
  {const dk={x0:k.X-3.9,x1:k.X+3.9,z0:k.Z-5.9,z1:k.Z-.3,y:k.y+2.9,top:k.y+3.5,found:1,pad:1};ALLC.push(dk);DECKS.push(dk);
   for(let st=0;st<8;st++){const u=(st+1)/8;b.box(1.3,3.5*u,.55,-4.55,3.5*u/2,-1.0-st*.55,MC.steel)}
   const rp={x0:k.X-5.2,x1:k.X-3.9,z0:k.Z-4.95,z1:k.Z-.7,y0:k.y+3.5,y1:k.y,ramp:1,az:1};ALLC.push(rp);DECKS.push(rp)}
  K.sandbags(-2.2,-.5,2.4,true);K.sandbags(2.2,-.5,2.4,true);
  // Interior Warlord Map Table & Armory Gun Racks
  k.solid(0,-3.2,2.2,1.2,.88,MC.woodD);b.box(1.8,.05,.9,0,.92,-3.2,0x8a2820);
  R.gunRack(-2.9,0,-5.0,true);R.gunRack(2.9,0,-5.0,true);
  // Highest-Tier Loot: 2 Tier-4 Raider War-Chests + 3 Tier-3 Elite Crates + 2 Tier-2 Military Crates
  K.crate(4,-1.8,-4.8,0);K.crate(4,1.8,-4.8,0);
  K.crate(3,0,-1.8,0);K.crate(3,-2.2,-3.1,0,3.5);K.crate(3,2.2,-3.1,0,3.5);
  K.crate(2,-6.4,2.2,1.57);K.crate(2,6.4,2.2,-1.57);
  // Courtyard Totems, Braziers & Barrels
  R.totem(-2.8,3.2,5.0);R.totem(2.8,3.2,5.0);
  R.brazier(-2.2,-.1,0);R.brazier(2.2,-.1,0);
  K.barrel(-7.2,5.4,MC.red);K.barrel(-6.4,5.6,MC.blue);K.barrel(7.2,-1.8,MC.blk);K.barrel(6.5,-2.4,MC.red);
  // Garrison Spawn Posts (Warlord + 2 Tower Marksmen + Breachers & Patrol Guards)
  k.spawns.push(
   {role:'warlord',warlord:1,x:0,z:-2.6,gun:'ak',kit:'c4',nades:2,pts:[[0,-2.6],[-1.8,1.5],[1.8,1.5],[0,4.2]]},
   {role:'marksman',tower:1,x:-6.4,z:-6.4,postY:3.25,gun:'rifle',kit:'melee',nades:0},
   {role:'marksman',tower:1,x:6.4,z:-6.4,postY:3.25,gun:'rifle',kit:'melee',nades:0},
   {role:'breacher',heavy:1,x:-1.8,z:5.6,gun:'pump',kit:'satchel',nades:2,pts:[[-1.8,5.6],[-5.2,4.2],[-5.2,0],[-1.8,2.5]]},
   {role:'breacher',heavy:1,x:1.8,z:5.6,gun:'thompson',kit:'satchel',nades:2,pts:[[1.8,5.6],[5.2,4.2],[5.2,0],[1.8,2.5]]},
   {role:'assault',heavy:1,x:0,z:7.8,gun:'ak',kit:'beancan',nades:2,pts:[[0,7.8],[-3.5,7.2],[0,3.8],[3.5,7.2]]},
   {role:'flanker',heavy:0,x:-4.8,z:1.5,gun:'sar',kit:'beancan',nades:1,pts:[[-4.8,1.5],[-6.2,6.2],[0,6.2],[-4.8,-1.5]]},
   {role:'flanker',heavy:0,x:4.8,z:1.5,gun:'smg',kit:'beancan',nades:1,pts:[[4.8,1.5],[6.2,6.2],[0,6.2],[4.8,-1.5]]},
   {role:'assault',heavy:1,x:-2.6,z:1.8,gun:'thompson',kit:'beancan',nades:2,pts:[[-2.6,1.8],[2.6,1.8],[2.6,5.2],[-2.6,5.2]]},
   {role:'assault',heavy:0,x:2.6,z:1.8,gun:'sar',kit:'melee',nades:0,pts:[[2.6,1.8],[-2.6,1.8],[0,8.2],[4.2,4.5]]}
  );
 });
}
// VARIETY 2: Raider Siege Armory & Convoy Depot (6x5 Munitions Hangar & War-Truck Yard, 6-8 Raiders)
function raiderArmory(){
 const s=campSite(6,5);if(!s)return;
 const rCount=6+((RCR()*3)|0); // 6 to 8 Raiders
 raiderMon('Raider Siege Armory','armory',s.cx,s.cz,6,5,s.y,rCount,k=>{
  const K=monKit(k),R=rcKit(k,K),b=k.b;k.pad(6.6,-5.2);
  // Blast wall perimeter with barbed wire & jersey roadblocks
  const P=[[-8.8,-7.2,8.8,-6.8],[-8.8,-7.2,-8.4,7.2],[8.4,-7.2,8.8,7.2],[-8.8,6.8,-2.6,7.2],[2.6,6.8,8.8,7.2]];
  for(const q of P){K.wall(q[0],q[1],q[2],q[3],2.4,MC.corrD);K.wire(q[0],q[1],q[2],q[3],2.46)}
  K.jersey(-4.5,7.8,3.2,true);K.jersey(4.5,7.8,3.2,true);
  R.skull(0,3.6,7.0,1.15,0);b.box(5.4,.45,.45,0,3.3,7.0,0x7a1c18);
  for(const sx of[-2.6,2.6])k.post(sx,7.0,3.6,MC.blk,.2);
  // West Wing: Corrugated Steel Munitions & Ordnance Hangar
  const H=[[-7.6,-5.8,-1.2,-5.4],[-7.6,-5.8,-7.2,4.2],[-1.6,-5.8,-1.2,-1.8],[-1.6,1.2,-1.2,4.2],[-7.6,3.8,-1.2,4.2]];
  for(const q of H){K.wall(q[0],q[1],q[2],q[3],3.8,0x5a2822);K.ribs(q[0],q[1],q[2],q[3],3.8,1.1)}
  K.roof(-4.4,-.8,6.8,10.4,3.95,MC.corrD);K.vent(-4.4,4.1,-3.2);K.vent(-4.4,4.1,1.6);
  // Ordnance & Rocket Storage Racks inside Hangar
  R.gunRack(-6.5,0,-3.2,false);R.gunRack(-6.5,0,1.2,false);
  k.solid(-4.4,-4.4,3.6,.9,.9,MC.steel);
  for(let rx=-5.6;rx<=-3.2;rx+=.6){b.cyl(.08,.09,.75,8,rx,1.05,-4.4,0x3d4a28,[0,0,1.5708]);b.cone(.09,.22,8,rx+.42,1.05,-4.4,0xc4552a,[0,0,-1.5708])}
  // East Yard: 6-Wheel Armored Raider Convoy War-Truck with walkable flatbed & War-Chest!
  R.warTruck(3.6,.2);
  // North Walkable Overwatch Tower & Fuel Manifold Deck
  R.tower(5.8,-4.6,3.0,'S');
  // Highest-Tier Loot: 2 Tier-4 Raider War-Chests (1 in Armory Vault, 1 on War-Truck Bed!) + 2 Tier-3 Elite Crates + 2 Tier-2 Crates
  K.crate(4,-4.4,-2.2,0);
  k.crate(4,3.6,1.2,0,.98); // Mounted directly on the walkable Armored War-Truck flatbed!
  K.crate(3,-4.4,2.4,0);K.crate(3,5.8,-4.6,0,3.05);
  K.crate(2,.8,-5.2,0);K.crate(2,6.8,4.6,1.57);
  // Braziers, Totem & Fuel/Component Barrels
  R.brazier(-.4,-.4,0);R.brazier(1.2,5.6,0);R.totem(.8,-2.8,4.6);
  K.barrel(6.8,1.2,MC.red);K.barrel(7.4,1.8,MC.blk);K.barrel(6.8,2.5,MC.blue);K.barrel(-2.2,5.4,MC.red);
  K.sandbags(0,4.8,2.6,true);
  // Garrison Spawn Posts (6 to 8 Raiders)
  k.spawns.push(
   {role:'warlord',warlord:1,x:-3.2,z:-.6,gun:'ak',kit:'satchel',nades:2,pts:[[-3.2,-.6],[.6,-.4],[.6,3.4],[-3.2,2.2]]},
   {role:'marksman',tower:1,x:5.8,z:-4.6,postY:3.05,gun:'rifle',kit:'melee',nades:0},
   {role:'breacher',heavy:1,x:1.4,z:2.4,gun:'pump',kit:'satchel',nades:2,pts:[[1.4,2.4],[1.4,-2.4],[5.6,4.2],[0,5.2]]},
   {role:'breacher',heavy:1,x:-1.4,z:4.8,gun:'thompson',kit:'beancan',nades:2,pts:[[-1.4,4.8],[1.8,5.2],[1.8,0],[-1.4,1.2]]},
   {role:'assault',heavy:1,x:0,z:6.4,gun:'ak',kit:'beancan',nades:2,pts:[[0,6.4],[-3.6,5.8],[3.6,5.8],[0,2.8]]},
   {role:'flanker',heavy:0,x:6.2,z:0,gun:'sar',kit:'beancan',nades:1,pts:[[6.2,0],[6.2,4.8],[1.2,4.8],[1.8,-3.2]]},
   {role:'assault',heavy:0,x:-5.2,z:5.4,gun:'smg',kit:'melee',nades:0,pts:[[-5.2,5.4],[0,5.8],[1.2,-.8],[-2.8,-.8]]},
   {role:'flanker',heavy:1,x:2.2,z:-3.8,gun:'thompson',kit:'beancan',nades:1,pts:[[2.2,-3.8],[5.4,2.2],[0,4.2],[-1.2,-3.8]]}
  );
 });
}
// VARIETY 3: Raider Blood-Pit Stockade (5x5 Timber-and-Scrap Palisade Stronghold, 4-6 Raiders)
function raiderStockade(){
 const s=campSite(5,5);if(!s)return;
 const rCount=4+((RCR()*3)|0); // 4 to 6 Raiders
 raiderMon('Raider Blood-Pit Stockade','stockade',s.cx,s.cz,5,5,s.y,rCount,k=>{
  const K=monKit(k),R=rcKit(k,K),b=k.b;k.pad(-5.4,5.2);
  // Sharpened Timber Log Palisade Wall with scrap steel bands & exterior spike barriers
  const P=[[-7.2,-7.2,7.2,-6.8],[-7.2,-7.2,-6.8,7.2],[6.8,-7.2,7.2,7.2],[-7.2,6.8,-2.2,7.2],[2.2,6.8,7.2,7.2]];
  for(const q of P){K.wall(q[0],q[1],q[2],q[3],2.5,MC.woodD);K.wire(q[0],q[1],q[2],q[3],2.56)}
  R.spikes(-4.6,7.6,3.6,true);R.spikes(4.6,7.6,3.6,true);
  for(const sx of[-2.2,2.2]){k.post(sx,7.0,4.2,MC.woodD,.2);R.skull(sx,4.35,7.0,.95,0)}
  b.box(4.8,.38,.35,0,3.8,7.0,0x8a221c);
  // North Chieftain Tarp-Roofed Barracks & War-Chest Vault Hut
  const B=[[-5.6,-6.0,1.6,-5.6],[-5.6,-6.0,-5.2,-1.6],[1.2,-6.0,1.6,-1.6],[-5.6,-2.0,-3.0,-1.6],[-.8,-2.0,1.6,-1.6]];
  for(const q of B)K.wall(q[0],q[1],q[2],q[3],2.9,MC.wood);
  K.roof(-2.0,-3.8,7.6,4.6,3.05,0x255c99); // Blue tarp canopy roof over Chieftain hut
  R.gunRack(-4.8,0,-3.8,false);
  // Central Blood-Pit Bonfire Arena, Prisoner Cages & Towering Skull Totem
  R.brazier(0,1.2,0);
  R.totem(-2.4,1.2,5.2);
  R.cage(2.6,0,1.8);R.cage(-5.2,0,1.8);
  K.sandbags(0,4.2,2.8,true);
  // NE Walkable Palisade Lookout Watchtower (height 2.8m)
  R.tower(4.8,-4.6,2.8,'S');
  // Highest-Tier Loot: 1 Tier-4 Raider War-Chest + 2 Tier-3 Elite Crates + 2 Tier-2 Military Crates
  K.crate(4,-2.0,-4.6,0);
  K.crate(3,-4.2,-4.6,0);K.crate(3,4.8,-4.6,0,2.85);
  K.crate(2,.2,-4.6,0);K.crate(2,4.8,4.6,1.57);
  K.barrel(5.6,1.2,MC.red);K.barrel(5.8,2.0,MC.blue);K.barrel(-2.2,5.4,MC.rust);
  // Garrison Spawn Posts (4 to 6 Raiders)
  k.spawns.push(
   {role:'warlord',warlord:1,x:-1.8,z:-3.2,gun:'ak',kit:'beancan',nades:2,pts:[[-1.8,-3.2],[-1.8,1.2],[1.8,1.2],[0,3.6]]},
   {role:'marksman',tower:1,x:4.8,z:-4.6,postY:2.85,gun:'sar',kit:'melee',nades:0},
   {role:'breacher',heavy:1,x:0,z:5.2,gun:'pump',kit:'satchel',nades:2,pts:[[0,5.2],[-3.2,4.2],[3.2,4.2],[0,1.8]]},
   {role:'assault',heavy:1,x:2.2,z:.4,gun:'thompson',kit:'beancan',nades:2,pts:[[2.2,.4],[4.2,3.8],[-2.8,3.8],[-2.2,-.4]]},
   {role:'flanker',heavy:0,x:-3.4,z:3.2,gun:'smg',kit:'beancan',nades:1,pts:[[-3.4,3.2],[0,6.2],[3.4,3.2],[0,-.6]]},
   {role:'assault',heavy:0,x:1.6,z:3.8,gun:'revolver',kit:'melee',nades:0,pts:[[1.6,3.8],[-1.6,3.8],[0,6.4],[3.6,-.4]]}
  );
 });
}

for(let i=0;i<2;i++)outpost();for(let i=0;i<3;i++)warehouse();for(let i=0;i<3;i++)gasStation();for(let i=0;i<3;i++)shack();
for(let i=0;i<2;i++)satDish();for(let i=0;i<2;i++)oilDepot();for(let i=0;i<2;i++)sawmill();for(let i=0;i<2;i++)powerSub();for(let i=0;i<2;i++)helipadMon();raiderCitadel();raiderArmory();raiderStockade();__mark('monuments');
NAMES.recycler='Recycler';MONS.forEach((m,mi2)=>{if(m.rp){const a=Math.atan2(m.rp[1]-m.z,m.rp[0]-m.x);mkRecycler(m.rp[0],m.rp[1],-a+1.57,m.y+.055);return}for(let t=0;t<8;t++){const a=(mi2*2.1+t*.8)%6.283,rr=Math.max(5,m.r-3),x=m.x+Math.cos(a)*rr,z=m.z+Math.sin(a)*rr;if(H(x,z)>-.3){mkRecycler(x,z,-a+1.57,m.y+.055);break}}});
const ROADS=[],POSTS=[];
const gBarBody={blue:new T.CylinderGeometry(.38,.4,1.16,10),brown:new T.CylinderGeometry(.48,.5,.94,10),red:new T.CylinderGeometry(.4,.42,1.06,10),oil:new T.CylinderGeometry(.5,.52,1.02,10),white:new T.CylinderGeometry(.36,.38,1.12,10)};
const gBarHoop=new T.CylinderGeometry(.5,.5,.07,10),gBarBand=new T.CylinderGeometry(.46,.46,.1,10),gBarBung=new T.CylinderGeometry(.15,.17,.08,8),gBarDent=new T.BoxGeometry(.1,.18,.05),gBarTag=new T.BoxGeometry(.18,.08,.02),gCrossA=new T.BoxGeometry(.14,.035,.02),gCrossB=new T.BoxGeometry(.035,.14,.02);
const gKegBody=new T.CylinderGeometry(.52,.52,.72,12),gOpenIn=new T.CylinderGeometry(.32,.34,.06,10);
const mBar={blue:LMat({color:0x2a4e8c,flatShading:true}),brown:LMat({color:0x6e4630,flatShading:true}),red:LMat({color:0x922c24,flatShading:true}),oil:LMat({color:0x24262a,flatShading:true}),white:LMat({color:0xe4e0d6,flatShading:true})};
const mBand={blue:LMat({color:0xf0ece4,flatShading:true}),brown:LMat({color:0x3a2c22,flatShading:true}),red:LMat({color:0xe2b43a,flatShading:true}),oil:LMat({color:0xe0b020,flatShading:true}),white:LMat({color:0xc4322c,flatShading:true})};
const mHoopB=LMat({color:0x16181b,flatShading:true}),mSulN=LMat({color:0xe8d34a,flatShading:true}),mSulN2=LMat({color:0xb49220,flatShading:true}),mOreN=LMat({color:0xd25a16,flatShading:true}),mOreR=LMat({color:0x3c3e44,flatShading:true}),mMedCap=LMat({color:0x2f8f4e,flatShading:true});
const gCryN=new T.ConeGeometry(.15,.52,5),gOreN=new T.BoxGeometry(.14,.2,.12);
function mkBarrel(kind, variant){variant=variant||'drum';const g=new T.Group(),bodyMat=mBar[kind]||mBar.brown,bandMat=mBand[kind]||mBand.brown;
 const add=(geo,mat,x,y,z)=>{const m=new T.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);g.add(m);return m};
 if(variant==='jerry'){add(boxGeo(.46,.7,.3),bodyMat,0,.38,0);add(boxGeo(.5,.06,.34),bandMat,0,.16,0);add(boxGeo(.5,.06,.34),mHoopB,0,.58,0);add(boxGeo(.16,.08,.16),mHoopB,.1,.76,0);add(boxGeo(.04,.14,.04),mHoopB,-.16,.78,.08);add(boxGeo(.04,.14,.04),mHoopB,-.16,.78,-.08);add(boxGeo(.18,.04,.04),mHoopB,-.16,.86,0);g.userData.rad=.5}
 else if(variant==='crushed'){const body=add(gBarBody[kind]||gBarBody.brown,bodyMat,0,.28,0);body.scale.set(1.15,.42,1.05);body.rotation.z=.18;add(gBarDent,mHoopB,.42,.3,.1).scale.set(1.4,1.6,1.2);add(gBarHoop,mHoopB,0,.16,0).scale.set(1.05,.6,1);add(gBarHoop,mHoopB,0,.4,0).scale.set(1.02,.5,.95);g.userData.rad=.7}
 else if(variant==='open'){const body=add(gBarBody.brown,bodyMat,0,.48,0);body.scale.set(1,.92,1);add(gBarHoop,mHoopB,0,.16,0).scale.set(1.02,1,1.02);add(gBarHoop,mHoopB,0,.78,0).scale.set(1.04,1,1.04);add(gOpenIn,mHoopB,0,.92,0);const lip=add(boxGeo(.22,.06,.34),bandMat,.16,.98,0);lip.rotation.z=-.35;add(gBarTag,mHoopB,.42,.5,0);g.userData.rad=.58}
 else if(variant==='twin'){const geo=gBarBody.white;const a=add(geo,bodyMat,-.28,.42,0);a.scale.set(.72,.78,.72);const b=add(geo,bandMat,.28,.36,.06);b.scale.set(.66,.7,.66);add(gBarHoop,mHoopB,-.28,.2,0).scale.set(.78,.7,.78);add(gBarHoop,mHoopB,.28,.18,.06).scale.set(.72,.6,.72);add(boxGeo(.12,.08,.4),mHoopB,0,.22,0);g.userData.rad=.72}
 else if(variant==='keg'){add(gKegBody,bodyMat,0,.4,0);add(gBarHoop,mHoopB,0,.18,0).scale.set(1.12,.8,1.12);add(gBarHoop,mHoopB,0,.4,0).scale.set(1.16,.7,1.16);add(gBarHoop,mHoopB,0,.62,0).scale.set(1.12,.8,1.12);add(gBarBung,bandMat,0,.78,0).scale.set(1.1,.8,1.1);g.userData.rad=.62}
 else{variant='drum';const bodyGeo=gBarBody[kind]||gBarBody.brown,sc=kind==='oil'?1.16:kind==='blue'?1:kind==='white'?.92:kind==='red'?1.02:1.04,yScale=kind==='oil'?.72:1,h=bodyGeo.parameters.height*yScale,rad=(bodyGeo.parameters.radiusTop||.45)*sc,hs=rad/.48;
  const body=add(bodyGeo,bodyMat,0,h/2,0);body.scale.set(sc,yScale,sc);
  if(kind==='oil'){add(gBarHoop,mBand.oil,0,h*.32,0).scale.set(hs,.7,hs);add(gBarHoop,mHoopB,0,h*.68,0).scale.set(hs,.7,hs);const tap=add(gBarBung,mBand.oil,rad+.02,h*.42,0);tap.rotation.z=Math.PI/2;add(gBarTag,mHoopB,rad+.12,h*.42,0)}
  else if(kind==='white'){add(gBarHoop,mBand.white,0,h*.18,0).scale.set(hs,1,hs);add(gBarHoop,mBand.white,0,h*.8,0).scale.set(hs,1,hs);add(gCrossA,mBand.white,0,h*.5,rad*.72);add(gCrossB,mBand.white,0,h*.5,rad*.72);add(gBarBung,mMedCap,0,h+.03,0).scale.set(1.35,.7,1.35)}
  else if(kind==='blue'){add(gBarHoop,mBand.blue,0,h*.16,0).scale.set(hs,1,hs);add(gBarHoop,mBand.blue,0,h*.84,0).scale.set(hs,1,hs);add(gBarBand,mBand.blue,0,h*.5,0).scale.set(hs*.98,1.2,hs*.98);add(gBarBung,mBand.blue,0,h+.04,0).scale.set(1.35,.6,1.35)}
  else if(kind==='red'){add(gBarBand,mBand.red,0,h*.5,0).scale.set(hs,1.35,hs);add(gBarHoop,mHoopB,0,h*.14,0).scale.set(hs*.96,1,hs*.96);add(gBarHoop,mHoopB,0,h*.86,0).scale.set(hs*.96,1,hs*.96);add(gBarTag,mHoopB,0,h*.5,rad*.85);add(gBarBung,mHoopB,0,h+.03,0).scale.set(1.3,.55,1.3)}
  else{add(gBarHoop,mHoopB,0,h*.2,0).scale.set(hs,1,hs);add(gBarHoop,mHoopB,0,h*.78,0).scale.set(hs,1,hs);add(gBarBand,mBand.brown,0,h*.48,0).scale.set(hs*.96,.7,hs*.96);add(gBarHoop,mHoopB,0,h-.05,0).scale.set(hs*.72,.5,hs*.72);add(gBarDent,mHoopB,rad*.92,h*.36,0)}
  g.userData.rad=kind==='oil'?.66:.56}
 g.userData.kind=kind;g.userData.variant=variant;g.userData.uses=1;return g}
function mkSulfurNode(){const g=new T.Group();
 const r=new T.Mesh(gRock,mRock2);r.scale.set(1.42,.58,1.32);r.position.y=.02;g.add(r);
 for(let i=0;i<8;i++){const a=i*.785+(Math.random()-.5)*.35,rad=.12+Math.random()*.36,c=new T.Mesh(gCryN,i%2?mSulN:mSulN2);c.position.set(Math.cos(a)*rad,.36+Math.random()*.14,Math.sin(a)*rad);c.rotation.set((Math.random()-.5)*.45,Math.random()*6,(Math.random()-.5)*.45);c.scale.setScalar(1.25+Math.random()*1.05);g.add(c)}
 g.scale.setScalar(1.32);g.userData.uses=2;g.userData.rad=.95;return g}
function mkOreNode(){const g=new T.Group();const r=new T.Mesh(gRock,mOreR);r.scale.set(.95,.54,.84);r.position.y=.02;r.rotation.y=Math.random()*3;g.add(r);for(let i=0;i<5;i++){const c=new T.Mesh(gOreN,mOreN);c.position.set((Math.random()-.5)*.46,.22+Math.random()*.14,(Math.random()-.5)*.38);c.rotation.set(Math.random()*.6,Math.random(),Math.random()*.4);g.add(c)}g.scale.setScalar(1.55);g.userData.uses=2;g.userData.rad=.88;return g}
function resamplePath(path,step){if(!path||path.length<2)return path?path.slice():[];const out=[path[0]];let acc=0;for(let i=1;i<path.length;i++){let x0=path[i-1].x,z0=path[i-1].z,x1=path[i].x,z1=path[i].z,seg=Math.hypot(x1-x0,z1-z0);if(seg<1e-4)continue;while(acc+seg>=step){const t=(step-acc)/Math.max(seg,1e-4);x0+=(x1-x0)*t;z0+=(z1-z0)*t;out.push({x:x0,z:z0});seg=Math.hypot(x1-x0,z1-z0);acc=0;if(out.length>700)return out}acc+=seg}const last=path[path.length-1];if(Math.hypot(out[out.length-1].x-last.x,out[out.length-1].z-last.z)>.8)out.push(last);return out}
function dryPath(ax,az,bx,bz){const dx=bx-ax,dz=bz-az,dist=Math.hypot(dx,dz)||1,n=Math.max(2,Math.ceil(dist/14)),px=-dz/dist,pz=dx/dist,pts=[];
 // Gentle S-curves that fade to zero at both ends, so junction points stay exact.
 const amp=Math.min(24,dist*.1),p1=hash(ax*.37+bz,az*.41+bx)*6.283,p2=hash(bx*.53+az,bz*.29+ax)*6.283,f1=1.2+hash(ax,bz)*1.1;
 for(let i=0;i<=n;i++){const t=i/n,m=Math.sin(Math.PI*t)*amp*(Math.sin(t*Math.PI*f1*2+p1)*.7+Math.sin(t*Math.PI*5.3+p2)*.3);let x=ax+dx*t+px*m,z=az+dz*t+pz*m;if(i>0&&i<n&&H(x,z)<.55){let bh=H(x,z),bx2=x,bz2=z;for(const s of[12,-12,24,-24,40,-40]){const nx=x+px*s,nz=z+pz*s,nh=H(nx,nz);if(nh>bh){bh=nh;bx2=nx;bz2=nz}}x=bx2;z=bz2}pts.push({x,z})}
 let sm=pts;for(let pass=0;pass<2&&sm.length>2;pass++){const q=[sm[0]];for(let i=1;i<sm.length-1;i++)q.push({x:(sm[i-1].x+sm[i].x*2+sm[i+1].x)/4,z:(sm[i-1].z+sm[i].z*2+sm[i+1].z)/4});q.push(sm[sm.length-1]);sm=q}return sm}
// Every road that reaches a monument ends on its access ring at the point facing where the road comes from, so junctions really meet.
function monGate(m,toward){const a=Math.atan2(toward.z-m.z,toward.x-m.x),r=(m.r||14)+10;return{x:m.x+Math.cos(a)*r,z:m.z+Math.sin(a)*r}}
function monRing(m){const r=(m.r||14)+10,pts=[];for(let i=0;i<=28;i++){const a=i/28*6.2832;pts.push({x:m.x+Math.cos(a)*r,z:m.z+Math.sin(a)*r})}return pts}
function pairBeside(a,b){const dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz)||1,px=-dz/d,pz=dx/d,side=hash((a.x+b.x)|0,(a.z+b.z)|0)>.5?1:-1,off=Math.max(a.r||14,b.r||14)+10;return{A:{x:a.x+px*side*off,z:a.z+pz*side*off},B:{x:b.x+px*side*off,z:b.z+pz*side*off}}}
function rimPoint(m,toward){const dx=toward.x-m.x,dz=toward.z-m.z,d=Math.hypot(dx,dz)||1,px=-dz/d,pz=dx/d,side=hash(Math.round(m.x),Math.round((toward.x||0)+(toward.z||0)))>.5?1:-1,off=(m.r||14)+12;return {x:m.x+px*side*off,z:m.z+pz*side*off}}
function shovePathOffMons(path){if(!path||path.length<2)return path;for(let pass=0;pass<4;pass++){for(const m of MONS){const need=(m.r||12)+7;let hit=false;for(const pt of path)if(Math.hypot(pt.x-m.x,pt.z-m.z)<need){hit=true;break}if(!hit)continue;const side=hash(Math.round(m.x),Math.round(m.z))>.5?1:-1;for(let i=0;i<path.length;i++){const pt=path[i],ox=pt.x-m.x,oz=pt.z-m.z;if(Math.hypot(ox,oz)>=need)continue;let dx=0,dz=0;if(i<path.length-1){dx+=path[i+1].x-pt.x;dz+=path[i+1].z-pt.z}if(i>0){dx+=pt.x-path[i-1].x;dz+=pt.z-path[i-1].z}let len=Math.hypot(dx,dz);if(len<1e-3){dx=1;dz=0;len=1}dx/=len;dz/=len;const along=ox*dx+oz*dz;pt.x=m.x+dx*along+(-dz)*side*need;pt.z=m.z+dz*along+dx*side*need}}}return path}
let SEGS=[],roadGrid=new Map(),Hg=H;const RCELL=24;
function onPad(x,z){for(const m of MONS)if(Math.hypot(m.x-x,m.z-z)<(m.r||12)-3.5)return true;const cx=Math.round(x/C),cz=Math.round(z/C);for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){if(!FD.has(key(cx+i,cz+j)))continue;if(Math.hypot(x-(cx+i)*C,z-(cz+j)*C)<8)return true}return false}
function roadSpec(kind){return kind==='trail'?{half:1.62,edge:.72,lift:.06,sh:0xb08958,mid:0x3e2c1c}:{half:4.15,edge:.9,lift:.07,sh:0xe4d4a6,mid:0x4a3824}}
function smoothStations(path){const pts=resamplePath(path,4);if(pts.length<2)return [];const raw=pts.map(p=>({x:p.x,z:p.z,y:H(p.x,p.z)}));let ys=raw.map(p=>p.y);for(let pass=0;pass<4;pass++){const n=ys.slice();for(let i=1;i<ys.length-1;i++)n[i]=(ys[i-1]+ys[i]*2+ys[i+1])/4;ys=n}for(let i=0;i<ys.length;i++)ys[i]=Math.max(raw[i].y-1.35,Math.min(raw[i].y+1.35,ys[i]));return raw.map((p,i)=>({x:p.x,z:p.z,y:ys[i],raw:p.y}))}
function splitRuns(pts){const runs=[],flush=()=>{if(cur.length>1)runs.push(cur);cur=[]};let cur=[];for(const p of pts){if(p.raw<.42||p.y<.4||onPad(p.x,p.z)||nearMon(p.x,p.z,4)){flush();continue}if(cur.length&&Math.hypot(p.x-cur[cur.length-1].x,p.z-cur[cur.length-1].z)>16){flush();cur=[p];continue}cur.push(p)}flush();return runs}
function segHit(s,x,z){const dx=s.bx-s.ax,dz=s.bz-s.az;let u=((x-s.ax)*dx+(z-s.az)*dz)/(s.l2||1);if(u<0)u=0;else if(u>1)u=1;const px=s.ax+dx*u,pz=s.az+dz*u,ox=x-px,oz=z-pz;return{dist:Math.hypot(ox,oz),y:s.y0+(s.y1-s.y0)*u,px,pz,nx:-s.dz,nz:s.dx,side:(ox*-s.dz+oz*s.dx)>=0?1:-1,half:s.half,edge:s.edge,lift:s.lift}}
function indexSeg(s){SEGS.push(s);const pad=s.half+s.edge+20,x0=Math.floor((Math.min(s.ax,s.bx)-pad)/RCELL),x1=Math.floor((Math.max(s.ax,s.bx)+pad)/RCELL),z0=Math.floor((Math.min(s.az,s.bz)-pad)/RCELL),z1=Math.floor((Math.max(s.az,s.bz)+pad)/RCELL);for(let i=x0;i<=x1;i++)for(let j=z0;j<=z1;j++){const k=i+','+j;let b=roadGrid.get(k);if(!b){b=[];roadGrid.set(k,b)}b.push(s)}}
function visitRoads(x,z,fn){const b=roadGrid.get((Math.floor(x/RCELL))+','+(Math.floor(z/RCELL)));if(!b)return;for(let n=0;n<b.length;n++)fn(segHit(b[n],x,z))}
function roadAt(x,z){let top=null;visitRoads(x,z,h=>{const outer=h.half+h.edge;if(h.dist>outer+2.5)return;const deck=h.y+h.lift;let y=deck;if(h.dist>outer){const t=(h.dist-outer)/2.5,s=t*t*(3-2*t);y=deck*(1-s)+Hg(x,z)*s}if(top==null||y>top)top=y});return top}
function rebuildRoads(runs){SEGS=[];roadGrid=new Map();for(const run of runs){const spec=run.spec;for(let i=1;i<run.pts.length;i++){const a=run.pts[i-1],b=run.pts[i],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz);if(l<.35)continue;indexSeg({ax:a.x,az:a.z,bx:b.x,bz:b.z,y0:a.y,y1:b.y,dx:dx/l,dz:dz/l,l2:l*l,half:spec.half,edge:spec.edge,lift:spec.lift+run.ri*.0008,ri:run.ri})}}}
function gradeTerrain(){if(!terrMesh)return;const pos=terrMesh.geometry.attributes.position,col=terrMesh.geometry.attributes.color,W=TN+1,dirt=new T.Color(0xc6a56e),tmp=new T.Color();
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),ix=Math.round((x/TS+.5)*TN),iy=Math.round((.5-z/TS)*TN);if(ix<0||iy<0||ix>TN||iy>TN)continue;const gi=iy*W+ix,y0=HG[gi];if(y0<.35||onPad(x,z))continue;let bestS=0,bestY=y0;visitRoads(x,z,h=>{const inner=Math.max(h.half+1.1,10.2),outer=inner+8;if(h.dist>=outer)return;let s=1;if(h.dist>inner){const t=(h.dist-inner)/(outer-inner);s=1-t*t*(3-2*t)}if(s>bestS){bestS=s;bestY=h.y}});if(bestS<.04)continue;const cap=bestS>.97?4.2:2.2,dy=Math.max(-cap,Math.min(cap,bestY-y0)),ny=y0+dy*bestS;HG[gi]=ny;pos.setY(i,ny);if(bestS>.18){tmp.setRGB(col.getX(i),col.getY(i),col.getZ(i));tmp.lerp(dirt,Math.min(.62,bestS*.58));col.setXYZ(i,tmp.r,tmp.g,tmp.b)}}
 pos.needsUpdate=true;col.needsUpdate=true;terrMesh.geometry.computeVertexNormals();terrMesh.geometry.computeBoundingSphere()}
function liftRuns(runs){for(const run of runs){const pts=run.pts,spec=run.spec;for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];let dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const px=-dz,pz=dx;let top=pts[i].y;for(const w of[0,spec.half*.65,-spec.half*.65])top=Math.max(top,Hg(pts[i].x+px*w,pts[i].z+pz*w));if(top>pts[i].y)pts[i].y=Math.min(top,pts[i].raw+1.8)}}}
let ROADMAT=null;
function roadMaterial(){if(ROADMAT)return ROADMAT;const cv=document.createElement('canvas');cv.width=256;cv.height=128;const g=cv.getContext('2d');
 g.fillStyle='#6d5846';g.fillRect(0,0,256,128);
 g.fillStyle='#3b2d1f';g.fillRect(0,0,256,12);g.fillRect(0,116,256,12);
 g.fillStyle='#8c7a62';g.fillRect(0,12,256,10);g.fillRect(0,106,256,10);
 // Cut-stone / concrete border curb blocks (y=22..34 and y=94..106)
 g.fillStyle='#c8c2b4';g.fillRect(0,22,256,12);g.fillRect(0,94,256,12);
 for(let bx=0;bx<256;bx+=16){
  const v=194+(((hash(bx,9.1)-.5)*22)|0),v2=194+(((hash(bx,4.7)-.5)*22)|0);
  g.fillStyle=`rgb(${v},${v-4},${v-12})`;g.fillRect(bx+1,23,14,10);
  g.fillStyle=`rgb(${v2},${v2-4},${v2-12})`;g.fillRect(bx+1,95,14,10);
  g.fillStyle='rgba(36,32,26,.85)';g.fillRect(bx,22,2,12);g.fillRect(bx,94,2,12);
  g.fillStyle='rgba(248,244,232,.55)';g.fillRect(bx+2,31,13,2);g.fillRect(bx+2,95,13,2);
 }
 g.fillStyle='rgba(30,22,16,.68)';g.fillRect(0,34,256,4);g.fillRect(0,90,256,4);
 for(let i=0;i<1200;i++){
  const x=(hash(i,1.7)*256)|0,y=(hash(2.2,i)*128)|0;
  if((y>=22&&y<=34)||(y>=94&&y<=106))continue;
  const v=66+(hash(i,i)*104)|0,s=hash(i,9)>.8?3:1;
  g.fillStyle=`rgb(${v+14},${v-2},${v-18})`;g.fillRect(x,y,s,s+(i%3===0?1:0));
 }
 for(const ry of[47,81]){
  g.strokeStyle='rgba(34,24,16,.74)';g.lineWidth=7;g.lineCap='round';
  g.beginPath();for(let x=0;x<=256;x+=6){const y=ry+Math.sin(x*.08)*1.8+(hash(x,ry)-.5)*2.4;if(x===0)g.moveTo(0,y);else g.lineTo(x,y)}g.stroke();
 }
 g.fillStyle='rgba(196,174,132,.22)';g.fillRect(0,56,256,16);
 g.fillStyle='rgba(218,176,74,.42)';for(let x=6;x<256;x+=32)g.fillRect(x,62,17,4);
 const tex=polish(new T.CanvasTexture(cv));tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.colorSpace=T.SRGBColorSpace;
 ROADMAT=LMat({map:tex,vertexColors:true,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});return ROADMAT}
function buildRoadMesh(runs){const pos=[],col=[],uv=[],idx=[],N=13;
 const ditchC=new T.Color(0x463626),shC=new T.Color(0x9e8c70),curbC=new T.Color(0xd8d3c6),curbTrC=new T.Color(0x9a8264),rutC=new T.Color(0x6e543c),laneC=new T.Color(0xa68860),crownC=new T.Color(0xc4a87c),bedC=new T.Color(0x584432);
 const inOtherLane=(wx,wz,ri)=>{let hit=false;const b=roadGrid.get((Math.floor(wx/RCELL))+','+(Math.floor(wz/RCELL)));if(!b)return false;for(let n=0;n<b.length;n++){const s=b[n];if(s.ri===ri)continue;const h=segHit(s,wx,wz);if(h.dist<h.half+.35){hit=true;break}}return hit};
 for(const run of runs){const pts=run.pts,spec=run.spec;if(pts.length<2)continue;
  const isTrail=spec.half<2,k=isTrail?.68:1,W=spec.half,E=spec.edge,L=spec.lift,cB=isTrail?curbTrC:curbC,cH=L+(isTrail?.075:.115);
  const prof=[
   [-(W+E+.7*k),.014],[-(W+E+.22*k),-.012*k],[-(W+.26*k),L*.38],
   [-(W+.08*k),cH],[-(W-.06*k),L*.48],[-W*.58,L*.42],[-W*.26,L*.86],[0,L+.05],[W*.26,L*.86],[W*.58,L*.42],[W-.06*k,L*.48],[W+.08*k,cH],
   [W+E+.7*k,.014]
  ];
  const vMap=[0,.09,.17,.22,.28,.37,.44,.5,.56,.63,.72,.78,1];
  const tint=[ditchC,ditchC,shC,cB,rutC,rutC,laneC,crownC,laneC,rutC,rutC,cB,ditchC];
  const base=pos.length/3;let dist=0;
  for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];
   let dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const px=-dz,pz=dx,x=pts[i].x,z=pts[i].z,y=pts[i].y+run.ri*.0008;
   if(i)dist+=Math.hypot(pts[i].x-pts[i-1].x,pts[i].z-pts[i-1].z);
   const jit=.92+hash(x*.37,z*.41)*.14,wob=(hash(x*.21+i,z*.17)-.5)*.015;
   const cutL=inOtherLane(x+px*prof[3][0],z+pz*prof[3][0],run.ri),cutR=inOtherLane(x+px*prof[11][0],z+pz*prof[11][0],run.ri);
   for(let p=0;p<N;p++){const lat=prof[p][0],isCL=p===3&&cutL,isCR=p===11&&cutR,yy=(isCL||isCR)?L*.38:prof[p][1]+(p===5||p===9?wob:0),c=(isCL||isCR)?laneC:tint[p],vv=(isCL||isCR)?.44:vMap[p];pos.push(x+px*lat,y+yy,z+pz*lat);col.push(c.r*jit,c.g*jit,c.b*jit);uv.push(dist/6.5,vv)}
   for(let p=2;p<=10;p++){pos.push(x+px*prof[p][0],y+.018,z+pz*prof[p][0]);col.push(bedC.r*jit*.9,bedC.g*jit*.9,bedC.b*jit*.9);uv.push(dist/6.5,(p-2)/8)}
   if(!i)continue;
   const stride=N+9,q=base+(i-1)*stride,q2=q+stride;
   for(let a2=0;a2<N-1;a2++){const A=q+a2,B=q+a2+1,C=q2+a2,D=q2+a2+1;idx.push(A,C,B,B,C,D)}
   const b0=q+N,b1=q2+N;
   for(let a2=0;a2<8;a2++){const A=b0+a2,B=b0+a2+1,C=b1+a2,D=b1+a2+1;idx.push(A,B,C,B,D,C)}
   idx.push(q+2,q2+2,b0,q2+2,b1,b0);
   idx.push(q+10,b0+8,q2+10,q2+10,b0+8,b1+8)}}
 if(pos.length<12)return;const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('color',new T.Float32BufferAttribute(col,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(new T.Uint32BufferAttribute(idx,1));geo.computeVertexNormals();
 const m=new T.Mesh(geo,roadMaterial());m.frustumCulled=false;m.renderOrder=2;scene.add(m)}
function shoveOff(o,hit){const need=hit.half+hit.edge+(o.userData.k==='barrel'?1.55:1.4);for(const extra of[0,2.6])for(const sgn of[hit.side,-hit.side]){const nx=hit.px+hit.nx*sgn*(need+extra),nz=hit.pz+hit.nz*sgn*(need+extra);if(Hg(nx,nz)>.48&&(extra||!onPad(nx,nz))){o.position.x=nx;o.position.z=nz;return true}}return false}
function terrainGrad(x,z){
 const d=1.2,gx=(H(x+d,z)-H(x-d,z))/(2*d),gz=(H(x,z+d)-H(x,z-d))/(2*d);
 return {gx,gz,sl:Math.hypot(gx,gz)};
}
function slopeSink(x,z,rad){
 const {sl}=terrainGrad(x,z);
 return Math.min(.42,(rad||.45)*sl*.62);
}
function snapWorld(){const drop=[];
 for(const o of things){
  const k=o.userData&&o.userData.k;
  if(k!=='barrel'&&k!=='ore'&&k!=='sulfur'&&k!=='junk'&&k!=='rock'&&k!=='tree'&&k!=='bush'&&k!=='hemp')continue;
  let hit=null;visitRoads(o.position.x,o.position.z,h=>{if(!hit||h.dist<hit.dist)hit=h});
  const x0=o.position.x,z0=o.position.z;
  if(hit&&hit.dist<hit.half+hit.edge+.35){
   if(!shoveOff(o,hit)){
    if(o.userData.farm){o.position.x=hit.px+hit.nx*(hit.side||1)*(hit.half+hit.edge+3.4);o.position.z=hit.pz+hit.nz*(hit.side||1)*(hit.half+hit.edge+3.4)}
    else drop.push(o);
   }
  }
  if(drop.indexOf(o)>=0)continue;
  if(inPond(o.position.x,o.position.z)||onFound(o.position.x,o.position.z)){drop.push(o);continue}
  const y=H(o.position.x,o.position.z);
  if(y<.35){drop.push(o);continue}
  const rad=propColRad(o,k),sink=k==='barrel'&&Math.abs(o.rotation.z)>.4?-.38:slopeSink(o.position.x,o.position.z,rad);
  const ny=y-sink;
  if(k==='rock'||k==='junk'||k==='ore'||k==='sulfur'||k==='bush'){
   const {gx,gz}=terrainGrad(o.position.x,o.position.z),tiltK=k==='bush'?.35:.48;
   o.rotation.x=Math.max(-.28,Math.min(.28,gz*tiltK));
   o.rotation.z=Math.max(-.28,Math.min(.28,-gx*tiltK));
  }
  o.position.y=ny;o.updateMatrix();o.traverse(c=>{c.updateMatrix()});
 }
 for(const o of drop){const i=things.indexOf(o);if(i>=0)things.splice(i,1);scene.remove(o)}
 for(let i=LOGS.length-1;i>=0;i--){
  const m=LOGS[i];let on=false;visitRoads(m.position.x,m.position.z,h=>{if(h.dist<h.half+h.edge+1.25)on=true});
  if(on||inPond(m.position.x,m.position.z)||onFound(m.position.x,m.position.z)||H(m.position.x,m.position.z)<.55){scene.remove(m);LOGS.splice(i,1);continue}
  const lx=m.position.x,lz=m.position.z,ry=m.rotation.y||0,ax=Math.cos(ry),az=-Math.sin(ry);
  const yA=H(lx-ax*1.1,lz-az*1.1),yB=H(lx+ax*1.1,lz+az*1.1),ym=H(lx,lz);
  m.position.y=Math.min(ym,(yA+yB)*.5)+.14;
  m.rotation.z=1.5708+Math.atan2(yB-yA,2.2)*.85;
  m.updateMatrix();
  for(const s of [-.85,0,.85])addStaticCol(lx+ax*s,lz+az*s,m.position.y-.14,.24,.45,'log');
 }
 for(const r of RECYS){
  const m=MONS.find(q=>Math.hypot(q.x-r.x,q.z-r.z)<q.r+4);
  r.y=m?m.y+.055:G(r.x,r.z,r.y+1);
  const ro=things.find(o=>o.userData&&o.userData.rc===r);
  if(ro){ro.position.y=r.y;ro.updateMatrix()}
 }
 for(const n of NP){n.y=Math.max(G(n.x,n.z,n.y),0);n.m.position.set(n.x,n.y,n.z)}
 for(const a of DE.concat(WV)){if(!a||!a.m)continue;a.y=Math.max(H(a.x,a.z),0);a.m.position.y=a.y}
 P.y=Math.max(G(P.x,P.z),-2.9)+1.7}
function cullFarBarrels(){for(let i=things.length-1;i>=0;i--){const o=things[i];if(!o.userData||o.userData.k!=='barrel')continue;let near=false;visitRoads(o.position.x,o.position.z,h=>{if(h.dist<h.half+h.edge+2.8)near=true});if(!near){scene.remove(o);things.splice(i,1)}}}
function seatRoads(){Hg=H;const runs=[];ROADS.forEach((rd,ri)=>{const spec=roadSpec(rd.kind);for(const pts of splitRuns(smoothStations(rd.pts)))runs.push({pts,spec,ri})});rebuildRoads(runs);gradeTerrain();liftRuns(runs);rebuildRoads(runs);gradeTerrain();liftRuns(runs);rebuildRoads(runs);buildRoadMesh(runs);H=(x,z)=>{const y=roadAt(x,z);return y==null?Hg(x,z):y};const placed=[],pDummy=new T.Object3D();for(const p of POSTS){if(onPad(p.x,p.z)){p.skip=1;continue}const y=H(p.x,p.z);if(y<.5||y>9.2){p.skip=1;continue}let close=false;for(const q of placed)if((q.x-p.x)*(q.x-p.x)+(q.z-p.z)*(q.z-p.z)<1.4){close=true;break}if(close){p.skip=1;continue}p.y=y;placed.push(p)}if(placed.length){const pm=new T.InstancedMesh(gRoadPost,mRoadPost,placed.length);for(let i=0;i<placed.length;i++){const p=placed[i];pDummy.position.set(p.x,p.y+.72,p.z);pDummy.updateMatrix();pm.setMatrixAt(i,pDummy.matrix)}pm.instanceMatrix.needsUpdate=true;pm.frustumCulled=false;scene.add(pm)}snapWorld();cullFarBarrels();reseatFoundations()}
function densePath(path,step){const out=[path[0]];for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],d=Math.hypot(b.x-a.x,b.z-a.z),n=Math.ceil(d/step);for(let k=1;k<n;k++){const t=k/n;out.push({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t})}out.push(b)}path.length=0;for(const p of out)path.push(p);return path}
function baseBlobs(){const o=[];for(const n of NP){const l=n.lot||(n.tc?{x:n.tc.x,z:n.tc.z}:null);if(!l)continue;const p=n.plan||{w:2,d:2},rA=Math.max(14,Math.hypot(p.w,p.d)*C/2+4);let b={x:l.x,z:l.z,r:rA};if(n.farm){const rB=9,dx=n.farm.x-l.x,dz=n.farm.z-l.z,d=Math.hypot(dx,dz);if(d+rB>rA){const R=(d+rA+rB)/2,k=d>1e-3?(R-rA)/d:0;b={x:l.x+dx*k,z:l.z+dz*k,r:R}}}o.push(b)}return o}
function shovePathOffBases(path,kind){if(!path||path.length<2)return path;const ro=kind==='trail'?2.4:5.1,obs=baseBlobs().map(o=>({x:o.x,z:o.z,need:o.r+ro+1.5}));if(!obs.length)return path;for(const m of MONS)obs.push({x:m.x,z:m.z,need:(m.r||12)+7});const W=5;for(let pass=0;pass<10;pass++){let moved=false;for(const o of obs){const S=path.map(p=>({x:p.x,z:p.z})),n=S.length,near=q=>Math.hypot(q.x-o.x,q.z-o.z)<o.need-.05;let i=0;while(i<n){if(!near(S[i])){i++;continue}let j=i;while(j+1<n&&near(S[j+1]))j++;const a=S[Math.max(0,i-1)],b=S[Math.min(n-1,j+1)];let dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz);if(len<1e-3){dx=1;dz=0;len=1}dx/=len;dz/=len;let bk=i,bd=1e9;for(let k=i;k<=j;k++){const d=Math.hypot(S[k].x-o.x,S[k].z-o.z);if(d<bd){bd=d;bk=k}}const sg=(S[bk].x-o.x)*(-dz)+(S[bk].z-o.z)*dx,side=Math.abs(sg)>.5?(sg>0?1:-1):(hash(Math.round(o.x),Math.round(o.z))>.5?1:-1),D=[];for(let k=i;k<=j;k++){const al=(S[k].x-o.x)*dx+(S[k].z-o.z)*dz,nx=o.x+dx*al+(-dz)*side*o.need,nz=o.z+dz*al+dx*side*o.need;D.push([nx-S[k].x,nz-S[k].z]);path[k].x=nx;path[k].z=nz}for(let m=1;m<=W;m++){const w=.5*(1+Math.cos(Math.PI*m/(W+1))),l=i-m,r=j+m;if(l>=0&&!near(S[l])){path[l].x=S[l].x+D[0][0]*w;path[l].z=S[l].z+D[0][1]*w}if(r<n&&!near(S[r])){const e=D[D.length-1];path[r].x=S[r].x+e[0]*w;path[r].z=S[r].z+e[1]*w}}moved=true;i=j+1}}if(!moved)break}return path}
function pave(path,kind){if(!path||path.length<2)return;shovePathOffMons(path);densePath(path,6);shovePathOffBases(path,kind);ROADS.push({pts:path,kind})}
function nearMon(x,z,pad){for(const m of MONS)if(Math.hypot(m.x-x,m.z-z)<m.r+(pad||0))return true;return false}
function nearBase(x,z,pad){for(const d of devs)if(d.t==='tc'&&!d._gone&&Math.hypot(d.x-x,d.z-z)<(pad||12))return true;return false}
function plantProp(o,x,y,z){o.position.set(x,y,z);scene.add(o);things.push(o);o.updateMatrix();o.traverse(c=>{c.updateMatrix();c.matrixAutoUpdate=false})}
const barrelPts=[];let barrelN=0;const BARREL_CAP=320;const BARREL_KINDS=['brown','brown','brown','blue','blue','white','red','red','oil'];
const BARREL_VARIANTS=['drum','drum','crushed','open','jerry','keg','twin','drum'];
function tryBarrel(x,z,monPad,minSpawn){if(barrelN>=BARREL_CAP)return false;const y=H(x,z);if(y<.48||y>8.5||Math.hypot(x-SP.x,z-SP.z)<(minSpawn==null?8:minSpawn)||nearMon(x,z,monPad==null?1.2:monPad)||nearBase(x,z,8))return false;for(let i=0;i<barrelPts.length;i++)if(Math.hypot(barrelPts[i].x-x,barrelPts[i].z-z)<6.2)return false;const kind=BARREL_KINDS[Math.min(BARREL_KINDS.length-1,hash(x*2.1,z*1.7)*BARREL_KINDS.length|0)],variant=BARREL_VARIANTS[Math.min(BARREL_VARIANTS.length-1,hash(x*5.1,z*3.3)*BARREL_VARIANTS.length|0)];const o=mkBarrel(kind,variant);o.userData.k='barrel';o.rotation.y=hash(x,z)*6.283;if(hash(x+4,z+1)<.14){o.rotation.z=(hash(z,x)>.5?1:-1)*1.05;plantProp(o,x,y+.42,z)}else plantProp(o,x,y,z);barrelPts.push({x,z,kind});barrelN++;return true}
function scatterBarrels(n){const Rng=rng(909);let made=0,t=0;while(made<n&&t<n*30&&barrelN<BARREL_CAP){t++;const x=(Rng()*2-1)*(B-50),z=(Rng()*2-1)*(B-50);if(tryBarrel(x,z,6,22))made++}return made}
function barrelsAlong(path,every,minSpawn){const pts=resamplePath(path,4);let acc=every?0:4;const gap=every||9.5;for(let i=1;i<pts.length&&barrelN<BARREL_CAP;i++){acc+=Math.hypot(pts[i].x-pts[i-1].x,pts[i].z-pts[i-1].z);if(acc<gap)continue;acc=0;const a=pts[i-1],b=pts[i];let dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const side=hash(b.x,b.z)>.5?1:-1,off=6.1+hash(b.x+3,b.z)*1.5;tryBarrel(b.x-dz*side*off,b.z+dx*side*off,null,minSpawn);if(hash(b.x*1.7,b.z+9)<.42)tryBarrel(b.x+dz*side*(off+1.2),b.z-dx*side*(off+1.2),null,minSpawn)}}
function nodesAlong(path){const pts=resamplePath(path,7);let acc=10,n=0;for(let i=1;i<pts.length&&n<32;i++){acc+=Math.hypot(pts[i].x-pts[i-1].x,pts[i].z-pts[i-1].z);if(acc<20)continue;acc=0;const a=pts[i-1],b=pts[i];let dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;const side=hash(b.z,b.x)>.5?1:-1,x=b.x+(dz/l)*side*(6.7+hash(b.x,b.z)*1.7),z=b.z-(dx/l)*side*(6.7+hash(b.z,b.x)*1.7),y=H(x,z);if(y<1.02||y>8.3||nearMon(x,z,2)||nearBase(x,z,9)||Math.hypot(x-SP.x,z-SP.z)<14)continue;const roll=hash(x*1.3,z+5);const o=mkJunk();o.userData.k='junk';if(!o.userData.uses)o.userData.uses=2;o.rotation.y=hash(x,z)*6;plantProp(o,x,y,z);n++}}
function scatterKind(n,kind,mk,gap,minY,maxY){const Rng=rng(12000+kind.charCodeAt(0)*19);const placed=[];let made=0,t=0;while(made<n&&t<n*40){t++;const x=(Rng()*2-1)*(B-40),z=(Rng()*2-1)*(B-40),y=H(x,z);if(y<(minY||1.05)||y>(maxY||8.3)||Math.hypot(x-SP.x,z-SP.z)<16||nearMon(x,z,5)||nearBase(x,z,11)||nearAnyRoad(x,z)||onPlan(x,z,1.2))continue;let bad=0;for(const p of placed)if(Math.hypot(p.x-x,p.z-z)<(gap||16)){bad=1;break}if(bad)continue;const o=mk(x,y,z);o.userData.k=kind;if(!o.userData.uses)o.userData.uses=2;o.rotation.y=Rng()*6.28;plantProp(o,x,y,z);placed.push({x,z});made++}return made}

function scatterFormations(n){const Rng=rng(24077),placed=[];let made=0,t=0;
 while(made<n&&t<n*70){t++;const x=(Rng()*2-1)*(B-60),z=(Rng()*2-1)*(B-60),y=H(x,z);
  if(y<1.2||y>8||Math.hypot(x-SP.x,z-SP.z)<40||nearMon(x,z,14)||nearBase(x,z,20)||nearAnyRoad(x,z)||onPlan(x,z,6))continue;
  let bad=0;for(const p of placed)if(Math.hypot(p.x-x,p.z-z)<15){bad=1;break}if(bad)continue;
  let ok=1;for(let a=0;a<6.2;a+=1.05){const hy=H(x+Math.cos(a)*7,z+Math.sin(a)*7);if(hy<1||hy>8.4||Math.abs(hy-y)>2.2){ok=0;break}}if(!ok)continue;
  placed.push({x,z});made++;
  const q=Rng(),type=q<.4?'iron':q<.7?'sulfur':'mixed',sc=2.6+Rng()*1.4;
  const core=mkMineRock();core.scale.setScalar(sc);core.userData.k='rock';core.userData.uses=4;core.userData.rad=sc*.5;core.rotation.y=Rng()*6.28;plantProp(core,x,y,z);
  for(let i=0;i<2;i++){const a=Rng()*6.28,r=sc*.55+.4,bx=x+Math.cos(a)*r,bz=z+Math.sin(a)*r,by=H(bx,bz);if(by<.9||by>8.4)continue;const b=mkMineRock();b.scale.setScalar(1.3+Rng()*.9);b.userData.k='rock';b.userData.uses=2;b.userData.rad=.9;b.rotation.y=Rng()*6.28;plantProp(b,bx,by,bz)}
  const cnt=4+((Rng()*3)|0),r0=sc*.55+2.2;
  for(let i=0;i<cnt;i++){const a=(i/cnt)*6.283+Rng()*.7,r=r0+Rng()*1.3,nx=x+Math.cos(a)*r,nz=z+Math.sin(a)*r,ny=H(nx,nz);if(ny<.9||ny>8.4)continue;
   const pick=type==='iron'?(i%4===3?'rock':'ore'):type==='sulfur'?(i%4===3?'rock':'sulfur'):['ore','sulfur','ore','sulfur','rock'][i%5];
   let o;if(pick==='ore')o=mkOreNode();else if(pick==='sulfur')o=mkSulfurNode();else{o=mkMineRock();o.scale.multiplyScalar(.7)}
   o.userData.k=pick;if(!o.userData.uses)o.userData.uses=2;o.rotation.y=Rng()*6.28;plantProp(o,nx,ny,nz)}}
 return made}
let FOREST=0,GRASSN=0,SHRUBN=0;const INST_CHUNKS=[];
const PROP_OCC=new Map();
function buildPropOcc(){
 PROP_OCC.clear();
 for(let i=0;i<things.length;i++){
  const o=things[i],k=o.userData&&o.userData.k;if(!k)continue;
  const gx=Math.floor(o.position.x/8),gz=Math.floor(o.position.z/8),ck=gx+','+gz;
  let b=PROP_OCC.get(ck);if(!b){b=[];PROP_OCC.set(ck,b)}
  b.push({x:o.position.x,z:o.position.z,r:(o.userData.rad||.6)+.85});
 }
}
function nearPropOcc(x,z,pad){
 const gx=Math.floor(x/8),gz=Math.floor(z/8);
 for(let di=-1;di<=1;di++)for(let dj=-1;dj<=1;dj++){
  const b=PROP_OCC.get((gx+di)+','+(gz+dj));if(!b)continue;
  for(let i=0;i<b.length;i++){const p=b[i],dx=x-p.x,dz=z-p.z,need=p.r+(pad||0);if(dx*dx+dz*dz<need*need)return true}
 }
 return false;
}
function fillInst(geo,count,seed,test,opt){
  opt=opt||{};const dummy=new T.Object3D(),mat=opt.mat||mProp,Rng=rng(seed);
  const lo=opt.lo==null?.72:opt.lo,hi=opt.hi==null?1.15:opt.hi,tilt=opt.tilt==null?.08:opt.tilt,trunkR=opt.trunkR||0;
  const GZ=8,span=B*2,cell=span/GZ,buckets=Array.from({length:GZ*GZ},()=>[]);
  let n=0,t=0;
  while(n<count&&t<count*12){t++;const x=(Rng()*2-1)*(B-26),z=(Rng()*2-1)*(B-26),y=H(x,z);if(!test(x,y,z))continue;
   if(trunkR>0&&nearPropOcc(x,z,.65))continue;
   const s=lo+Rng()*(hi-lo),sink=trunkR>0?slopeSink(x,z,.35*s):slopeSink(x,z,.18*s);
   dummy.position.set(x,y-sink,z);dummy.rotation.set((Rng()-.5)*tilt,Rng()*6.28,(Rng()-.5)*tilt);dummy.scale.set(s,s*(.88+Rng()*.24),s);dummy.updateMatrix();
   if(trunkR>0)addStaticCol(x,z,y-sink,trunkR*s,3.8*s,'inst_tree');
   const gx=Math.min(GZ-1,Math.max(0,((x+B)/cell)|0)),gz=Math.min(GZ-1,Math.max(0,((z+B)/cell)|0));
   buckets[gz*GZ+gx].push(dummy.matrix.clone());n++;
  }
  const maxD=mat===mGrass||mat===mGrassDry?90:mat===mFoliage?120:170;
  for(let i=0;i<buckets.length;i++){
   const arr=buckets[i];if(!arr.length)continue;
   const m=new T.InstancedMesh(geo,mat,arr.length);
   for(let j=0;j<arr.length;j++)m.setMatrixAt(j,arr[j]);
   m.instanceMatrix.needsUpdate=true;m.frustumCulled=false;scene.add(m);
   const gx=i%GZ,gz=(i/GZ)|0,cx=-B+(gx+.5)*cell,cz=-B+(gz+.5)*cell;
   INST_CHUNKS.push({m,cx,cz,r2:(maxD+cell*.55)**2});
  }
  return n;
}
function vegOk(x,y,z){return y>=1.15&&y<=7.3&&Math.hypot(x-SP.x,z-SP.z)>=16&&!nearMon(x,z,3)&&!nearBase(x,z,10)&&!nearAnyRoad(x,z)&&!onFound(x,z)&&!onPlan(x,z,1.4)&&!inPond(x,z)}
const vegB=k=>(x,y,z)=>vegOk(x,y,z)&&hash(x*3.1,z*1.7)<bDens(k,x,z);
function fillForest(){FOREST=fillInst(PINEG[0],460,4242,vegB('pineI'),{lo:.78,hi:1.35,tilt:.06,trunkR:.26})+fillInst(PINEG[1],420,5151,vegB('pineI'),{lo:.72,hi:1.25,tilt:.06,trunkR:.26})+fillInst(SPRUCEG[0],360,5252,vegB('spruceI'),{lo:.78,hi:1.38,tilt:.05,trunkR:.24});return FOREST}
function fillLeaf(){return fillInst(LEAFG[0],320,7771,vegB('leafI'),{lo:.7,hi:1.22,tilt:.05,trunkR:.24})+fillInst(LEAFAG[0],280,8881,vegB('autI'),{lo:.75,hi:1.25,tilt:.05,trunkR:.24})+fillInst(LEAFAG[1],240,8892,vegB('autI'),{lo:.7,hi:1.2,tilt:.05,trunkR:.24})+fillInst(ASPENG[0],240,8897,vegB('aspenI'),{lo:.75,hi:1.28,tilt:.05,trunkR:.20})+fillInst(BIRCHG[0],250,8903,vegB('birI'),{lo:.72,hi:1.22,tilt:.05,trunkR:.20})+fillInst(SCRUBG[0],220,8919,vegB('scrubI'),{lo:.75,hi:1.3,tilt:.07,trunkR:.22})}
function fillGrass(n){const gOk=(x,y,z)=>y>.95&&y<7.6&&Math.hypot(x-SP.x,z-SP.z)>7&&!nearAnyRoad(x,z)&&!nearMon(x,z,1.4)&&!onFound(x,z)&&!onPlan(x,z,2.2)&&!inPond(x,z);GRASSN=fillInst(GRASSG,n||3200,3331,(x,y,z)=>gOk(x,y,z)&&hash(x*2.9,z*3.3)<bDens('grass',x,z),{lo:.9,hi:1.55,tilt:.16,mat:mGrass})+fillInst(GRASSG,Math.round((n||3200)*.45),3377,(x,y,z)=>gOk(x,y,z)&&hash(x*1.9,z*4.1)<bDens('dry',x,z),{lo:.8,hi:1.3,tilt:.16,mat:mGrassDry});return GRASSN}
function fillShrubs(n){SHRUBN=fillInst(BUSHG[1],n||380,8088,vegOk,{lo:1.2,hi:1.95,tilt:.08,mat:mFoliage});return SHRUBN}
function mkSnag(){return treeGroup('snag',.85+R()*.4)}
const PONDS=[];
function inPond(x,z){for(const q of PONDS)if(Math.hypot(x-q.x,z-q.z)<q.r+1.4)return true;return false}
function digPonds(){const Rng=rng(4401),pos=terrMesh.geometry.attributes.position,col=terrMesh.geometry.attributes.color,sand=new T.Color(0xd2c4a2),mud=new T.Color(0x5c5344),reed=new T.Color(0x6a8a48),W=TN+1;
 const clear=(x,z,rad)=>{if(Math.hypot(x-SP.x,z-SP.z)<78||nearBase(x,z,rad+18)||nearMon(x,z,rad+4))return false;for(const q of PONDS)if(Math.hypot(q.x-x,q.z-z)<rad+q.r+28)return false;if(nearAnyRoad(x,z))return false;for(let k=0;k<8;k++){const a=k*Math.PI/4;if(nearAnyRoad(x+Math.cos(a)*(rad+8),z+Math.sin(a)*(rad+8)))return false}return true};
 let tries=0;while(PONDS.length<5&&tries<140){tries++;const x=(Rng()*2-1)*(B-160),z=(Rng()*2-1)*(B-160),y=H(x,z);if(y<2.3||y>6.1)continue;const rad=16+Rng()*6;if(!clear(x,z,rad))continue;const feather=12,ix0=Math.max(0,((x-rad-feather)/TS+.5)*TN-1|0),ix1=Math.min(TN,Math.ceil(((x+rad+feather)/TS+.5)*TN)+1),iy0=Math.max(0,((.5-(z+rad+feather)/TS)*TN-1)|0),iy1=Math.min(TN,Math.ceil((.5-(z-rad-feather)/TS)*TN)+1);
  for(let iy=iy0;iy<=iy1;iy++)for(let ix=ix0;ix<=ix1;ix++){const wx=(ix/TN-.5)*TS,wz=(.5-iy/TN)*TS,d=Math.hypot(wx-x,wz-z);if(d>rad+feather)continue;const gi=iy*W+ix,u=d/rad;let target;if(u<=1){const s=u*u*(3-2*u);target=-.72*(1-s)+.38*s}else{const t=(d-rad)/feather,s=t*t*(3-2*t);target=.38*(1-s)+HG[gi]*s}HG[gi]=Math.min(HG[gi],target)}
  PONDS.push({x,z,r:rad});
  for(let i=things.length-1;i>=0;i--){const o=things[i],k=o.userData&&o.userData.k;if(k!=='tree'&&k!=='rock'&&k!=='bush'&&k!=='hemp'&&k!=='junk'&&k!=='ore'&&k!=='sulfur')continue;if(Math.hypot(o.position.x-x,o.position.z-z)<rad+2){scene.remove(o);things.splice(i,1)}}
  for(let i=LOGS.length-1;i>=0;i--){const m=LOGS[i];if(Math.hypot(m.position.x-x,m.position.z-z)<rad+2){scene.remove(m);LOGS.splice(i,1)}}}
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i);let pond=null;for(const q of PONDS)if(Math.hypot(x-q.x,z-q.z)<q.r+14){pond=q;break}if(!pond)continue;const ix=Math.round((x/TS+.5)*TN),iy=Math.round((.5-z/TS)*TN);if(ix<0||iy<0||ix>TN||iy>TN)continue;const y=HG[iy*W+ix];pos.setY(i,y);if(y<.05)col.setXYZ(i,mud.r,mud.g,mud.b);else if(y<.75){const t=(y-.05)/.7;col.setXYZ(i,sand.r*(1-t)+reed.r*t,sand.g*(1-t)+reed.g*t,sand.b*(1-t)+reed.b*t)}}
 pos.needsUpdate=true;col.needsUpdate=true;terrMesh.geometry.computeVertexNormals();terrMesh.geometry.computeBoundingSphere();
 const mesh=new T.InstancedMesh(gRock,LMat({color:0x8d8882}),260),dummy=new T.Object3D();let n=0;
 for(const q of PONDS)for(let i=0;i<24&&n<mesh.count;i++){const a=i/24*6.283+hash(q.x,i)*.15;let px=0,pz=0,py=0,ok=false;for(let s=q.r*.45;s<q.r+13;s+=1.25){const x=q.x+Math.cos(a)*s,z=q.z+Math.sin(a)*s,y=H(x,z);if(y>.18&&y<.92){px=x;pz=z;py=y;ok=true;break}}if(!ok)continue;const s=.32+hash(px,pz)*.38;dummy.position.set(px,py+s*.08,pz);dummy.rotation.set(hash(i,px)*1.4,hash(pz,i)*6,hash(i,pz)*.8);dummy.scale.set(s*(i%3?1:1.35),s*.55,s*.9);dummy.updateMatrix();mesh.setMatrixAt(n++,dummy.matrix);if(n<mesh.count&&hash(px,i)>.62){const s2=s*.72;dummy.position.set(px+Math.cos(a+1.2)*.55,py+s2*.08,pz+Math.sin(a+1.2)*.55);dummy.scale.set(s2,s2*.5,s2*.85);dummy.updateMatrix();mesh.setMatrixAt(n++,dummy.matrix)}}
 mesh.count=n;mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;if(n)scene.add(mesh);
 // Cattail reeds & floating lilypads along pond shorelines
 const reedG=new T.CylinderGeometry(.035,.05,1.25,5),lilyG=new T.CylinderGeometry(.42,.42,.03,8);
 const reedM= new T.InstancedMesh(reedG,LMat({color:0x4e6e32}),240),lilyM=new T.InstancedMesh(lilyG,LMat({color:0x3b7a38}),120);
 let rn=0,ln=0;
 for(const q of PONDS){for(let i=0;i<36&&rn<reedM.count;i++){const a=i/36*6.283+hash(i,q.z)*.2,r=q.r-.8+hash(q.x,i)*2.4,x=q.x+Math.cos(a)*r,z=q.z+Math.sin(a)*r,y=H(x,z);if(y<-.15||y>.55)continue;dummy.position.set(x,y+.52,z);dummy.rotation.set((hash(i,1)-.5)*.18,a,(hash(i,2)-.5)*.18);const s=.8+hash(x,z)*.55;dummy.scale.set(1,s,1);dummy.updateMatrix();reedM.setMatrixAt(rn++,dummy.matrix)}
  for(let i=0;i<18&&ln<lilyM.count;i++){const a=i/18*6.283+hash(q.x,i)*.35,r=q.r*(.35+hash(i,q.z)*.48),x=q.x+Math.cos(a)*r,z=q.z+Math.sin(a)*r,y=H(x,z);if(y>-.08)continue;dummy.position.set(x,.03,z);dummy.rotation.set(0,hash(x,z)*6.28,0);const s=.7+hash(z,x)*.65;dummy.scale.set(s,1,s);dummy.updateMatrix();lilyM.setMatrixAt(ln++,dummy.matrix)}}
 reedM.count=rn;reedM.instanceMatrix.needsUpdate=true;reedM.frustumCulled=false;if(rn)scene.add(reedM);
 lilyM.count=ln;lilyM.instanceMatrix.needsUpdate=true;lilyM.frustumCulled=false;if(ln)scene.add(lilyM)}
function layRoads(){const mains=[];if(MONS.length>=2){const pts=MONS.map(m=>({x:m.x,z:m.z,r:m.r}));const inn=[0],edges=[];while(inn.length<pts.length){let bd=1e9,bi=0,bj=-1;for(const i of inn)for(let j=0;j<pts.length;j++){if(inn.indexOf(j)>=0)continue;const d=Math.hypot(pts[i].x-pts[j].x,pts[i].z-pts[j].z);if(d<bd){bd=d;bi=i;bj=j}}if(bj<0)break;inn.push(bj);edges.push([bi,bj])}
 const has=(i,j)=>edges.some(e=>(e[0]===i&&e[1]===j)||(e[0]===j&&e[1]===i)),lens=edges.map(e=>Math.hypot(pts[e[0]].x-pts[e[1]].x,pts[e[0]].z-pts[e[1]].z)).sort((a,b)=>a-b),lim=(lens[lens.length>>1]||200)*1.35,cand=[];
 for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].z-pts[j].z);if(d<lim&&!has(i,j))cand.push([d,i,j])}
 cand.sort((a,b)=>a[0]-b[0]);for(const c of cand.slice(0,3))edges.push([c[1],c[2]]);
 for(const m of pts)pave(monRing(m),'road');
 for(const e of edges){const A=monGate(pts[e[0]],pts[e[1]]),Bp=monGate(pts[e[1]],pts[e[0]]),path=dryPath(A.x,A.z,Bp.x,Bp.z);pave(path,'road');postsAlong(path,4.6,22);mains.push(path)}
 let ni=0,nd=1e9;for(let i=0;i<pts.length;i++){const d=Math.hypot(pts[i].x-SP.x,pts[i].z-SP.z);if(d<nd){nd=d;ni=i}}const sdx=pts[ni].x-SP.x,sdz=pts[ni].z-SP.z,dlh=Math.hypot(sdx,sdz)||1,start={x:SP.x+sdx/dlh*18,z:SP.z+sdz/dlh*18},end=monGate(pts[ni],start),lane=dryPath(start.x,start.z,end.x,end.z);pave(lane,'lane');postsAlong(lane,4.6,16);mains.push(lane);
 for(const path of mains){barrelsAlong(path);nodesAlong(path)}}
 for(const n of NP){const from=n.farm||n.lot||{x:n.x,z:n.z};let best=null,bd=1e9;for(const rd of ROADS){if(rd.kind==='trail')continue;for(let i=0;i<rd.pts.length;i+=1){const p=rd.pts[i],d=Math.hypot(p.x-from.x,p.z-from.z);if(d<bd){bd=d;best=p}}}if(!best||bd>520||bd<8)continue;const path=dryPath(from.x,from.z,best.x,best.z);pave(path,'trail')}
 const framed=paveSpawnRoad();clearRoads();digPonds();seatRoads();scatterFormations(100);scatterKind(170,'tree',mkChopTree,10,1.15,7.4);scatterKind(60,'tree',mkSnag,16,1.15,7.2);if(framed)openSight(framed.hx,framed.hz);snapWorld();buildPropOcc();fillForest();fillLeaf();fillGrass(3200);fillShrubs(380)}
const gRoadPost=(()=>{const acc=newAcc(),box=new T.BoxGeometry(1,1,1),cyl=new T.CylinderGeometry(.1,.13,1.45,5),cap=new T.ConeGeometry(.125,.14,5),base=new T.CylinderGeometry(.22,.28,.26,5);
 bakeGeo(cyl,M4(0,0,0,0,0,0,1,1,1),0x423020,acc,0);
 bakeGeo(cap,M4(0,.79,0,0,0,0,1,1,1),0x261b12,acc,0);
 bakeGeo(box,M4(0,.56,0,0,0,0,.21,.13,.21),0xd93822,acc,3);
 bakeGeo(base,M4(0,-.60,0,0,.4,0,1,1,1),0x8a867c,acc,3);
 return accGeo(acc)})(),mRoadPost=mProp;
function postsAlong(path,halfW,step){const pts=resamplePath(path,step||18);for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];let dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;for(const s of[-1,1])POSTS.push({x:b.x-dz*s*(halfW+.72),z:b.z+dx*s*(halfW+.72),r:.3})}}
function nearRibbon(x,z,path,rad){if(!path||!path.length)return false;if(!path._rs)path._rs=resamplePath(path,6);const pts=path._rs,r2=rad*rad;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],dx=b.x-a.x,dz=b.z-a.z,l2=dx*dx+dz*dz||1;let u=((x-a.x)*dx+(z-a.z)*dz)/l2;if(u<0)u=0;else if(u>1)u=1;const qx=a.x+dx*u-x,qz=a.z+dz*u-z;if(qx*qx+qz*qz<r2)return true}return false}
function nearAnyRoad(x,z){for(const rd of ROADS)if(nearRibbon(x,z,rd.pts,(rd.kind==='trail'?3.2:6.2)))return true;return false}
function clearRoads(){for(let i=things.length-1;i>=0;i--){const o=things[i],k=o.userData.k;if(!o.userData||o.userData.farm||(k!=='tree'&&k!=='rock'&&k!=='bush'&&k!=='hemp'&&k!=='junk'))continue;const pad=k==='tree'?1.6:k==='junk'?1:.6;for(const rd of ROADS){if(nearRibbon(o.position.x,o.position.z,rd.pts,(rd.kind==='trail'?2.6:5.5)+pad)){scene.remove(o);things.splice(i,1);break}}}}
function openSight(tx,tz){const x0=P.x,z0=P.z,dx=tx-x0,dz=tz-z0,l2=dx*dx+dz*dz||1;for(let i=things.length-1;i>=0;i--){const o=things[i],k=o.userData.k;if(!o.userData||o.userData.farm||(k!=='tree'&&k!=='rock'&&k!=='bush'))continue;const u=((o.position.x-x0)*dx+(o.position.z-z0)*dz)/l2;if(u<.05||u>.96)continue;if(Math.hypot(o.position.x-(x0+dx*u),o.position.z-(z0+dz*u))<3.3){scene.remove(o);things.splice(i,1)}}}
function drape(ax,az,bx,bz){const dx=bx-ax,dz=bz-az,dist=Math.hypot(dx,dz)||1,n=Math.max(1,Math.ceil(dist/7)),px=-dz/dist,pz=dx/dist,pts=[];for(let i=0;i<=n;i++){const t=i/n;let x=ax+dx*t,z=az+dz*t;if(H(x,z)<.55){let bh=H(x,z),bx2=x,bz2=z;for(const s of[5,-5,10,-10]){const nx=x+px*s,nz=z+pz*s,nh=H(nx,nz);if(nh>bh){bh=nh;bx2=nx;bz2=nz}}if(bh>.42){x=bx2;z=bz2}}pts.push({x,z})}return pts}
function paveSpawnRoad(){const home=NP.find(n=>n.close)||NP[0];if(!home)return null;const hx=home.lot?home.lot.x:home.hx,hz=home.lot?home.lot.z:home.hz;let dx=hx-P.x,dz=hz-P.z,len=Math.hypot(dx,dz)||1;dx/=len;dz/=len;let rx=-dz,rz=dx;const score=s=>{let n=0;for(let t=-1;t<=5;t++){const h=H(P.x+rx*s+dx*t*8,P.z+rz*s+dz*t*8);if(h>.8&&h<7.2)n++}return n};if(score(-12)>score(12)){rx=-rx;rz=-rz}const off=12.4,pass={x:hx+rx*off,z:hz+rz*off},ax=pass.x-dx*52,az=pass.z-dz*52,bx=pass.x+dx*40,bz=pass.z+dz*40,fore=drape(ax,az,bx,bz);pave(fore,'road');postsAlong(fore,4.6,8);barrelsAlong(fore,11,2);if(MONS.length){let best=null,bd=1e9;for(const m of MONS){const d=Math.hypot(m.x-bx,m.z-bz);if(d<bd){bd=d;best=m}}if(best&&bd>36){const end=monGate(best,{x:bx,z:bz}),leg=dryPath(bx,bz,end.x,end.z);pave(leg,'road');postsAlong(leg,4.6,20);barrelsAlong(leg)}}const sx=pass.x-dx*28-rx*1.6,sz=pass.z-dz*28-rz*1.6,sy=H(sx,sz);if(sy>.6&&sy<7.6){P.x=LP.x=sx;P.z=LP.z=sz;P.y=sy+1.7}yaw=Math.atan2(-(pass.x*.4+hx*.6-P.x),-(pass.z*.4+hz*.6-P.z));pitch=-.36;home.told=1;for(let hi=0;hi<6;hi++){const ha=hi*1.047+.4,hr=5.5+(hi%2)*2.8,hpx=P.x+Math.cos(ha)*hr,hpz=P.z+Math.sin(ha)*hr,hpy=H(hpx,hpz);if(hpy>.8&&!nearAnyRoad(hpx,hpz)){const hp=mkHemp();hp.userData.k='hemp';plantProp(hp,hpx,hpy,hpz)}}
say('A dirt road runs from your feet past that foundation. Follow the posts and the barrels out to the monuments.');msgT=8;return{hx,hz}}
spawnSettlers();warmSettlers();__mark('settlers');layRoads();__mark('roads');
function spawnCampGarrison(camp){
 if(!camp||!camp.spawns)return 0;
 camp.raiders=(camp.raiders||[]).filter(r=>r&&r.hp>0);
 if(camp.baseCount==null)camp.baseCount=camp.targetCount||6;
 const want=Math.max(3,Math.min(14,Math.round(camp.baseCount*DF.camp)));
 const must=camp.spawns.filter(s=>s.warlord||s.tower),rest=camp.spawns.filter(s=>!s.warlord&&!s.tower);
 const list=[...must,...rest].slice(0,Math.max(want,must.length));
 for(let k=0;list.length<want&&rest.length;k++){const b=rest[k%rest.length];list.push(Object.assign({},b,{x:b.x+((k*37)%7-3)*.9,z:b.z+((k*53)%7-3)*.9}))}
 camp.targetCount=list.length;
 let made=0;
 for(let i=0;i<list.length;i++){
  const sp=list[i],wx=camp.x+sp.x,wz=camp.z+sp.z;
  const wy=sp.tower?(camp.y+(sp.postY||3.0)):Math.max(G(wx,wz,camp.y+1.2),camp.y);
  const warlord=!!sp.warlord,heavy=warlord||!!sp.heavy;
  const gun=sp.gun||'ak',GS=RGUN[gun]||RGUN.ak;
  const ar={h:true,v:heavy||Math.random()<.85,l:heavy||Math.random()<.75};
  const maxHp=Math.round((warlord?150:heavy?100:75)*DF.hp);
  const col=warlord?0x4a0e0e:heavy?0x6e1d18:0x8a2222;
  const m=spawnMan(col,true,{heavy,warlord,kit:sp.kit||'melee',gun,arm:ar});
  const pts=(sp.pts||[[sp.x,sp.z]]).map(p=>[camp.x+p[0],camp.z+p[1]]);
  const e={
   k:'raider',role:sp.role||'assault',warlord,tower:!!sp.tower,camp,
   x:wx,z:wz,y:wy,homeX:wx,homeZ:wz,postY:wy,
   hp:maxHp,maxHp,meds:warlord?3:heavy?2:1,heavy,cheat:true,siege:false,
   idx:EN.length,pth:[],side:1,strafeDir:i%2?1:-1,
   kit:sp.kit||'melee',nades:sp.nades||0,ordCd:.8+Math.random(),back:0,
   gun,mag:GS.mag,ammo:GS.mag*(warlord?8:5),gcd:.4+Math.random()*.5,rl:0,
   accK:(warlord?1.28:sp.tower?1.22:1.08)*DF.acc,dmgK:(warlord?1.25:1.08)*DF.dmg,
   armr:ar,armorK:(ar.h?.86:1)*(ar.v?.72:1)*(ar.l?.88:1),
   patrolPts:pts,patrolIdx:0,patrolWait:i*.6,baseYaw:Math.atan2(-sp.x,-sp.z),
   m
  };
  m.userData.k='raider';m.userData.a=e;m.position.set(e.x,e.y,e.z);
  things.push(m);EN.push(e);camp.raiders.push(e);made++;
 }
 // Restock all War-Chests and crates inside this Raider Camp when garrison spawns/respawns
 for(const o of CR){
  if(Math.hypot(o.position.x-camp.x,o.position.z-camp.z)<camp.r+6){
   const u=o.userData;u.op=0;u.loot=null;u.cd=0;u.rated=0;if(u.box){if(curBox===u.box){curBox=null;open=false;render();lookLock(true)}u.box=null}
  }
 }
 camp.hadRaiders=made>0;camp.cleared=false;camp.respawnT=0;camp.reinforceT=CAMP_RESPAWN;
 return made;
}
function initRaiderCamps(){for(const c of RCAMPS)spawnCampGarrison(c)}
function campTowerShoot(e,dt){
 const G=RGUN[e.gun];if(!G)return false;
 e.gcd=Math.max(0,(e.gcd||0)-dt);
 if(e.rl>0){e.rl-=dt;e.crouchT=.35;if(e.rl<=0){const k=Math.min(G.mag,e.ammo);e.mag=k;e.ammo-=k}return true}
 if(e.mag<=0){if(e.ammo>0){e.rl=2.0;return true}return false}
 const dx=P.x-e.x,dz=P.z-e.z,dp=Math.hypot(dx,dz);
 if(dp>G.range+12||dp<1.8||!turretSees(e,{x:P.x,y:P.y-1.7,z:P.z}))return false;
 e.m.rotation.y=Math.atan2(dx,dz);e.aimT=.4;
 if(e.gcd>0)return true;
 e.gcd=G.rate*(.85+Math.random()*.35);e.mag--;e.armUp=.24;
 const oy=e.y+1.42,ty=P.y-.35,L=Math.hypot(dp,ty-oy)||1,acc=Math.max(.14,G.acc*(1-dp/((G.range+14)*1.2)))*(e.accK||1);
 tracer(e.x,oy,e.z,dx/L,(ty-oy)/L,dz/L,L,e.m.rotation.y);
 if(Math.random()<acc)hurtP(G.dmg*(e.dmgK||1),'A Raider Tower Marksman');
 if(age>RGT){RGT=age+.08;if(dp<70)blip(145,.05,'square')}
 return true;
}
function raidDmgSettler(n,dm){if(!n||n._dead||n.hp<=0)return;n.hp-=dm;{let b=null,bd=75;for(const r of EN)if(r.hp>0){const q=Math.hypot(r.x-n.x,r.z-n.z);if(q<bd){bd=q;b=r}}if(b)underFire(n,b.x,b.z,b.y)}if(n.hp<=0){killSettler(n);say('Raiders killed a settler.')}else if(age>(n._rs||0)){n._rs=age+8;say('Raiders are attacking a settler!')}}
// Camp raiders spot settlers near the camp, call the garrison in on them, and towers snipe them
function campSettlerFoe(e){const c=e.camp;if(!c)return null;let b=null,bd=(e.tower?58:44)*DF.sight;for(const n of NP){if(n._dead||n.hp<=0)continue;const q=Math.hypot(n.x-e.x,n.z-e.z);if(q<bd&&turretSees(e,n)){bd=q;b=n}}
 if(b){c.sFoe=b;c.sT=9}else if(!e.tower&&c.sT>0&&c.sFoe&&!c.sFoe._dead&&c.sFoe.hp>0&&Math.hypot(c.sFoe.x-c.x,c.sFoe.z-c.z)<c.r+60)b=c.sFoe;
 return b}
function campTowerShootAt(e,dt,n){const G=RGUN[e.gun];if(!G)return false;e.gcd=Math.max(0,(e.gcd||0)-dt);
 if(e.rl>0){e.rl-=dt;e.crouchT=.35;if(e.rl<=0){const k=Math.min(G.mag,e.ammo);e.mag=k;e.ammo-=k}return true}
 if(e.mag<=0){if(e.ammo>0){e.rl=2.0;return true}return false}
 const dx=n.x-e.x,dz=n.z-e.z,dp=Math.hypot(dx,dz);if(dp>G.range+12||dp<1.8||!turretSees(e,n))return false;
 e.m.rotation.y=Math.atan2(dx,dz);e.aimT=.4;if(e.gcd>0)return true;
 e.gcd=G.rate*(.85+Math.random()*.35);e.mag--;e.armUp=.24;
 const oy=e.y+1.42,ty=n.y+1.1,L=Math.hypot(dp,ty-oy)||1,acc=Math.max(.14,G.acc*(1-dp/((G.range+14)*1.2)))*(e.accK||1)+.12;
 tracer(e.x,oy,e.z,dx/L,(ty-oy)/L,dz/L,L,e.m.rotation.y);
 if(Math.random()<acc)raidDmgSettler(n,G.dmg*(e.dmgK||1)*1.4);
 if(age>RGT){RGT=age+.08;if(Math.hypot(P.x-e.x,P.z-e.z)<70)blip(145,.05,'square')}
 return true}
// A few ground raiders leave the camp on a timer and march on the nearest settler
function campSortie(c){const live=c.raiders.filter(r=>r&&r.hp>0&&!r.tower&&!r.warlord&&!r.hunt&&r.hp>(r.maxHp||95)*.5);if(live.length<4||(c.alertT||0)>0)return;
 let tgt=null,bd=340;for(const n of NP){if(n._dead||n.hp<=0)continue;const q=Math.hypot(n.x-c.x,n.z-c.z);if(q<bd){bd=q;tgt=n}}if(!tgt)return;
 const k=Math.min(DF.party,live.length-2);for(let i=0;i<k;i++){const r=live[i];r.hunt=tgt;r.huntT=95}
 if(Math.hypot(P.x-c.x,P.z-c.z)<320)say('Raiders from '+c.n+' are marching on a settler outpost.')}
function driveCampRaider(e,dt){
 const camp=e.camp;if(!camp)return;
 const dp=Math.hypot(P.x-e.x,P.z-e.z),dc=Math.hypot(e.x-camp.x,e.z-camp.z);
 if(e.m)e.m.visible=dp<185;
 if(dp>185&&!e.hunt)return;
 e._mv=0;e.ordCd=Math.max(0,(e.ordCd||0)-dt);e.alertT=Math.max(0,(e.alertT||0)-dt);
 if(e.hp<(e.maxHp||95)*.42&&(e.meds||0)>0){e.meds--;e.hp=Math.min(e.maxHp||95,e.hp+Math.round((e.warlord?45:28)*DF.hp));e.crouchT=1.0}
 // Detect player approaching camp
 if(!ch('peace')&&!dead){
  const sight=(e.tower?58:44)*DF.sight;
  if(dp<26||(dp<sight&&turretSees({x:e.x,y:e.y,z:e.z},{x:P.x,y:P.y-1.7,z:P.z}))){
   if((camp.alertT||0)<=0&&age>(camp.warnAt||0)){
    camp.warnAt=age+18;
    const alive=camp.raiders.filter(r=>r&&r.hp>0).length;
    say(camp.n+' garrison alerted! ('+alive+' raiders defending the War-Chests)');
    blip(108,.22,'sawtooth');
   }
   alertCamp(camp,P.x,P.z);
  }
 }
 // Tower marksman stays on watchtower deck
 if(e.tower){
  e.x=e.homeX;e.z=e.homeZ;e.y=e.postY;e.m.position.set(e.x,e.y,e.z);
  const sfT=campSettlerFoe(e);
  if(e.alertT>0&&!ch('peace')&&!dead&&dp<70){
   campTowerShoot(e,dt);
  }else if(sfT){
   campTowerShootAt(e,dt,sfT);
  }else{
   e.m.rotation.y=(e.baseYaw||0)+Math.sin(age*.55+e.idx)*.95;
  }
  animMan(e,dt);return;
 }
 // Ground Raider Tether: return to camp if pulled too far outside perimeter
 if(!e.hunt&&dc>camp.r+38){
  if(dc>camp.r+110)go(e,e.homeX,e.homeZ,3.4,dt);else stepTo(e,e.homeX,e.homeZ,3.15,dt);
  if(e.hp<e.maxHp)e.hp=Math.min(e.maxHp,e.hp+4*dt);
  animMan(e,dt);return;
 }
 // Settlers: a hunting party's target, or any settler the camp can see
 if(e.hunt&&(e.hunt._dead||e.hunt.hp<=0||((e.huntT=(e.huntT||0)-dt)<=0)))e.hunt=null;
 {const sf=e.hunt||campSettlerFoe(e);
  if(sf&&!(e.alertT>0&&dp<40)){const sp2=e.warlord?2.82:e.heavy?2.48:2.72;if(raidSettler(e,dt,sp2,sf)){animMan(e,dt);return}}}
 // Active combat state
 if(e.alertT>0&&!ch('peace')&&!dead&&dp<75){
  const speed=e.warlord?2.82:e.heavy?2.48:2.72;
  if(e.nades>0&&e.kit&&e.kit!=='melee'&&dp>6.5&&dp<18&&e.ordCd<=0){
   tossFrom(e,{x:P.x,y:P.y-.2,z:P.z},e.kit==='satchel'||e.kit==='c4'?'satchel':'beancan');
   e.nades--;e.ordCd=4.4;animMan(e,dt);return;
  }
  if(e.gun&&gunSiege(e,dt,speed)){animMan(e,dt);return}
  if(dp>1.5){
   if(e.role==='flanker'&&dp>8&&dp<32){const dx=P.x-e.x,dz=P.z-e.z,fl=(e.idx%2?1:-1)*6.5;stepTo(e,P.x-dz/dp*fl,P.z+dx/dp*fl,speed*1.1,dt)}
   else stepTo(e,P.x,P.z,speed,dt);
  }else{
   if(turretSees(e,{x:P.x,y:P.y-1.7,z:P.z}))hurtP((e.warlord?15:e.heavy?11:8)*dt,e.warlord?'The Raider Warlord':'Camp Raiders');
   if(!(e.sw>0))e.sw=.45;
  }
  animMan(e,dt);return;
 }
 // Unalerted Camp Patrol Circuit
 const pts=e.patrolPts;
 if(pts&&pts.length){
  if((e.patrolWait||0)>0){
   e.patrolWait-=dt;e.m.rotation.y+=Math.sin(age*.6+e.idx)*.25*dt;
  }else{
   const tgt=pts[e.patrolIdx%pts.length],dist=Math.hypot(tgt[0]-e.x,tgt[1]-e.z);
   if(dist<1.15){
    e.patrolIdx=(e.patrolIdx+1)%pts.length;
    e.patrolWait=1.6+(e.idx%3)*.85;
   }else{
    stepTo(e,tgt[0],tgt[1],1.38,dt);
   }
  }
 }
 animMan(e,dt);
}
let CAMP_RESPAWN=DF.campResp; // seconds, set by difficulty (scales with fast-forward)
function campTick(dt,pc){
 const effDt=dt*(CH.on?(CH.ts||1):1);
 for(const c of RCAMPS){
  c.alertT=Math.max(0,(c.alertT||0)-dt);c.sT=Math.max(0,(c.sT||0)-dt);
  c.raiders=(c.raiders||[]).filter(r=>r&&r.hp>0);
  if(!pc&&!c.cleared&&NP.length){c.sortT=(c.sortT==null?DF.sortie*(.4+Math.random()*.6):c.sortT)-effDt;if(c.sortT<=0){c.sortT=DF.sortie*(.8+Math.random()*.5);campSortie(c)}}
  if(c.hadRaiders&&c.raiders.length===0&&!c.cleared){
   c.cleared=true;c.respawnT=CAMP_RESPAWN;
   if(!pc){RT.blood+=3;RT.scavenge+=2;bumpHeat(.4);say('Raider Camp cleared: '+c.n+'! War-Chests unlocked (Camp respawns in 3m).');blip(520,.18,'triangle')}
  }
  if(c.cleared&&!pc){
   c.respawnT=Math.max(0,(c.respawnT||0)-effDt);
   if(c.respawnT<=0){
    spawnCampGarrison(c);
    say('Raider reinforcements have retaken '+c.n+' and restocked the War-Chests!');
    blip(96,.25,'sawtooth');
   }
  }else if(!c.cleared&&!pc&&c.raiders.length<(c.targetCount||6)&&(c.alertT||0)<=0){
   // If partially cleared and out of combat, reinforce back to full strength after CAMP_RESPAWN
   c.reinforceT=Math.max(0,(c.reinforceT==null?CAMP_RESPAWN:c.reinforceT)-effDt);
   if(c.reinforceT<=0){
    for(const r of c.raiders){if(r.m){scene.remove(r.m);const ti=things.indexOf(r.m);if(ti>=0)things.splice(ti,1)}const ei=EN.indexOf(r);if(ei>=0)EN.splice(ei,1)}
    c.raiders=[];
    spawnCampGarrison(c);
    say(c.n+' garrison reinforced and War-Chests restocked.');
   }
  }else{
   c.reinforceT=CAMP_RESPAWN;
  }
 }
}
initRaiderCamps();
function cullTick(dt){if((nearT-=dt)<=0){nearT=.1;NEAR.length=0;for(const o of things){const dx=o.position.x-P.x,dz=o.position.z-P.z;if(dx*dx+dz*dz<256)NEAR.push(o)}}
 if((cullT-=dt)>0)return;cullT=.25;for(const o of things){const k=o.userData.k;if(k==='tree'||k==='rock'||k==='bush'||k==='hemp'||k==='junk'||k==='barrel'||k==='sulfur'||k==='ore'||k==='crate'||k==='drop'||k==='recycler'){const dx=o.position.x-P.x,dz=o.position.z-P.z;o.visible=dx*dx+dz*dz<25600}}
 for(const c of INST_CHUNKS){const dx=c.cx-P.x,dz=c.cz-P.z;c.m.visible=dx*dx+dz*dz<c.r2}
 for(const a of DE)if(a.m){const dx=a.x-P.x,dz=a.z-P.z;a.m.visible=dx*dx+dz*dz<22500}
 for(const a of WV)if(a.m){const dx=a.x-P.x,dz=a.z-P.z;a.m.visible=dx*dx+dz*dz<22500}
 for(const lg of LOGS){const dx=lg.position.x-P.x,dz=lg.position.z-P.z;lg.visible=dx*dx+dz*dz<22500}
 for(const m of MONS)m.g.visible=Math.hypot(m.x-P.x,m.z-P.z)<m.r+185}

function trapTick(dt){
  for(let i=devs.length-1;i>=0;i--){const d=devs[i];if(d.ttl&&age-d.born>d.ttl)killDev(d)}
  for(const d of devs){
    if(d._gone||(d.t!=='spike'&&d.t!=='snap'))continue;
    d.cd=(d.cd||0)-dt;if(d.cd>0)continue;
    const rad=d.t==='spike'?1.28:1.05, dmg=d.t==='spike'?18:36;
    let hit=false;
    for(const e of EN)if(e.hp>0&&Math.hypot(e.x-d.x,e.z-d.z)<rad){e.hp-=dmg*foeMit(e.heavy?.7:1,1);hit=true;e.back=Math.max(e.back||0,.35)}
    for(let i=WV.length-1;i>=0;i--){const w=WV[i];if(w.hp>0&&Math.hypot(w.x-d.x,w.z-d.z)<rad){w.hp-=dmg>20?3:2;hit=true;if(w.hp<=0)killAnimal(w,Math.hypot(P.x-w.x,P.z-w.z)<28)}}
    if(hit)d.cd=d.t==='spike'?.65:2.1;
  }
}
function sysTick(dt){cullTick(dt);power(dt);anim(dt);nodeTick(dt);furnaces(dt);upkeepTick(dt);npcTick(dt);trapTick(dt);raidTick(dt);animalTick(dt);turrets(dt);crateTick(dt);ghostTick();ordTick(dt);dropTick(dt);return heat()}
// ===== ARMOR + FIREARMS (guns prototype, completed) =====
const EQ={head:0,chest:0,legs:0,feet:0},armorRed=()=>(EQ.head?.15:0)+(EQ.chest?.35:0)+(EQ.legs?.15:0)+(EQ.feet?.05:0);
function hurtP(d,why){if(ch('god')||dead)return;const dm=d*(1-armorRed());S.health-=dm;if(dm>0)hurtFx=Math.max(hurtFx,Math.min(.85,.3+dm*.03));if(why){demise=why;demiseT=age}}
function equip(id){const sl=ITEMS[id].arm,old=EQ[sl];if(old&&!room(old,1)){say('Inventory full.');return false}if(old)give(old,1,1);EQ[sl]=id;say(ITEMS[id].n+' equipped.');return true}
function unequip(sl){const id=EQ[sl];if(!id||!give(id,1))return;EQ[sl]=0;render()}
function armorUI(c){const d=document.createElement('div');d.className='row';d.style.marginTop='12px';let any=0;for(const sl of['head','chest','legs','feet']){const id=EQ[sl];if(!id)continue;any=1;d.appendChild(btn('Remove '+ITEMS[id].n,()=>unequip(sl)))}if(any)c.appendChild(d)}
const ARM_N={helmet:['Combat Helmet','⛑','head','Wear to cut incoming damage by 15%. Crafted with a Road Sign, Metal Sheet & Sewing Kit.',{road_sign:1,sheet:1,sewing_kit:1,cloth:4}],vest:['Armor Vest','🦺','chest','Wear to cut incoming damage by 35%. Crafted with Road Signs, Metal Sheets & Sewing Kits.',{road_sign:2,sheet:2,sewing_kit:2,rope:1,cloth:6}],legs:['Leg Guards','🛡','legs','Wear to cut incoming damage by 15%. Crafted with Road Signs, Sewing Kit & Rope.',{road_sign:1,sheet:1,sewing_kit:1,rope:1,cloth:4}],boots:['Work Boots','🥾','feet','Wear to cut incoming damage by 5%. Sturdy boots stitched from leather, cloth and rope.',{leather:4,cloth:3,rope:1}]};
for(const id in ARM_N){const a=ARM_N[id];ITEMS[id]={n:a[0],i:a[1],max:1,use:'Wear',arm:a[2],d:a[3],fx:()=>equip(id)};REC.push({out:id,q:1,need:a[4]})}
ITEMS.ammo={n:'Standard Rounds',i:'•',max:200,d:'Ammunition for every gun. Craft more from metal. Press T to swap ammo types.'};REC.push({out:'ammo',q:20,need:{metal:4}});
const AMMO={
 ammo:{tag:'STD',n:'Standard',col:'#ffe9a0',tc:0xffe9a0,fc:0xffc866,dm:1},
 ammo_hp:{tag:'HP',n:'Hollow Point',col:'#ffffff',tc:0xffffff,fc:0xfff0d0,dm:1.3},
 ammo_ap:{tag:'AP',n:'Armor-Piercing',col:'#9fd0ff',tc:0x9fd0ff,fc:0xbfe0ff,dm:1.1},
 ammo_inc:{tag:'INC',n:'Incendiary',col:'#ff8a3a',tc:0xff7a2a,fc:0xff8a30,dm:.9}};
const AMMO_IDS=Object.keys(AMMO);let ammoSel='ammo';
Object.assign(ITEMS,{
 ammo_hp:{n:'Hollow Point Rounds',i:'•',max:200,d:'+30% damage to flesh, but armor shrugs them off. Best on animals and unarmored raiders. Workbench. Press T to swap ammo.'},
 ammo_ap:{n:'Armor-Piercing Rounds',i:'•',max:200,d:'Ignore armor and heavy plating, and punch through to a second target. Slightly more damage. Workbench. Press T to swap ammo.'},
 ammo_inc:{n:'Incendiary Rounds',i:'•',max:200,d:'Set targets on fire. Less impact damage, but the burn ignores armor. Workbench. Press T to swap ammo.'}});
REC.push({out:'ammo_hp',q:20,need:{ammo:20,metal:2,charcoal:2}},{out:'ammo_ap',q:20,need:{ammo:20,metal:8,powder:2,gears:1}},{out:'ammo_inc',q:20,need:{ammo:20,sulfur:6,fuel:1}});
const ammoBox=(body,lid,tip,stripe)=>{let c=null;return()=>{if(!c)c=buildAmmoBox(body,lid,tip,stripe);return c.clone()}};
ITM.ammo_hp=ammoBox(0x4f5e36,0xe8e8e8,0xdddddd,0xffffff);ITM.ammo_ap=ammoBox(0x32425e,0x4a8ad9,0x22252a,0x4a8ad9);ITM.ammo_inc=ammoBox(0x5e3426,0xe0502a,0xff7a2a,0xff6a1a);
$('ammo').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();cycleAmmo()});
const GUNS={
 pistol:['Pistol','🔫',150,{dmg:22,rate:.35,mag:10,auto:0,spread:.012,pellets:1,range:70,reload:1.1,kick:.02},'Semi-auto, 10 rounds. Crafted from a Semi-Automatic Body, Metal Pipe & Metal Spring.',{semi_body:1,pipe:1,spring:1,metal:15}],
 shotgun:['Shotgun','🔫',100,{dmg:9,rate:.85,mag:5,auto:0,spread:.07,pellets:7,range:30,reload:2.2,kick:.05},'7 pellets per shot. Crafted from Metal Pipes, Metal Sheet & Metal Spring.',{pipe:2,spring:1,sheet:1,wood:10}],
 smg:['SMG','🔫',200,{dmg:13,rate:.09,mag:30,auto:1,spread:.035,pellets:1,range:55,reload:1.6,kick:.012},'Full-auto, 30 rounds. Hold Fire to spray.',{smg_body:1,pipe:1,spring:2,sheet:1,metal:20}],
 rifle:['Rifle','🔫',120,{dmg:40,rate:.6,mag:8,auto:0,spread:.004,pellets:1,range:140,reload:1.9,kick:.04},'Precision bolt-action rifle. Uses Semi-Auto Body, Metal Pipes, Springs & Gears.',{semi_body:1,pipe:2,spring:2,gears:1,wood:10}]};
Object.assign(GUNS,{
 sar:['Semi-Auto Rifle','🔫',160,{dmg:30,rate:.18,mag:16,auto:0,spread:.015,pellets:1,range:110,reload:1.8,kick:.03},'Fast semi-auto, 16 rounds. Uses Semi-Automatic Body, Metal Pipe, Spring & Metal Sheet.',{semi_body:1,pipe:1,spring:1,sheet:1,metal:20}],
 thompson:['Thompson','🔫',170,{dmg:16,rate:.12,mag:20,auto:1,spread:.03,pellets:1,range:60,reload:1.7,kick:.014},'Full-auto, 20 rounds. Hits harder than the SMG.',{smg_body:1,pipe:1,spring:2,wood:10,metal:20}],
 pump:['Pump Shotgun','🔫',130,{dmg:11,rate:.95,mag:6,auto:0,spread:.065,pellets:8,range:34,reload:2.4,kick:.05},'8 pellets, 6 shells. Uses Metal Pipes, Metal Springs, Metal Sheet & Gears.',{pipe:2,spring:2,sheet:1,gears:1,wood:12}]});
for(const id in GUNS){const g=GUNS[id];ITEMS[id]={n:g[0],i:g[1],max:1,dur:g[2],gun:g[3],d:g[4]};REC.push({out:id,q:1,need:g[5]})}

ITEMS.medkit={n:'Medkit',i:'🧰',max:5,use:'Use',d:'Restores 60 health.',fx:()=>S.health=Math.min(100,S.health+60)};
ITEMS.rations={n:'Military Rations',i:'🥫',max:10,use:'Eat',d:'Restores 35 food and a chunk of stamina.',fx:()=>{S.hunger=Math.min(100,S.hunger+35);S.energy=Math.min(100,S.energy+22)}};
ITEMS.revolver={n:'Revolver',i:'🔫',max:1,dur:180,gun:{dmg:45,rate:.55,mag:6,auto:0,spread:.01,pellets:1,range:80,reload:2,kick:.05},d:'Heavy six-shooter. Craftable, or crate loot.'};
ITEMS.ak={n:'Assault Rifle',i:'🔫',max:1,dur:220,gun:{dmg:26,rate:.11,mag:30,auto:1,spread:.03,pellets:1,range:100,reload:2,kick:.02},d:'Full-auto, 30 rounds. Needs Tech Trash from crates. Craftable.'};
Object.assign(ITEMS,{
 fuel:{n:'Low Grade Fuel',i:'🛢',max:100,d:'Found exclusively in red & oil barrels or refined from Crude Oil. Burns 3x longer than wood in a furnace.'},
 cloth:{n:'Cloth',i:'🧵',max:1000,d:'Harvested directly from wild hemp plants on the ground (or woven from plant fiber). Used for beds, armor, bandages, and sewing kits.'},
 // Tier 1 Components (15%-16% Barrel Drop)
 blade:{n:'Metal Blade',i:'🔪',max:50,tier:1,d:'Tier 1 component (15–16% barrel drop). Tempered steel cutting blade used to craft combat knives, machetes, hatchets, pickaxes, and traps.'},
 rope:{n:'Rope',i:'🪢',max:50,tier:1,d:'Tier 1 component (15–16% barrel drop, or braided from plant fiber). Used in spears, armor vests, water collectors, and satchel charges.'},
 sheet:{n:'Metal Sheet',i:'▭',max:50,tier:1,d:'Tier 1 component (15–16% barrel drop). Galvanized & corrugated steel sheet used for metal doors, refineries, armor, and weapon receivers.'},
 // Tier 2 Components
 propane:{n:'Empty Propane Tank',i:'🛢',max:20,tier:2,d:'Tier 2 component. Salvaged steel pressure cylinder used for Small Oil Refineries, Water Collectors, Heaters, Satchel Charges, and Rocket Launchers.'},
 sewing_kit:{n:'Sewing Kit',i:'🪡',max:50,tier:2,d:'Tier 2 component. Heavy nylon thread spools and steel needles in a tin case. Essential for Combat Helmets, Armor Vests, Leg Guards, Medkits, and Beds.'},
 tarp:{n:'Tarp',i:'🟦',max:50,tier:2,d:'Tier 2 component. Heavy-duty waterproof polyethylene tarpaulin with brass grommets. Used for Water Collectors, Respawn Beds, Bedrolls, and Solar Panels.'},
 // Tier 3 Components & Items
 fuse:{n:'Electric Fuse',i:'⚡',max:20,tier:3,d:'Tier 3 component. High-amperage ceramic & glass cartridge fuse with brass caps. Required for Research Tables, Timed Charges (C4), Auto Turrets, and Electronics.'},
 pipe:{n:'Metal Pipe',i:'🔧',max:50,tier:3,d:'Tier 3 component. Seamless high-pressure steel pipe with threaded couplings. Used for firearms, Rocket Launchers, Pump Jacks, Quarries, and Refineries.'},
 spring:{n:'Metal Spring',i:'🌀',max:50,tier:3,d:'Tier 3 component. Tempered helical recoil spring. Required for every firearm, Rocket Launcher, Armored Door, and Snap Trap.'},
 road_sign:{n:'Road Sign',i:'🛑',max:30,tier:3,d:'Tier 3 component. Salvaged reflective aluminum highway sign plate. Used to craft Combat Helmets, Armor Vests, Leg Guards, Machetes, and Embrasures.'},
 semi_body:{n:'Semi-Automatic Body',i:'⚙',max:10,tier:3,d:'Tier 3 component. Milled steel semi-automatic firearm receiver with trigger group. Used to craft Pistols, Semi-Auto Rifles (SAR), and Bolt Rifles.'},
 smg_body:{n:'SMG Body',i:'⚙',max:10,tier:3,d:'Tier 3 component. Stamped steel automatic receiver used for SMGs, Thompsons, and Assault Rifles.'},
 tech:{n:'Tech Trash',i:'🔌',max:20,tier:3,d:'Tier 3 salvaged military electronics. Needed for Assault Rifles, Timed Charges (C4), and Targeting Computers.'}
});
ITEMS.gears.tier=3;ITEMS.gears.d='Tier 3 component. Heavy machined steel cogwheels salvaged from barrels & junk piles. Used in Turrets, Quarries, Pump Jacks, and Traps.';
ITEMS.circuit.tier=3;
COMP.push('cloth','blade','rope','sheet','propane','sewing_kit','tarp','fuse','pipe','spring','road_sign','semi_body','smg_body','tech','fuel');
// Component & Medical crafting recipes (Workbench for T1-T3 components)
REC.push(
 {out:'cloth',q:2,need:{fiber:4}},
 {out:'rope',q:1,need:{fiber:6,cloth:1}},
 {out:'blade',q:1,need:{metal:10,scrap:2}},
 {out:'sheet',q:1,need:{metal:16,scrap:3}},
 {out:'propane',q:1,need:{sheet:1,metal:18,scrap:5}},
 {out:'sewing_kit',q:1,need:{cloth:4,rope:1,metal:4}},
 {out:'tarp',q:1,need:{cloth:6,fiber:6,fuel:1}},
 {out:'fuse',q:1,need:{metal:10,circuit:1,scrap:8}},
 {out:'pipe',q:1,need:{metal:14,sheet:1}},
 {out:'spring',q:1,need:{metal:18,gears:1,fuel:1}},
 {out:'road_sign',q:1,need:{sheet:1,metal:15,scrap:6}},
 {out:'semi_body',q:1,need:{sheet:1,pipe:1,spring:1,metal:25}},
 {out:'smg_body',q:1,need:{sheet:2,pipe:1,spring:2,gears:1,metal:35}},
 {out:'medkit',q:1,need:{bandage:2,cloth:4,sewing_kit:1,fuel:2}}
);
REC.push(
 {out:'revolver',q:1,need:{pipe:1,spring:1,cloth:4,metal:18}},
 {out:'ak',q:1,need:{smg_body:1,pipe:2,spring:3,sheet:2,wood:12,tech:1}}
);
Object.assign(RY,{
 blade:{scrap:2,metal:12},
 rope:{cloth:3,fiber:4},
 sheet:{scrap:5,metal:12},
 propane:{scrap:5,metal:25},
 sewing_kit:{cloth:5,rope:2},
 tarp:{cloth:8,fiber:4},
 fuse:{scrap:20,metal:6},
 gears:{scrap:10,metal:12},
 pipe:{scrap:5,metal:10},
 spring:{scrap:10,metal:10},
 road_sign:{scrap:8,metal:15},
 semi_body:{scrap:15,metal:25,spring:1},
 smg_body:{scrap:20,metal:30,spring:1},
 tech:{scrap:20,circuit:1}
});
Object.assign(RCOST,{
 blade:15,rope:15,sheet:20,propane:35,sewing_kit:35,tarp:35,
 fuse:60,gears:60,pipe:50,spring:75,road_sign:60,semi_body:75
});
const bld=f=>{let cache=null;return()=>{if(!cache){const b=new MB();f(b);cache=b.build()}return cache.clone()}};
Object.assign(ITM,{
 revolver:()=>gunM((b,a,mg,c)=>{
  // Heavy .357 / .44 Magnum Six-Shooter with ventilated rib, full underlug & coaxial fluted cylinder
  b.brl(.024,.025,.46,12,.31,.205,0,0x4a5058);
  b.box(.44,.018,.034,.30,.232,0,0x3a3f47);
  b.vent(5,.042,.014,.038,.14,.075,.226,0,0x121417);
  b.box(.42,.028,.036,.29,.172,0,0x3a3f47);
  b.cyl(.014,.014,.36,10,.26,.168,0,0x7a828c,[0,0,1.5708]);
  b.cyl(.019,.019,.028,10,.45,.168,0,0x555b64,[0,0,1.5708]);
  // Heavy revolver frame with cylinder window, top strap, recoil shield & sideplate screws
  b.box(.24,.024,.064,.01,.242,0,0x3e434c);
  b.box(.24,.026,.064,.01,.102,0,0x3e434c);
  b.box(.055,.15,.074,.105,.172,0,0x3e434c);
  b.box(.095,.155,.078,-.10,.168,0,0x3e434c);
  b.sph(.046,-.08,.172,0,0x464c56,1,8);
   // Ramp front sight with orange insert & open micrometer rear U-notch
   b.box(.042,.032,.014,.50,.248,0,0x1d2025,[0,0,-.25]);
   b.box(.018,.018,.014,.51,.260,0,0xff4820);
   for(const z of[-.017,.017])b.box(.052,.024,.016,-.11,.258,z,0x1d2025);
  // Coaxial 6-round fluted cylinder (c) oriented along X axis with 6 recessed chambers & brass rims
  c.cyl(.072,.072,.152,16,0,0,0,0x5c636c,[0,0,1.5708]);
  c.cyl(.022,.022,.166,10,0,0,0,0x2a2e34,[0,0,1.5708]);
  for(let k=0;k<6;k++){
   const q=k*1.0472,cy=Math.cos(q)*.046,cz=Math.sin(q)*.046;
   c.cyl(.0165,.0165,.156,10,.003,cy,cz,0x0e1013,[0,0,1.5708]);
   c.cyl(.018,.018,.014,10,-.074,cy,cz,0xd4af37,[0,0,1.5708]);
   c.cyl(.007,.007,.016,8,-.075,cy,cz,0xc4cad0,[0,0,1.5708]);
   const fq=q+.5236;
   c.cyl(.015,.015,.11,8,.008,Math.cos(fq)*.068,Math.sin(fq)*.068,0x3a3f47,[0,0,1.5708]);
  }
  // Checkered walnut target grip with brass medallion & finger grooves
  b.box(.118,.265,.082,-.145,-.005,0,0x6e4524,[0,0,-.32]);
  b.box(.10,.235,.09,-.145,-.005,0,0x7d4f2a,[0,0,-.32]);
  b.chk(5,.012,.14,.094,-.16,.016,-.01,.005,0,0x3e2613,[0,0,-.32]);
  for(const z of[-.046,.046])b.cyl(.016,.016,.008,10,-.135,.035,z,0xd4af37,[1.5708,0,0]);
  // Trigger guard & curved double-action trigger
  b.box(.012,.065,.038,-.01,.062,0,0x3a3f47);
  b.box(.105,.012,.038,-.06,.032,0,0x3a3f47);
  b.box(.016,.048,.018,-.05,.072,0,0xb8c0c8,[0,0,.22]);
  // Spurred target hammer (a) — contoured below the rear U-notch sight line so ADS sight picture is clear
  a.box(.042,.042,.022,0,.016,0,0x4a5058,[0,0,-.32]);
  a.box(.034,.014,.028,-.020,.034,0,0x2a2e34);
  return{act:[-.135,.188,0],cyl:[.01,.172,0],grip:[-.12,.04,0],fore:null,gd:[-1,-.8,.35]};
 }),
 ak:()=>gunM((b,a,mg,c)=>{
  // Classic AKM / Assault Rifle with stamped receiver, gas tube, wood furniture, banana mag & slanted brake
  b.brl(.021,.023,.88,12,.52,.20,0,0x22262b);
  // Slanted AKM compensator & tall hooded front sight tower + cleaning rod
  b.cyl(.026,.025,.075,10,.95,.20,0,0x1a1d21,[0,0,1.5708]);
  b.box(.045,.032,.032,.97,.215,0,0x0b0c0e,[0,0,.45]);
  b.box(.038,.072,.024,.86,.232,0,0x22262b,[0,0,-.12]);
  b.tor(.028,.0045,.86,.295,0,0x22262b,[0,1.5708,0],12,6);
  b.box(.008,.026,.008,.86,.286,0,0x38ff6a);
  b.sph(.0055,.86,.295,0,0x38ff6a,1,6);
  b.cyl(.007,.007,.52,6,.62,.172,0,0x3a3f47,[0,0,1.5708]);
  // Angled gas block & fluted steel gas tube
  b.box(.055,.085,.038,.62,.24,0,0x282c32,[0,0,-.35]);
  b.cyl(.026,.026,.38,10,.43,.268,0,0x2e333a,[0,0,1.5708]);
  // Laminated wood upper & lower handguards with palm swells & vents
  b.box(.26,.048,.068,.40,.266,0,0x744624);
  b.box(.36,.082,.078,.40,.172,0,0x824f29);
  b.box(.32,.038,.088,.40,.172,0,0x8f582e);
  b.vent(3,.038,.024,.084,.33,.06,.22,0,0x121417);
  b.box(.028,.092,.084,.58,.182,0,0x22262b);
  // Rear sight block & open tangent V-notch leaf aligned with front post (y = 0.295)
  b.box(.095,.046,.068,.19,.238,0,0x262a30);
  b.box(.085,.012,.038,.19,.266,0,0x555b64);
  for(const z of[-.020,.020])b.box(.022,.026,.016,.18,.292,z,0x1a1d21);
  // Stamped steel receiver with magazine dimples, rivets, selector lever & ribbed dust cover
  b.box(.48,.115,.08,-.04,.162,0,0x2c3138);
  b.box(.44,.048,.074,-.04,.225,0,0x353b44);
  for(let i=0;i<5;i++)b.box(.014,.042,.078,-.20+i*.08,.225,0,0x262a30);
  for(const z of[-.042,.042])b.box(.11,.032,.008,.06,.145,z,0x1d2025);
  b.box(.18,.022,.012,-.06,.165,.044,0x1e2227,[0,0,-.08]);
  // Reciprocating stainless/steel bolt carrier & charging handle (a)
  a.box(.155,.044,.032,.11,.208,.038,0xaeb6c0);
  a.cyl(.014,.014,.055,8,.17,.208,.065,0x8a929a,[1.5708,0,0]);
  a.cyl(.018,.018,.018,8,.17,.208,.09,0x22262b,[1.5708,0,0]);
  // Iconic curved 30-round Bakelite / ribbed steel banana magazine (mg)
  mg.box(.076,.19,.068,.075,-.02,0,0x9e4220,[0,0,.28]);
  mg.box(.076,.20,.068,.135,-.18,0,0x9e4220,[0,0,.52]);
  for(let i=0;i<4;i++)mg.box(.082,.014,.074,.085+i*.02,-.04-i*.055,0,0x783016,[0,0,.38]);
  mg.box(.086,.024,.076,.188,-.27,0,0x22262b,[0,0,.52]);
  b.box(.022,.038,.032,-.005,.082,0,0x22262b);
  // Checkered Bakelite pistol grip, trigger guard & wood buttstock with steel buttplate
  b.box(.10,.22,.074,-.21,-.005,0,0x7a341c,[0,0,-.26]);
  b.chk(5,.09,.014,.078,-.20,-.006,.05,-.03,0,0x4f2010,[0,0,-.26]);
  b.box(.012,.062,.038,-.08,.068,0,0x22262b);
  b.box(.095,.012,.038,-.125,.038,0,0x22262b);
  b.box(.014,.045,.016,-.11,.075,0,0x9aa2ac,[0,0,.2]);
  b.box(.48,.125,.072,-.52,.105,0,0x744624,[0,0,-.14]);
  b.box(.24,.045,.076,-.44,.155,0,0x824f29,[0,0,-.08]);
  b.box(.035,.155,.076,-.76,.068,0,0x1d2025,[0,0,-.14]);
  b.cyl(.014,.014,.008,8,-.778,.07,0,0x555b64,[0,0,1.5708]);
  return{grip:[-.2,.04,0],fore:[.35,.1,0],gd:[-1,-.7,.4]};
 }),
 wood:bld(b=>{for(const[x,y,z]of[[0,.08,-.1],[0,.08,.1],[0,.24,0]]){b.cyl(.08,.08,.5,8,x,y,z,0x6b4a2a,[0,0,1.5708]);b.cyl(.07,.07,.02,8,.25,y,z,0xc9a06a,[0,0,1.5708])}}),
 stone:bld(b=>{b.sph(.16,0,.1,0,0x8a8a8e,.75,5);b.sph(.11,.18,.07,.05,0x77777a,.8,5);b.sph(.09,-.12,.06,.12,0x9a9a9e,.8,5)}),
 fiber:bld(b=>{for(let i=0;i<6;i++)b.cyl(.015,.015,.36,4,(i-2.5)*.025,.1,(i%2)*.02,0x6fa83a,[0,0,1.5708+(i-3)*.05]);b.cyl(.04,.04,.04,6,0,.1,0,0xc9b037,[0,0,1.5708])}),
 berry:bld(b=>{for(const[x,y,z]of[[0,.08,0],[.09,.06,.04],[-.08,.06,.05],[.02,.06,-.09],[.0,.15,.0]])b.sph(.055,x,y,z,0xa8232b,1,6);b.box(.2,.02,.08,0,.2,0,0x3f5a2e)}),
 bandage:bld(b=>{b.cyl(.07,.07,.14,12,0,.07,0,0xf0f0ea,[1.5708,0,0]);b.cyl(.025,.025,.15,8,0,.07,0,0xcdbf9a,[1.5708,0,0]);b.box(.1,.03,.005,0,.07,.075,0xc23b32);b.box(.03,.1,.005,0,.07,.075,0xc23b32);b.box(.16,.008,.1,.1,.004,.02,0xf0f0ea)}),
 campfire:bld(b=>{for(let i=0;i<4;i++){const a=i*1.571;b.cyl(.05,.05,.5,6,Math.cos(a)*.15,.07,Math.sin(a)*.15,0x5a3d28,[0,0,1.5708],[0,a,0]);}b.cone(.14,.4,6,0,.3,0,0xff9a2a);b.cone(.08,.3,5,0,.35,0,0xffd24a)}),
 meat:bld(b=>{b.sph(.14,0,.1,0,0xb23a3a,.7,7);b.sph(.09,.05,.14,.02,0xd96a6a,.7,6);b.cyl(.025,.025,.3,5,.2,.1,0,0xeeeadd,[0,0,1.5708]);b.sph(.04,.36,.1,0,0xeeeadd,1,5)}),
 cooked:bld(b=>{b.sph(.14,0,.1,0,0x7a4a2a,.7,7);b.sph(.09,.05,.14,.02,0x9a6a3a,.7,6);b.cyl(.025,.025,.3,5,.2,.1,0,0xeeeadd,[0,0,1.5708]);b.sph(.04,.36,.1,0,0xeeeadd,1,5)}),
 ore:bld(b=>{b.sph(.16,0,.1,0,0x4a4a4e,.8,5);for(const[x,y,z]of[[.14,.12,.06],[-.1,.2,.05],[.03,.08,.15],[-.12,.08,-.08],[.05,.2,-.1]])b.box(.07,.07,.07,x,y,z,0xe0832a,[.4,.4,0])}),
 metal:bld(b=>{b.box(.3,.08,.14,0,.04,-.08,0x9a9ea6);b.box(.3,.08,.14,0,.04,.08,0x8a8e96);b.box(.3,.08,.14,0,.12,0,0xaaaeb6)}),
 gears:bld(b=>{b.cyl(.14,.14,.04,12,0,.1,0,0x8a8e96,[1.5708,0,0]);for(let i=0;i<8;i++){const a=i*.785;b.box(.06,.06,.04,Math.cos(a)*.16,.1+Math.sin(a)*.16,0,0x8a8e96,[0,0,a])}b.cyl(.04,.04,.06,8,0,.1,0,0x333333,[1.5708,0,0])}),
 circuit:bld(b=>{b.box(.3,.02,.22,0,.02,0,0x2f7a3a);b.box(.08,.03,.08,-.05,.045,0,0x1c1e21);b.box(.05,.03,.05,.08,.045,.05,0x1c1e21);b.box(.12,.005,.01,.0,.035,-.07,0xd4af37);b.box(.01,.005,.12,.1,.035,-.03,0xd4af37)}),
 wire:bld(b=>{b.tor(.1,.04,0,.1,0,0xe6c340,[1.5708,0,0],8,12);b.cyl(.05,.05,.1,8,0,.1,0,0x55504a,[1.5708,0,0])}),
 medkit:bld(b=>{b.box(.34,.22,.16,0,.11,0,0xeeeeee);b.box(.1,.03,.17,0,.12,0,0xc23b32);b.box(.03,.1,.17,0,.12,0,0xc23b32);b.box(.14,.04,.03,0,.24,0,0x555555)}),
 rations:bld(b=>{b.cyl(.09,.09,.14,12,0,.07,0,0x8a8e96);b.cyl(.092,.092,.07,12,0,.07,0,0x5a6a3a);b.cyl(.085,.085,.01,12,0,.145,0,0xbfc3c8)}),
 sulfur:bld(b=>{b.sph(.12,0,.1,0,0xd6c04a,.8,6);b.sph(.08,.12,.08,.04,0xe6d56a,.75,5);b.sph(.07,-.1,.07,-.02,0xc9a437,.8,5);b.box(.06,.06,.06,.02,.16,.08,0xf0e090)}),
 charcoal:bld(b=>{for(const[x,z]of[[0,0],[.1,.04],[-.08,.05],[.02,-.08]])b.box(.1,.06,.08,x,.06,z,0x2a2422);b.box(.08,.05,.06,.04,.12,.02,0x1a1614)}),
 powder:bld(b=>{b.cyl(.1,.11,.16,10,0,.08,0,0x3a3a3c);b.cyl(.07,.07,.04,8,0,.17,0,0x222222);b.sph(.045,.02,.2,0,0xd9d3c4,1,6)}),
 beancan:bld(b=>{b.cyl(.1,.1,.22,10,0,.12,0,0x3d4a28);b.cyl(.04,.04,.08,6,0,.26,0,0x222222);b.box(.03,.06,.02,0,.32,0,0xd9b32a)}),
 satchel:bld(b=>{b.box(.32,.2,.16,0,.12,0,0x6b4a2a);b.box(.18,.06,.04,0,.24,0,0x2a2420);b.cyl(.02,.02,.18,5,.12,.16,.08,0xd9b32a)}),
 c4:bld(b=>{b.box(.3,.14,.22,0,.1,0,0xc4552a);b.box(.1,.05,.08,0,.18,0,0x1c1e21);b.box(.05,.05,.04,0,.2,.06,0xff3030);b.box(.22,.02,.16,0,.04,0,0x6a3018)}),
 rocket:bld(b=>{b.cyl(.048,.048,.38,10,0,.16,0,0x3b482e);b.cone(.062,.16,10,0,.42,0,0xc4552a);b.cyl(.032,.048,.08,10,0,-.06,0,0x2a2e34);for(let i=0;i<4;i++){const a=i*1.5708;b.box(.14,.05,.012,Math.cos(a)*.04,-.06,Math.sin(a)*.04,0x555b64,[0,a,0])}b.cyl(.05,.05,.025,10,0,.32,0,0xd9b32a)}),
 launcher:()=>gunM(b=>{
  // RPG-7 / Recoilless Heavy Rocket Launcher with wood heatshield, venturi cone, optical sight & loaded warhead
  b.cyl(.072,.072,.96,14,.12,.20,0,0x3b4730,[0,0,1.5708]);
  b.cyl(.082,.082,.38,14,-.08,.20,0,0x6e4524,[0,0,1.5708]);
  for(const x of[-.25,-.08,.09,.42,.56])b.cyl(.085,.085,.026,14,x,.20,0,0x22262b,[0,0,1.5708]);
  // Flared rear venturi exhaust cone & front collar
  b.cyl(.115,.074,.22,14,-.44,.20,0,0x282c32,[0,0,1.5708]);
  b.cyl(.095,.095,.025,14,-.55,.20,0,0x111316,[0,0,1.5708]);
  b.cyl(.088,.076,.08,14,.60,.20,0,0x282c32,[0,0,1.5708]);
  // Loaded PG-7V warhead protruding from muzzle
  b.cone(.105,.22,14,.74,.20,0,0x4a5838,[0,0,-1.5708]);
  b.cone(.085,.12,14,.58,.20,0,0x4a5838,[0,0,1.5708]);
  b.cyl(.026,.026,.06,10,.86,.20,0,0xc4552a,[0,0,1.5708]);
  b.cyl(.106,.106,.022,14,.66,.20,0,0xd9b32a,[0,0,1.5708]);
  // Dual pistol grips, trigger housing & flip-up ladder optical sight
  b.box(.18,.055,.065,.12,.11,0,0x22262b);
  b.box(.085,.19,.068,.20,.02,0,0x5e3b1f,[0,0,-.18]);
  b.box(.085,.19,.068,-.18,.03,0,0x5e3b1f,[0,0,-.22]);
  b.box(.014,.055,.038,.25,.05,0,0x22262b);
  b.box(.045,.085,.028,.48,.31,0,0x22262b);
  b.box(.028,.065,.034,.48,.33,0,0x0c0e10);
  b.box(.065,.075,.048,.05,.30,.02,0x22262b);
  b.cyl(.024,.024,.09,10,.05,.32,.045,0x181b1f,[0,0,1.5708]);
  return{grip:[.20,.04,0],fore:[-.18,.04,0],gd:[-1,-.7,.4]};
 })
});
const rawModel=id=>{const it=ITEMS[id];return it.bd||it.dv?mk(it,null):itemModel(id)};
const IC={};let icCv=null,icCtx=null;
function ico(id){const it=ITEMS[id];if(!it)return'';if(IC[id]===undefined){IC[id]=null;try{
 if(!icCv){icCv=document.createElement('canvas');icCv.width=icCv.height=72;icCtx=icCv.getContext('2d')}
 const m=rawModel(id),w=new T.Group();w.add(m);const bb=new T.Box3().setFromObject(m),c=bb.getCenter(new T.Vector3()),z=bb.getSize(new T.Vector3()),r=Math.max(z.x,z.y,z.z)||1;m.position.sub(c);
 if(it.gun||id==='launcher')w.rotation.set(.22,-.42,.28);else w.rotation.set(.32,-.62,.12);
 w.updateMatrixWorld(true);const tris=[],v0=new T.Vector3(),v1=new T.Vector3(),v2=new T.Vector3(),e1=new T.Vector3(),e2=new T.Vector3(),nm=new T.Vector3(),col=new T.Color(),sc=54/r;
 w.traverse(ch=>{if(!ch.isMesh||!ch.geometry)return;const g=ch.geometry,pos=g.attributes.position,ca=g.attributes.color,idx=g.index,mw=ch.matrixWorld,mc=ch.material&&ch.material.color?ch.material.color:col.setHex(0xcccccc);
  const tri=(i0,i1,i2)=>{v0.fromBufferAttribute(pos,i0).applyMatrix4(mw);v1.fromBufferAttribute(pos,i1).applyMatrix4(mw);v2.fromBufferAttribute(pos,i2).applyMatrix4(mw);
   e1.subVectors(v1,v0);e2.subVectors(v2,v0);nm.crossVectors(e1,e2).normalize();
   if(ca)col.setRGB((ca.getX(i0)+ca.getX(i1)+ca.getX(i2))/3,(ca.getY(i0)+ca.getY(i1)+ca.getY(i2))/3,(ca.getZ(i0)+ca.getZ(i1)+ca.getZ(i2))/3);else col.copy(mc);
   const l=Math.max(.32,Math.min(1.22,.58+nm.x*.28+nm.y*.42+nm.z*.35)),R=Math.min(255,col.r*255*l|0),G=Math.min(255,col.g*255*l|0),B=Math.min(255,col.b*255*l|0);
   tris.push({z:(v0.z+v1.z+v2.z)/3,x0:36+v0.x*sc,y0:36-v0.y*sc,x1:36+v1.x*sc,y1:36-v1.y*sc,x2:36+v2.x*sc,y2:36-v2.y*sc,c:'rgb('+R+','+G+','+B+')'})};
  if(idx){for(let i=0;i<idx.count;i+=3)tri(idx.getX(i),idx.getX(i+1),idx.getX(i+2))}else if(pos){for(let i=0;i<pos.count;i+=3)tri(i,i+1,i+2)}});
 tris.sort((a,b)=>a.z-b.z);icCtx.clearRect(0,0,72,72);icCtx.lineJoin='round';icCtx.lineWidth=.55;
 for(let i=0;i<tris.length;i++){const t=tris[i];icCtx.fillStyle=icCtx.strokeStyle=t.c;icCtx.beginPath();icCtx.moveTo(t.x0,t.y0);icCtx.lineTo(t.x1,t.y1);icCtx.lineTo(t.x2,t.y2);icCtx.closePath();icCtx.fill();icCtx.stroke()}
 IC[id]=icCv.toDataURL()}catch(e){IC[id]=null}}
 return IC[id]?'<img alt="" src="'+IC[id]+'">':it.i}
// viewmodel
const vm=new T.Group();cam.add(vm);const muzzle=new T.PointLight(0xffddaa,0,10);muzzle.position.set(.3,-.2,-1);cam.add(muzzle);
let vmId=null,vmSig=null,vmM=null,kickV=0,flashT=0,fireCd=0,reloadT=0,reloadD=1,reloadS=null,fireHeld=false,lnT=0,mT=0,mD=.5,mSt='slash',mCd=0,swing=0,swX=0,swY=0,mdx=0,mdy=0;
let vmP=null,gz=0,gzv=0,gr=0,grv=0,gy=0,gyv=0,gro=0,grov=0,camK=0,camY=0,camR=0,actT=0,actD=1,ejDone=true,invT=0,drawT=0,flashK=1,flashR=0,flashCol=0xffcc66,cylR=0,cylT=0,rlF=0;const BURN=[],vmG=new T.Vector3();
const VMS={revolver:[.9,.22,-.2,-.55],ak:[.46,.24,-.24,-.8],pistol:[.9,.22,-.2,-.55],smg:[.65,.24,-.22,-.65],shotgun:[.48,.24,-.24,-.75],rifle:[.42,.24,-.24,-.8]};
const gunOf=()=>{const s=SL[sel];return s&&ITEMS[s.id].gun?s:null};
Object.assign(VMS,{sar:[.44,.24,-.24,-.8],thompson:[.55,.24,-.22,-.7],pump:[.48,.24,-.24,-.75]});
Object.assign(ITM,{
 sar:()=>gunM((b,a,mg,c)=>{
  // Semi-Automatic Rifle (SAR): Wasteland precision carbine with banded wood handguard, gas system & receiver
  b.brl(.019,.022,.84,12,.52,.20,0,0x24282e);
  b.cyl(.027,.024,.08,10,.92,.20,0,0x1a1d21,[0,0,1.5708]);
  b.vent(2,.024,.032,.056,.91,.028,.20,0,0x0b0c0e);
   // Gas block & upper gas tube + hooded front post aligned with rear peep (y = 0.282)
   b.box(.048,.078,.038,.74,.232,0,0x2c3138);
   b.box(.010,.042,.010,.88,.276,0,0x38ff6a);
   b.tor(.022,.0045,.88,.282,0,0x2c3138,[0,1.5708,0],10,6);
  b.cyl(.016,.016,.44,10,.50,.248,0,0x383e47,[0,0,1.5708]);
  // Banded wood handguard with cooling slots & steel clamping bands
  b.box(.38,.088,.078,.42,.158,0,0x704826);
  b.box(.36,.042,.086,.42,.162,0,0x7f522c);
  b.vent(4,.042,.022,.09,.29,.075,.162,0,0x24160b);
  for(const x of[.26,.57])b.box(.028,.098,.088,x,.162,0,0x454b54);
  // Stamped/riveted steel receiver with top Picatinny rail & rear peep sight
  b.box(.54,.118,.076,-.02,.168,0,0x323740);
  b.box(.50,.036,.07,-.02,.228,0,0x3d434e);
  for(let i=0;i<4;i++)for(const z of[-.04,.04])b.cyl(.008,.008,.006,6,-.18+i*.11,.15,z,0x7a828c,[1.5708,0,0]);
  b.pic(8,-.20,.038,.246,0,.046,0x1d2025);
  for(const z of[-.022,.022])b.box(.028,.026,.012,-.21,.272,z,0x22262b);
  b.tor(.024,.004,-.21,.282,0,0x22262b,[0,1.5708,0],12,6);
  // Reciprocating bolt carrier & charging handle (a)
  a.box(.15,.042,.032,.09,.202,.036,0xa6aeb8);
  a.cyl(.013,.013,.05,8,.15,.202,.062,0x68707a,[1.5708,0,0]);
  // Ribbed 16-round steel box magazine (mg)
  mg.box(.078,.25,.066,.065,-.025,0,0x1c1f24,[0,0,.11]);
  for(let i=0;i<4;i++)mg.box(.084,.014,.072,.07-i*.005,.04-i*.05,0,0x2e333a,[0,0,.11]);
  mg.box(.088,.024,.076,.05,-.15,0,0x121417,[0,0,.11]);
  // Checkered grip, trigger guard & weathered wood buttstock with cheek pad
  b.box(.10,.21,.074,-.21,.01,0,0x684222,[0,0,-.25]);
  b.chk(4,.09,.014,.078,-.20,-.006,.05,-.03,0,0x3b2412,[0,0,-.25]);
  b.box(.012,.062,.038,-.08,.072,0,0x22262b);
  b.box(.095,.012,.038,-.125,.042,0,0x22262b);
  b.box(.014,.045,.016,-.11,.08,0,0x9aa2ac,[0,0,.2]);
  b.box(.48,.12,.072,-.50,.095,0,0x704826,[0,0,-.10]);
  b.box(.22,.032,.08,-.46,.142,0,0x2b2018,[0,0,-.06]);
  b.box(.038,.155,.078,-.74,.088,0,0x1a1c1f,[0,0,-.10]);
  return{grip:[-.2,.04,0],fore:[.4,.1,0],gd:[-1,-.7,.4]};
 }),
 thompson:()=>gunM((b,a,mg,c)=>{
  // Classic M1928A1 Thompson Submachine Gun with radial cooling fins, Cutts compensator & drum/stick mag
  b.brl(.022,.025,.58,12,.41,.175,0,0x24282e);
  // 8 radial barrel cooling fins
  for(let i=0;i<8;i++)b.cyl(.035,.035,.012,12,.17+i*.024,.175,0,0x343942,[0,0,1.5708]);
  // Cutts compensator with top slots & pinned blade front sight
  b.cyl(.031,.028,.095,12,.68,.175,0,0x3e444e,[0,0,1.5708]);
  b.vent(3,.016,.024,.064,.655,.022,.188,0,0x0c0e10);
   b.box(.024,.048,.014,.70,.224,0,0x24282e);
   b.box(.009,.024,.010,.70,.254,0,0x38ff6a);
   // Machined billet steel receiver with Thompson side grooves & open Lyman rear sightears
   b.box(.52,.125,.082,-.01,.155,0,0x30353e);
   b.box(.48,.024,.074,-.01,.218,0,0x3b414c);
   for(const z of[-.043,.043])b.box(.28,.024,.008,-.08,.155,z,0x1e2227);
   for(const z of[-.018,.018]){
    b.box(.075,.028,.018,-.20,.238,z,0x22262b);
    b.box(.018,.036,.014,-.21,.256,z,0x3a3f47);
   }
   // Slotted charging actuator knob (sits below sightline at y = 0.228 with sighting notch)
   a.box(.11,.028,.038,.10,.202,0,0x8a929a);
   for(const z of[-.014,.014])a.box(.024,.026,.012,.10,.232,z,0xb8c0c8);
  // Horizontal American walnut foregrip with finger grooves + contoured grip + drop-comb buttstock
  b.box(.26,.078,.084,.36,.115,0,0x7a4824);
  for(let i=0;i<4;i++)b.box(.032,.028,.09,.27+i*.055,.118,0,0x4f2e16);
  b.box(.105,.215,.076,-.17,-.005,0,0x7a4824,[0,0,-.22]);
  b.chk(4,.095,.014,.08,-.16,-.006,.05,-.03,0,0x4f2e16,[0,0,-.22]);
  b.box(.42,.125,.074,-.46,.075,0,0x7a4824,[0,0,-.16]);
  b.box(.038,.155,.078,-.67,.04,0,0xc8a23c,[0,0,-.16]);
  // Trigger guard, selector switches & iconic radial drum + stick magazine assembly (mg)
  b.box(.012,.062,.038,-.04,.065,0,0x22262b);
  b.box(.095,.012,.038,-.085,.035,0,0x22262b);
  b.box(.014,.045,.016,-.07,.072,0,0xb8c0c8,[0,0,.2]);
  mg.cyl(.115,.115,.076,16,.065,-.055,0,0x262a30,[1.5708,0,0]);
  mg.cyl(.092,.092,.082,16,.065,-.055,0,0x323740,[1.5708,0,0]);
  mg.cyl(.024,.024,.092,10,.065,-.055,0,0x9aa2ac,[1.5708,0,0]);
  mg.box(.095,.018,.014,.065,-.055,.048,0xb8c0c8,[0,0,.6]);
  mg.box(.066,.22,.064,.065,-.04,0,0x1c1f24);
  return{grip:[-.12,.04,0],fore:[.36,.1,0],gd:[-1,-.7,.4]};
 }),
 pump:()=>gunM((b,a,mg,c)=>{
  // Tactical Pump-Action 12-Gauge Shotgun with perforated heatshield, magazine tube & receiver shell caddy
  b.brl(.026,.027,.88,12,.52,.205,0,0x24282e);
  // Perforated steel barrel heatshield + fiber-optic front sight
  b.cyl(.032,.032,.48,12,.38,.212,0,0x353b44,[0,0,1.5708]);
  b.vent(7,.036,.018,.07,.18,.062,.222,0,0x0c0e10);
   b.box(.028,.048,.016,.92,.246,0,0x1d2025);
   b.cyl(.007,.007,.028,6,.92,.272,0,0x38ff6a,[0,0,1.5708]);
  // Full-length underbarrel tubular magazine with knurled cap & barrel clamp
  b.cyl(.026,.026,.72,12,.44,.132,0,0x2e333a,[0,0,1.5708]);
  b.cyl(.029,.029,.045,12,.81,.132,0,0x1a1d21,[0,0,1.5708]);
  b.box(.032,.095,.064,.72,.168,0,0x1a1d21);
  // Machined receiver with ejection port, ghost-ring rear sight, top Picatinny rail & 4-shell side saddle
  b.box(.38,.13,.082,-.02,.17,0,0x2c3138);
  b.box(.34,.028,.072,-.02,.238,0,0x363c46);
  b.box(.11,.042,.014,.04,.182,-.042,0xc4cad2);
  b.pic(6,-.14,.038,.246,0,.046,0x1c1f24);
  b.tor(.024,.004,-.15,.272,0,0x22262b,[0,1.5708,0],12,6);
  // Side-saddle shell holder with 4 red 12ga shells on left side of receiver
  b.box(.18,.055,.018,-.03,.168,.048,0x181b1f);
  for(let i=0;i<4;i++){
   b.cyl(.012,.012,.062,8,-.095+i*.042,.168,.058,0xc42b22);
   b.cyl(.013,.013,.018,8,-.095+i*.042,.195,.058,0xd4af37);
  }
  // Ribbed corncob walnut/polymer pump forend (a) with dual steel action bars
  a.cyl(.042,.042,.28,12,.38,.125,0,0x6e4524,[0,0,1.5708]);
  for(let i=0;i<7;i++)a.tor(.043,.005,.26+i*.04,.125,0,0x3d2512,[0,1.5708,0],12,6);
  for(const z of[-.034,.034])a.box(.24,.012,.008,.18,.132,z,0x8a929a);
  // Pistol grip, trigger guard & walnut buttstock with thick ventilated recoil pad
  b.box(.105,.215,.078,-.17,.015,0,0x6e4524,[0,0,-.26]);
  b.chk(4,.095,.014,.082,-.16,-.006,.05,-.03,0,0x3d2512,[0,0,-.26]);
  b.box(.012,.062,.038,-.05,.068,0,0x22262b);
  b.box(.095,.012,.038,-.095,.038,0,0x22262b);
  b.box(.014,.045,.016,-.08,.075,0,0xb8c0c8,[0,0,.2]);
  b.box(.50,.135,.076,-.50,.10,0,0x6e4524,[0,0,-.12]);
  b.box(.24,.042,.082,-.46,.158,0,0x7d4f2a,[0,0,-.08]);
  b.box(.045,.165,.082,-.76,.068,0,0x181b1f,[0,0,-.12]);
  return{grip:[-.16,.04,0],fore:[.4,.08,0],gd:[-1,-.7,.4]};
 }),
 // Tier 1: Metal Blade (curved tempered steel blade + beveled cutting edge + tang & brass rivets)
 blade:bld(b=>{
  b.box(.34,.022,.11,0,.04,0,0x8a929c,[0,.12,0]);
  b.box(.36,.012,.045,.01,.04,.052,0xdce4ec,[0,.12,0]);
  b.cone(.055,.12,5,.19,.04,.01,0xdce4ec,[0,.12,-1.5708]);
  b.box(.16,.028,.065,-.18,.04,-.015,0x3a3f46,[0,.12,0]);
  for(const x of[-.22,-.15])b.cyl(.012,.012,.034,8,x,.04,-.015,0xc8a23c);
  for(const x of[-.06,.04,.12])b.cyl(.022,.022,.026,8,x,.04,-.01,0x22262b);
 }),
 // Tier 1: Rope (stacked braided hemp coils + whipping wrap + frayed end)
 rope:bld(b=>{
  for(let i=0;i<4;i++)b.tor(.11-.006*i,.032,0,.035+i*.042,0,i%2?0xc4a468:0xa8884e,[1.5708,0,0],12,8);
  b.box(.065,.17,.055,.10,.085,0,0x6e4e2e);
  b.cyl(.024,.028,.18,7,.13,.06,.06,0xb89a62,[.4,0,1.15]);
 }),
 // Tier 1: Metal Sheet (layered corrugated & flat galvanized steel plates + rivets)
 sheet:bld(b=>{
  b.box(.46,.02,.34,0,.02,0,0x7c828a,[0,-.08,0]);
  b.box(.44,.022,.32,.01,.05,0,0x9aa2ac,[0,.06,0]);
  for(let i=-3;i<=3;i++)b.cyl(.018,.018,.42,8,.01,.065,i*.042,0xb4bcc6,[0,.06,1.5708]);
  for(const x of[-.18,.18])for(const z of[-.12,.12])b.cyl(.014,.014,.035,6,x,.06,z,0x454a52);
 }),
 // Tier 2: Empty Propane Tank (weathered steel pressure cylinder + dome ends + valve guard collar + brass valve)
 propane:bld(b=>{
  b.cyl(.13,.13,.10,12,0,.05,0,0x555b62);
  b.cyl(.155,.155,.32,14,0,.22,0,0xd8d4c8);
  b.sph(.154,0,.36,0,0xd8d4c8,.55,12);
  b.sph(.152,0,.08,0,0xb8b4a8,.45,12);
  b.cyl(.158,.158,.035,14,0,.22,0,0x9a3628);
  b.cyl(.085,.085,.09,10,0,.44,0,0xc4c0b4);
  b.cyl(.024,.024,.08,8,0,.46,0,0xc8a23c);
  b.tor(.038,.009,0,.50,0,0xb83228,[1.5708,0,0],10,6);
 }),
 // Tier 2: Sewing Kit (vintage blue metal tin + colorful thread spools + red pincushion + steel needle)
 sewing_kit:bld(b=>{
  b.box(.32,.06,.24,0,.03,0,0x264864);
  b.box(.30,.02,.22,0,.065,0,0x1a3248);
  b.box(.32,.025,.22,0,.14,-.11,0x2e5678,[-1.1,0,0]);
  const spools=[[-.08,.03,0xc82828],[0,.03,0x2868c8],[.08,.03,0xe8d8b8],[-.04,-.05,0xd9a520]];
  for(const [sx,sz,sc] of spools){
   b.cyl(.032,.032,.075,10,sx,.08,sz,sc);
   b.cyl(.036,.036,.012,10,sx,.045,sz,0x8a623a);
   b.cyl(.036,.036,.012,10,sx,.115,sz,0x8a623a);
  }
  b.sph(.042,.07,.075,-.04,0xb82424,.75,8);
  b.cyl(.004,.004,.16,6,.02,.12,.02,0xdce4ec,[.2,.4,1.1]);
 }),
 // Tier 2: Tarp (folded & rolled waterproof blue polyethylene sheet + hem straps + brass grommets)
 tarp:bld(b=>{
  b.box(.42,.035,.32,0,.025,0,0x1d5280,[0,.08,0]);
  b.box(.38,.035,.28,-.01,.06,.01,0x2668a2,[0,-.06,0]);
  b.cyl(.058,.058,.38,12,0,.11,-.05,0x2e78b8,[0,0,1.5708]);
  for(const x of[-.17,.17])for(const z of[-.12,.12])b.tor(.016,.005,x,.048,z,0xd4af37,[1.5708,0,0],8,6);
  for(const x of[-.11,.11])b.cyl(.062,.062,.025,10,x,.11,-.05,0x1b242c,[0,0,1.5708]);
 }),
 // Tier 3: Electric Fuse (ceramic & amber-glass cartridge + hexagonal brass end-caps + internal filament)
 fuse:bld(b=>{
  b.cyl(.068,.068,.36,12,0,.10,0,0x4888a8,[0,0,1.5708]);
  b.cyl(.032,.032,.34,8,0,.10,0,0xffb838,[0,0,1.5708]);
  for(const s of[-1,1]){
   b.cyl(.078,.078,.085,8,s*.16,.10,0,0xd4a638,[0,0,1.5708]);
   b.cyl(.082,.082,.022,8,s*.12,.10,0,0x9a7420,[0,0,1.5708]);
   b.box(.065,.022,.048,s*.22,.10,0,0xc89e32);
  }
  b.box(.12,.015,.08,0,.168,0,0xe8e4d8);
 }),
 // Tier 3: Gears (interlocking machined steel cogwheels with teeth & bronze hub bushing)
 gears:bld(b=>{
  b.cyl(.13,.13,.045,12,-.04,.045,-.02,0x5a6068);
  b.cyl(.09,.09,.052,10,-.04,.045,-.02,0x3a3f46);
  b.cyl(.048,.048,.06,10,-.04,.045,-.02,0xc89e38);
  for(let i=0;i<8;i++){const a=i*.7854;b.box(.042,.042,.048,-.04+Math.cos(a)*.14,.045,-.02+Math.sin(a)*.14,0x6e757e,[0,-a,0])}
  b.cyl(.085,.085,.04,10,.11,.075,.06,0x7a828c);
  b.cyl(.038,.038,.05,8,.11,.075,.06,0x22262b);
  for(let i=0;i<6;i++){const a=i*1.047;b.box(.032,.038,.035,.11+Math.cos(a)*.092,.075,.06+Math.sin(a)*.092,0x8a929c,[0,-a,0])}
 }),
 // Tier 3: Metal Pipe (crossed threaded steel pipes + hex union couplings + elbow fitting)
 pipe:bld(b=>{
  b.cyl(.038,.038,.48,12,0,.05,0,0x6c727a,[0,0,1.5708]);
  for(const x of[-.20,.20])b.cyl(.048,.048,.055,8,x,.05,0,0x484d54,[0,0,1.5708]);
  b.cyl(.044,.044,.06,8,0,.05,0,0x8a929c,[0,0,1.5708]);
  b.cyl(.032,.032,.36,10,.02,.10,.05,0x555b64,[0,.45,1.5708]);
  b.cyl(.042,.042,.045,8,.15,.10,.11,0xc8a23c,[0,.45,1.5708]);
 }),
 // Tier 3: Metal Spring (helical coiled steel recoil spring + flat ground end rings)
 spring:bld(b=>{
  b.cyl(.075,.075,.022,12,0,.02,0,0x555b64);
  for(let i=0;i<7;i++)b.tor(.068,.016,0,.045+i*.036,0,i%2?0x9aa2ac:0x78808a,[1.42,0,i*.4],12,7);
  b.cyl(.075,.075,.022,12,0,.29,0,0x555b64);
  b.cyl(.028,.028,.28,8,0,.155,0,0x2a2e34);
 }),
 // Tier 3: Road Sign (reflective amber diamond & red octagonal aluminum plates + post stub)
 road_sign:bld(b=>{
  b.cyl(.022,.022,.46,8,0,.02,0,0x6e747c,[1.5708,0,0]);
  b.box(.28,.022,.28,-.03,.05,0,0xd9a026,[0,.7854,0]);
  b.box(.24,.025,.24,-.03,.052,0,0x1c1f24,[0,.7854,0]);
  b.box(.21,.028,.21,-.03,.054,0,0xe6b232,[0,.7854,0]);
  b.box(.12,.032,.04,-.03,.058,0,0x1c1f24);
  b.cyl(.13,.13,.022,8,.09,.08,.04,0xb82e24);
  b. box(.16,.026,.045,.09,.092,.04,0xf2efe8);
 }),
 // Tier 3: Semi-Automatic Body (milled steel receiver + top rail + trigger group + charging handle)
 semi_body:bld(b=>{
  b.box(.42,.095,.072,0,.11,0,0x3a3f47);
  b.box(.38,.024,.058,0,.165,0,0x282c32);
  for(let i=-4;i<=4;i++)b.box(.022,.015,.062,i*.038,.18,0,0x1c1f24);
  b.box(.085,.18,.068,-.11,.01,0,0x262a30,[0,0,.22]);
  b.box(.13,.045,.055,.04,.045,0,0x555b64);
  b.cyl(.016,.016,.065,8,.08,.13,.055,0x9aa2ac,[1.5708,0,0]);
 }),
 cloth:bld(b=>{
  b.box(.32,.04,.24,0,.025,0,0xd8d2c4,[0,.08,0]);
  b.box(.29,.04,.21,.01,.065,0,0xc9c2b0,[0,-.1,0]);
  b.cyl(.052,.052,.28,10,-.01,.11,0,0xe2dcd0,[0,0,1.5708]);
  b.cyl(.055,.055,.03,10,-.01,.11,0,0x8a623a,[0,0,1.5708]);
 }),
 fiber:bld(b=>{
  for(let i=0;i<6;i++){const a=(i-2.5)*.14;b.cyl(.018,.024,.38,6,0,.04+i*.012,(i-2.5)*.022,i%2?0x588a38:0x78a448,[0,a,1.5708])}
  b.cyl(.055,.055,.045,8,0,.055,0,0xb89a62,[0,0,1.5708]);
 }),
 circuit:bld(b=>{
  b.box(.30,.024,.22,0,.02,0,0x1d6b3a);
  b.box(.09,.028,.09,-.05,.04,.02,0x181b1f);
  for(let i=-2;i<=2;i++)b.box(.012,.015,.12,-.05+i*.018,.032,.02,0xc8a23c);
  b.cyl(.024,.024,.06,8,.08,.05,-.04,0x285888);
  b.cyl(.018,.018,.05,8,.08,.045,.04,0x22262b);
  b.box(.26,.018,.025,0,.022,-.095,0xd4af37);
 }),
 smg_body:()=>{const b=new MB();b.box(.5,.13,.08,0,.1,0,0x2e3136);b.box(.07,.26,.08,-.05,-.06,0,0x1c1e21,[0,0,.15]);b.box(.1,.2,.075,-.18,-.02,0,0x2a2d31,[0,0,-.2]);b.box(.04,.04,.1,.2,.18,0,0x777777);return b.build()},
 tech:()=>{const b=new MB();b.box(.32,.03,.24,0,0,0,0x1f6a3a);b.box(.08,.03,.08,-.06,.03,.02,0x111315);b.box(.05,.02,.1,.08,.025,-.03,0x333333);b.box(.03,.04,.03,.1,.04,.06,0xc9a437);return b.build()}});
const HOLD={rock:1.1,rope:.4,cloth:.4,pipe:.45,spring:.45,sheet:.4,semi_body:.4,smg_body:.4,tech:.4,beancan:.42,satchel:.36,c4:.38,launcher:.4,rocket:.34,knife:.62,machete:.5,spear:.4,club:.5,sulfur:.55,charcoal:.55,powder:.5,berry:.26,wood:.36,stone:.36,fiber:.4};
const ATT_SLOTS = ['sight', 'barrel', 'under'];
const ATT_SLOT_NAMES = {
  sight: 'Optic / Sight',
  barrel: 'Muzzle / Barrel',
  under: 'Underbarrel / Magazine'
};

const ATT_DEFS = {
  holo: {
    n: 'Holo Sight',
    i: '⌖',
    slot: 'sight',
    spreadK: 0.72,
    recoilK: 0.92,
    zoom: 1.35,
    need: { metal: 12, circuit: 1 },
    d: 'Illuminated holographic reticle. Cuts spread by 28% and adds 1.35× ADS zoom.'
  },
  scope8x: {
    n: '8x Zoom Scope',
    i: '🔭',
    slot: 'sight',
    spreadK: 0.52,
    recoilK: 0.9,
    zoom: 2.35,
    need: { metal: 20, pipe: 1, gears: 1 },
    d: 'Long-range marksman optic. Cuts spread by 48% and adds 2.35× ADS zoom.'
  },
  silencer: {
    n: 'Silencer',
    i: '🔇',
    slot: 'barrel',
    dmgK: 0.88,
    spreadK: 0.88,
    recoilK: 0.78,
    silent: true,
    need: { metal: 18, pipe: 1 },
    d: 'Suppresses muzzle flash and gunshot noise. -22% recoil, -12% spread, -12% damage.'
  },
  muzzle_brake: {
    n: 'Muzzle Brake',
    i: '╟',
    slot: 'barrel',
    dmgK: 0.94,
    spreadK: 0.82,
    recoilK: 0.62,
    need: { metal: 14, pipe: 1 },
    d: 'Vented compensator that redirects propellant gas. -38% recoil and -18% spread.'
  },
  muzzle_boost: {
    n: 'Muzzle Boost',
    i: '⚡',
    slot: 'barrel',
    dmgK: 0.92,
    rateK: 0.82,
    spreadK: 1.08,
    need: { metal: 14, spring: 1 },
    d: 'Cycles the action faster for +18% fire rate at the cost of slightly wider spread.'
  },
  laser: {
    n: 'Weapon Lasersight',
    i: '🔴',
    slot: 'under',
    spreadK: 0.68,
    recoilK: 0.88,
    laser: true,
    need: { metal: 10, circuit: 1 },
    d: 'Projects a visible red targeting beam. Cuts hipfire and ADS spread by 32%.'
  },
  flashlight: {
    n: 'Weapon Flashlight',
    i: '🔦',
    slot: 'under',
    spreadK: 0.92,
    light: true,
    need: { metal: 8, circuit: 1 },
    d: 'High-lumen underbarrel beam for night raids. Press F to toggle light on/off.'
  },
  ext_mag: {
    n: 'Extended Magazine',
    i: '匣',
    slot: 'under',
    magK: 1.5,
    reloadK: 1.12,
    need: { metal: 14, spring: 1 },
    d: 'Increases magazine capacity by +50% (+12% reload time).'
  }
};

for (const id in ATT_DEFS) {
  const a = ATT_DEFS[id];
  ITEMS[id] = {
    n: a.n,
    i: a.i,
    max: 1,
    att: a,
    use: 'Attach',
    d: a.d + ' Press V or click Attachments to mount on your weapon.',
    fx: () => {
      const g = gunOf();
      if (!g) {
        openAttUI();
        say('Select a weapon in your hotbar first to mount ' + a.n + '.');
        return false;
      }
      return mountAttachment(g, id, true);
    }
  };
  REC.push({ out: id, q: 1, need: a.need });
  COMP.push(id);
  RY[id] = { metal: 8, ...(a.need.circuit ? { circuit: 1 } : {}), ...(a.need.spring ? { spring: 1 } : {}) };
}

function buildAtt(id,sc){
 const b=new MB(),g=new T.Group(),s=sc||1;
 if(id==='holo'){
  b.box(.16*s,.028*s,.082*s,0,.014*s,0,0x1c1f24);
  b.box(.045*s,.022*s,.096*s,-.02*s,.014*s,0,0x454b54);
  b.box(.055*s,.032*s,.076*s,.045*s,.032*s,0,0x282d34);
  for(const z of[-.038*s,.038*s]){
   b.box(.125*s,.088*s,.014*s,-.005*s,.068*s,z,0x2a2f37);
   b.box(.095*s,.062*s,.018*s,-.005*s,.068*s,z*1.08,0x1e2227);
  }
  b.box(.125*s,.016*s,.088*s,-.005*s,.114*s,0,0x2a2f37);
  b.vent(3,.018*s,.018*s,.09*s,-.035*s,.028*s,.114*s,0,0x121417);
  g.add(b.build());
  const glass=new T.Mesh(new T.BoxGeometry(.006*s,.068*s,.064*s),new T.MeshBasicMaterial({color:0x38d0ff,transparent:true,opacity:.22,depthWrite:false}));
  glass.position.set(-.005*s,.068*s,0);g.add(glass);
  const rm=new T.MeshBasicMaterial({color:0xff2a2a});
  const dot=new T.Mesh(new T.SphereGeometry(.0065*s,6,6),rm);
  dot.position.set(-.008*s,.068*s,0);g.add(dot);
  const ring=new T.Mesh(new T.TorusGeometry(.02*s,.0022*s,6,14),rm);
  ring.rotation.y=1.5708;ring.position.set(-.008*s,.068*s,0);g.add(ring);
  }else if(id==='scope8x'){
   for(const x of[-.08*s,.08*s]){
    b.box(.034*s,.032*s,.046*s,x,.016*s,0,0x22262b);
    b.tor(.038*s,.008*s,x,.068*s,0,0x22262b,[0,1.5708,0],14,8);
    b.cyl(.009*s,.009*s,.058*s,6,x,.016*s,0,0xc8a23c,[1.5708,0,0]);
   }
   for(let i=0;i<9;i++)b.tor(.035*s,.0055*s,(-.18+i*.045)*s,.068*s,0,0x181b1f,[0,1.5708,0],14,6);
   for(const a2 of[.785,2.356,-2.356,-.785])b.box(.38*s,.006*s,.006*s,0,(.068+Math.sin(a2)*.033)*s,Math.cos(a2)*.033*s,0x22262b);
   b.tor(.046*s,.007*s,.21*s,.068*s,0,0x22262b,[0,1.5708,0],14,8);
   b.tor(.044*s,.007*s,-.21*s,.068*s,0,0x3a4048,[0,1.5708,0],14,8);
   b.cyl(.016*s,.016*s,.028*s,10,0,.108*s,0,0x2e333a);
   b.cyl(.014*s,.014*s,.008*s,8,0,.124*s,0,0xd4af37);
   b.cyl(.016*s,.016*s,.028*s,10,0,.068*s,.042*s,0x2e333a,[1.5708,0,0]);
   g.add(b.build());
   const lens=new T.Mesh(new T.CylinderGeometry(.038*s,.038*s,.004*s,12),new T.MeshBasicMaterial({color:0x38d0ff,transparent:true,opacity:.14,depthWrite:false}));
   lens.rotation.z=1.5708;lens.position.set(.06*s,.068*s,0);g.add(lens);
   const rm=new T.MeshBasicMaterial({color:0x111316}),rd=new T.MeshBasicMaterial({color:0xff2828});
   const chV=new T.Mesh(new T.BoxGeometry(.002*s,.068*s,.0018*s),rm);chV.position.set(.05*s,.068*s,0);g.add(chV);
   const chH=new T.Mesh(new T.BoxGeometry(.002*s,.0018*s,.068*s),rm);chH.position.set(.05*s,.068*s,0);g.add(chH);
   const dot=new T.Mesh(new T.SphereGeometry(.0042*s,6,6),rd);dot.position.set(.05*s,.068*s,0);g.add(dot);
 }else if(id==='silencer'){
  b.cyl(.038*s,.038*s,.048*s,12,-.15*s,0,0,0x3a4048,[0,0,1.5708]);
  b.cyl(.045*s,.045*s,.32*s,14,.03*s,0,0,0x181b1f,[0,0,1.5708]);
  for(let i=-2;i<=2;i++)b.cyl(.048*s,.048*s,.018*s,14,(.03+i*.06)*s,0,0,0x282d35,[0,0,1.5708]);
  b.cyl(.042*s,.042*s,.015*s,12,.192*s,0,0,0x2e333a,[0,0,1.5708]);
  b.cyl(.018*s,.018*s,.02*s,10,.196*s,0,0,0x08090a,[0,0,1.5708]);
  g.add(b.build());
 }else if(id==='muzzle_brake'){
  b.cyl(.03*s,.03*s,.035*s,10,-.065*s,0,0,0x282d34,[0,0,1.5708]);
  b.box(.145*s,.062*s,.084*s,.02*s,0,0,0x3e444e);
  b.box(.135*s,.07*s,.062*s,.02*s,0,0,0x343942);
  for(const x of[-.02*s,.025*s,.068*s]){
   b.box(.022*s,.068*s,.09*s,x,0,0,0x0c0e10);
   b.box(.022*s,.076*s,.032*s,x,0,0,0x0c0e10);
  }
  b.cyl(.018*s,.018*s,.02*s,10,.088*s,0,0,0x08090a,[0,0,1.5708]);
  g.add(b.build());
 }else if(id==='muzzle_boost'){
  b.cyl(.034*s,.034*s,.035*s,10,-.065*s,0,0,0xd4af37,[0,0,1.5708]);
  b.cyl(.048*s,.048*s,.11*s,12,0,0,0,0x2e333a,[0,0,1.5708]);
  for(let i=0;i<3;i++)b.tor(.049*s,.004*s,(-.03+i*.03)*s,0,0,0x1c1f24,[0,1.5708,0],12,6);
  b.cyl(.032*s,.048*s,.065*s,12,.085*s,0,0,0x3e444e,[0,0,1.5708]);
  b.cyl(.026*s,.026*s,.02*s,10,.112*s,0,0,0x08090a,[0,0,1.5708]);
  g.add(b.build());
 }else if(id==='laser'){
  b.box(.145*s,.052*s,.068*s,0,0,0,0x22262b);
  b.box(.11*s,.022*s,.046*s,-.01*s,.032*s,0,0x181b1f);
  b.cyl(.012*s,.012*s,.016*s,8,.03*s,.03*s,0,0xc8a23c);
  b.cyl(.016*s,.016*s,.035*s,10,.078*s,.006*s,.014*s,0x343942,[0,0,1.5708]);
  b.cyl(.011*s,.011*s,.042*s,8,.082*s,.006*s,.014*s,0xff2222,[0,0,1.5708]);
  b.cyl(.012*s,.012*s,.03*s,8,.075*s,-.006*s,-.016*s,0x1d5e6e,[0,0,1.5708]);
  g.add(b.build());
 }else if(id==='flashlight'){
  b.box(.08*s,.026*s,.044*s,-.02*s,.034*s,0,0x1c1f24);
  b.cyl(.028*s,.028*s,.16*s,12,-.01*s,0,0,0x282d34,[0,0,1.5708]);
  for(let i=0;i<3;i++)b.tor(.03*s,.004*s,(.02+i*.018)*s,0,0,0x181b1f,[0,1.5708,0],10,6);
  b.cyl(.044*s,.029*s,.065*s,12,.095*s,0,0,0x3e444e,[0,0,1.5708]);
  b.cyl(.038*s,.038*s,.012*s,12,.126*s,0,0,0xfff4b8,[0,0,1.5708]);
  g.add(b.build());
 }else if(id==='ext_mag'){
  b.box(.086*s,.34*s,.096*s,0,.16*s,0,0x1c1f24,[0,0,.14]);
  for(let i=0;i<5;i++)b.box(.092*s,.014*s,.102*s,(-.01+i*.005)*s,(.06+i*.05)*s,0,0x2e333a,[0,0,.14]);
  b.box(.102*s,.042*s,.112*s,-.022*s,.008*s,0,0xd4af37,[0,0,.14]);
  b.cyl(.016*s,.016*s,.085*s,8,.022*s,.33*s,0,0xd4af37,[0,0,1.5708]);
  g.add(b.build());
 }
 return g;
}
Object.assign(ITM,{
 holo:()=>buildAtt('holo',1.25),
 scope8x:()=>buildAtt('scope8x',1.2),
 silencer:()=>buildAtt('silencer',1.2),
 muzzle_brake:()=>buildAtt('muzzle_brake',1.25),
 muzzle_boost:()=>buildAtt('muzzle_boost',1.25),
 laser:()=>buildAtt('laser',1.25),
 flashlight:()=>buildAtt('flashlight',1.25),
 ext_mag:()=>buildAtt('ext_mag',1.0)
});

// ============================================================================
// STEP 2: WEAPON STAT HELPERS & MOUNT / DETACH LOGIC
// ============================================================================


function gunMods(s) {
  if (!s || !ITEMS[s.id] || !ITEMS[s.id].gun) return null;
  if (!s.mods || typeof s.mods !== 'object' || Array.isArray(s.mods)) {
    const a = (s.att && typeof s.att === 'object') ? s.att : {};
    s.mods = { sight: a.sight || null, barrel: a.barrel || null, under: a.under || null };
  }
  return s.mods;
}

function gunStats(s) {
  const base = s && ITEMS[s.id] && ITEMS[s.id].gun;
  if (!base) return null;
  const mods = gunMods(s) || {};
  let dmgK = 1, rateK = 1, spreadK = 1, recoilK = 1, magK = 1, reloadK = 1, zoom = 1.12;
  let silent = false, laser = false, light = false;

  for (const sl of ATT_SLOTS) {
    const id = mods[sl];
    const a = id && ATT_DEFS[id];
    if (!a) continue;
    if (a.dmgK) dmgK *= a.dmgK;
    if (a.rateK) rateK *= a.rateK;
    if (a.spreadK) spreadK *= a.spreadK;
    if (a.recoilK) recoilK *= a.recoilK;
    if (a.magK) magK *= a.magK;
    if (a.reloadK) reloadK *= a.reloadK;
    if (a.zoom) zoom = Math.max(zoom, a.zoom);
    if (a.silent) silent = true;
    if (a.laser) laser = true;
    if (a.light) light = true;
  }

  // ADS tightens spread by an additional 35%
  const adsSpread = adsLerp > 0.1 ? 1 - adsLerp * 0.35 : 1;

  return {
    dmg: base.dmg * dmgK,
    rate: base.rate * rateK,
    spread: base.spread * spreadK * adsSpread,
    pellets: base.pellets,
    range: base.range * (zoom > 1.5 ? 1.2 : 1),
    reload: base.reload * reloadK,
    mag: Math.max(1, Math.round(base.mag * magK)),
    recoilK: recoilK * (1 - adsLerp * 0.22),
    zoom,
    silent,
    laser,
    light
  };
}

function gunMagMax(s) {
  const st = gunStats(s);
  return st ? st.mag : (s && ITEMS[s.id] && ITEMS[s.id].gun ? ITEMS[s.id].gun.mag : 0);
}

// Mount an attachment from inventory onto gun slot `gSlot`
function mountAttachment(gSlot, attId, fromUseSlot) {
  if (!gSlot || !ITEMS[gSlot.id] || !ITEMS[gSlot.id].gun) return false;
  const def = ATT_DEFS[attId];
  if (!def) return false;
  const mods = gunMods(gSlot);
  const prev = mods[def.slot];
  if (prev === attId) {
    say(def.n + ' is already mounted on ' + ITEMS[gSlot.id].n + '.');
    return false;
  }
  if (!fromUseSlot) {
    if (cnt(attId) <= 0) {
      say('No ' + def.n + ' in your inventory.');
      return false;
    }
    take(attId, 1);
  }
  if (prev) {
    if (!give(prev, 1, 1)) {
      if (!fromUseSlot) give(attId, 1, 1);
      say('Inventory full — cannot swap attachment.');
      return false;
    }
  }
  mods[def.slot] = attId;
  const maxM = gunMagMax(gSlot);
  if ((gSlot.mag || 0) > maxM) {
    const extra = gSlot.mag - maxM, ld = gSlot.at || 'ammo';
    if (!give(ld, extra, 1)) tossItemFromPlayer(ld, extra);
    gSlot.mag = maxM;
  }
  vmId = null; // Force 3D viewmodel rebuild so attachment mesh appears immediately
  syncVM();
  blip(560, 0.06, 'triangle');
  say('Mounted ' + def.n + ' on ' + ITEMS[gSlot.id].n + '.');
  render();
  renderAttUI();
  persist();
  return true;
}

// Detach an attachment from gun slot `gSlot` back into inventory
function detachAttachment(gSlot, slotKey) {
  if (!gSlot || !ITEMS[gSlot.id] || !ITEMS[gSlot.id].gun) return false;
  const mods = gunMods(gSlot);
  const attId = mods[slotKey];
  if (!attId) return false;
  if (!give(attId, 1)) return false;
  mods[slotKey] = null;
  const maxM = gunMagMax(gSlot);
  if ((gSlot.mag || 0) > maxM) {
    const extra = gSlot.mag - maxM;
    const ld = gSlot.at || 'ammo';
    if (!give(ld, extra, 1)) tossItemFromPlayer(ld, extra);
    gSlot.mag = maxM;
  }
  vmId = null;
  syncVM();
  blip(340, 0.06, 'sine');
  say('Detached ' + ITEMS[attId].n + '.');
  render();
  renderAttUI();
  persist();
  return true;
}

// ============================================================================
// STEP 3: 3D VIEWMODEL ATTACHMENT MESHES + TACTICAL LIGHT & LASER BEAM
// ============================================================================

const tacSpot = new T.SpotLight(0xfff6e0, 0, 48, 0.52, 0.45, 1.2);
tacSpot.position.set(0.18, -0.12, -0.4);
tacSpot.target.position.set(0, -0.05, -20);
cam.add(tacSpot);
cam.add(tacSpot.target);

const laserGeo = new T.BufferGeometry().setFromPoints([
  new T.Vector3(0, 0, 0),
  new T.Vector3(0, 0, -1)
]);
const laserLine = new T.Line(
  laserGeo,
  new T.LineBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.78 })
);
laserLine.visible = false;
laserLine.frustumCulled = false;
scene.add(laserLine);

const laserDot = new T.Mesh(
  new T.SphereGeometry(0.038, 6, 6),
  new T.MeshBasicMaterial({ color: 0xff3333, depthTest: false })
);
laserDot.visible = false;
scene.add(laserDot);

// Call `attachVM(vmM, s)` inside `syncVM()` right after `vmP.add(vmM);`
const IRON_SIGHT_Y={pistol:.240,revolver:.258,shotgun:.214,pump:.272,smg:.272,thompson:.254,sar:.282,ak:.294,rifle:.285};
const RAIL_MOUNT={pistol:[.06,.218],revolver:[.12,.248],shotgun:[.08,.205],pump:[-.02,.254],smg:[-.02,.236],thompson:[-.05,.226],sar:[-.04,.252],ak:[-.02,.248],rifle:[-.01,.220]};
function attachVM(vmM, s) {
  if (!vmM || !s || !ITEMS[s.id] || !ITEMS[s.id].gun) return;
  const mods = gunMods(s);
  const AN = ANIM[s.id] || ANIM.pistol;
  const mx = AN.mz[0], my = AN.mz[1];
  const rm = RAIL_MOUNT[s.id] || [.04, my + .052];
  const rX = rm[0], rY = rm[1];

  // 1. Sight mesh on top rail + exact sightY calculation for ADS alignment
  if (mods.sight === 'holo' || mods.sight === 'scope8x') {
    if (vmM.userData.defSight) vmM.userData.defSight.visible = false;
    const attSc = s.id === 'pistol' || s.id === 'revolver' ? 0.82 : 1.0;
    const sg = buildAtt(mods.sight, attSc);
    sg.position.set(rX, rY, 0);
    vmM.add(sg);
    vmM.userData.sightY = rY + 0.068 * attSc;
  } else {
    if (vmM.userData.defSight) vmM.userData.defSight.visible = true;
    vmM.userData.sightY = IRON_SIGHT_Y[s.id] || 0.25;
  }

  // 2. Barrel mesh at muzzle
  if (mods.barrel === 'silencer' || mods.barrel === 'muzzle_brake' || mods.barrel === 'muzzle_boost') {
    const bg = buildAtt(mods.barrel, s.id === 'pistol' ? 0.85 : 1.0);
    const offX = mods.barrel === 'silencer' ? 0.14 : 0.05;
    bg.position.set(mx + offX, my, 0);
    vmM.add(bg);
  }

  // 3. Underbarrel mesh
  if (mods.under === 'laser' || mods.under === 'flashlight') {
    const ug = buildAtt(mods.under, 0.92);
    ug.position.set(mx * 0.56, my - 0.066, 0);
    vmM.add(ug);
  } else if (mods.under === 'ext_mag' && vmM.userData.mag) {
    vmM.userData.mag.scale.y = 1.35;
  }
}

// Call `tickAttachmentFX(dt)` inside `combatTick(dt, mv)`
function tickAttachmentFX(dt) {
  const s = gunOf();
  const st = s && !dead && !open && !chOpen ? gunStats(s) : null;

  // Smooth ADS interpolation
  const wantAds = !!(adsHeld && st && reloadT <= 0);
  adsLerp += ((wantAds ? 1 : 0) - adsLerp) * Math.min(1, dt * 14);

  // Tactical Flashlight
  tacSpot.intensity = st && st.light && tacLightOn ? 3.8 : 0;

  // Underbarrel Laser Sight
  if (st && st.laser && tacLightOn) {
    const cp = Math.cos(pitch),
      dx = -Math.sin(yaw) * cp,
      dy = Math.sin(pitch),
      dz = -Math.cos(yaw) * cp;
    const rx = Math.cos(yaw),
      rz = -Math.sin(yaw);
    const ox = P.x + dx * 0.5 + rx * (0.18 * (1 - adsLerp * 0.85)),
      oy = P.y + dy * 0.5 - 0.14 * (1 - adsLerp * 0.5),
      oz = P.z + dz * 0.5 + rz * (0.18 * (1 - adsLerp * 0.85));
    const dist = blockDist(P.x, P.y, P.z, dx, dy, dz, 45);
    const ex = P.x + dx * dist,
      ey = P.y + dy * dist,
      ez = P.z + dz * dist;
    const arr = laserLine.geometry.attributes.position.array;
    arr[0] = ox; arr[1] = oy; arr[2] = oz;
    arr[3] = ex; arr[4] = ey; arr[5] = ez;
    laserLine.geometry.attributes.position.needsUpdate = true;
    laserLine.visible = true;
    laserDot.position.set(ex, ey, ez);
    laserDot.visible = true;
  } else {
    laserLine.visible = false;
    laserDot.visible = false;
  }
}

const attStyle = document.createElement('style');
attStyle.textContent = `
  #blackpine #attb { top: calc(var(--sa) + 50px); right: 150px; z-index: 6; width: auto; padding: 6px 8px; min-height: 34px; font-size: 12px; }
  #blackpine #attui {
    position: absolute; inset: 0; display: none; align-items: center; justify-content: center;
    background: rgba(8, 10, 12, 0.72); z-index: 24; pointer-events: auto; backdrop-filter: blur(4px);
  }
  #blackpine #attbox {
    width: min(560px, 94vw); max-height: 88vh; overflow-y: auto;
    background: #171a1d; border: 1px solid rgba(255,255,255,0.14); border-radius: 10px;
    padding: 14px 16px; color: #ece8de; font-family: system-ui, sans-serif; box-shadow: 0 18px 48px rgba(0,0,0,0.65);
  }
  #blackpine .atth { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 12px; }
  #blackpine .atth b { font-size: 16px; letter-spacing: 0.4px; color: #f3e6b8; }
  #blackpine .atth span { font-size: 12px; opacity: 0.7; }
  #blackpine .att-weap { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.04); padding: 10px 12px; border-radius: 8px; margin-bottom: 12px; }
  #blackpine .att-weap .ic { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.35); border-radius: 6px; font-size: 26px; }
  #blackpine .att-weap .ic img { width: 48px; height: 48px; object-fit: contain; }
  #blackpine .att-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; margin-bottom: 14px; background: rgba(0,0,0,0.28); padding: 10px 12px; border-radius: 8px; font-size: 12px; }
  #blackpine .att-srow { display: flex; justify-content: space-between; align-items: center; }
  #blackpine .att-srow b { color: #e6c340; }
  #blackpine .att-slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; }
  #blackpine .att-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 9px; display: flex; flex-direction: column; gap: 6px; }
  #blackpine .att-card small { font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; color: #9aa4ad; }
  #blackpine .att-card b { font-size: 13px; color: #fff; }
  #blackpine .att-card p { font-size: 11px; opacity: 0.75; margin: 0; line-height: 1.3; }
  #blackpine .att-bag { display: flex; flex-direction: column; gap: 6px; }
  #blackpine .att-row { display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 6px; padding: 7px 10px; font-size: 12px; }
  #blackpine .att-btn { background: #2d353b; color: #f0ece1; border: 1px solid rgba(255,255,255,0.16); border-radius: 5px; padding: 5px 10px; font-size: 12px; cursor: pointer; }
  #blackpine .att-btn:hover:not(:disabled) { background: #3d4850; }
  #blackpine .att-btn.on { background: #5a7a3a; border-color: #8cbc5c; }
  #blackpine .att-btn.warn { background: #6b3028; }
`;
root.appendChild(attStyle);

const attBtn = document.createElement('button');
attBtn.id = 'attb';
attBtn.type = 'button';
attBtn.className = 'ui ib';
attBtn.textContent = 'Mods [V]';
root.appendChild(attBtn);

const attW = document.createElement('div');
attW.id = 'attui';

attW.innerHTML = '<div id="attbox"></div>';
root.appendChild(attW);

attW.addEventListener('pointerdown', e => e.stopPropagation());
attBtn.addEventListener('pointerdown', e => {
  e.preventDefault();
  e.stopPropagation();
  toggleAttUI();
});

function openAttUI() {
  if (dead) return;
  if (open) togglePanel();
  if (chOpen) toggleCheat();
  if (mapOpen) toggleMap();
  attOpen = true;
  clearInput();
  attW.style.display = 'flex';
  renderAttUI();
  lookLock(false);
}

function closeAttUI() {
  attOpen = false;
  attW.style.display = 'none';
  lookLock(!open && !chOpen && !mapOpen);
}

function toggleAttUI() {
  if (attOpen) closeAttUI();
  else openAttUI();
}

function renderAttUI() {
  if (!attOpen) return;
  const box = $('attbox');
  if (!box) return;

  // Find currently selected gun, or fallback to first gun in belt/bag
  let gSlot = attTarget && SL.indexOf(attTarget) >= 0 && SL.indexOf(attTarget) < 30 && ITEMS[attTarget.id] && ITEMS[attTarget.id].gun ? attTarget : gunOf();
  if (!gSlot) {
    for (let i = 0; i < 30; i++) {
      if (SL[i] && ITEMS[SL[i].id] && ITEMS[SL[i].id].gun) {
        gSlot = SL[i];
        break;
      }
    }
  }

  let html = `
    <div class="atth">
      <div><b>Weapon Attachments</b><br><span>V to toggle · Right-Click / Z to ADS · F to toggle Light/Laser</span></div>
      <button type="button" class="att-btn" id="att-close">Close</button>
    </div>
  `;

  if (!gSlot) {
    html += `<p style="opacity:.8;font-size:13px;margin:12px 0;">No firearm in your belt or inventory. Craft or loot a Pistol, Revolver, SMG, Shotgun, SAR, or Assault Rifle to mount attachments.</p>`;
    box.innerHTML = html;
    box.querySelector('#att-close').onpointerdown = () => closeAttUI();
    return;
  }

  const it = ITEMS[gSlot.id];
  const base = it.gun;
  const st = gunStats(gSlot);
  const mods = gunMods(gSlot);

  // Gun selector pills if player carries multiple firearms
  const allGuns = [];
  for (let i = 0; i < 30; i++) {
    if (SL[i] && ITEMS[SL[i].id] && ITEMS[SL[i].id].gun) allGuns.push({ idx: i, s: SL[i] });
  }

  html += `
    <div class="att-weap">
      <div class="ic">${ico(gSlot.id)}</div>
      <div style="flex:1">
        <b style="font-size:15px">${it.n}</b>
        <div style="font-size:12px;opacity:.75">Mag ${gSlot.mag || 0} / ${st.mag} · Durability ${gSlot.dur || 0} / ${it.dur}</div>
      </div>
      <button type="button" class="att-btn ${tacLightOn ? 'on' : ''}" id="att-tac">Light/Laser: ${tacLightOn ? 'ON' : 'OFF'}</button>
    </div>
  `;

  if (allGuns.length > 1) {
    html += `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">`;
    allGuns.forEach(g => {
      html += `<button type="button" class="att-btn ${g.s === gSlot ? 'on' : ''}" data-gidx="${g.idx}">${g.idx < 6 ? '[' + (g.idx + 1) + '] ' : ''}${ITEMS[g.s.id].n}</button>`;
    });
    html += `</div>`;
  }

  html += `
    <div class="att-stats">
      <div class="att-srow"><span>Damage</span><b>${st.dmg.toFixed(1)} ${st.pellets > 1 ? '×' + st.pellets : ''}</b></div>
      <div class="att-srow"><span>Fire Rate</span><b>${(60 / st.rate).toFixed(0)} RPM</b></div>
      <div class="att-srow"><span>Accuracy (Spread)</span><b>${Math.round((1 - st.spread / base.spread) * 100) >= 0 ? '+' : ''}${Math.round((1 - st.spread / base.spread) * 100)}%</b></div>
      <div class="att-srow"><span>Recoil Control</span><b>${Math.round((1 - st.recoilK) * 100) >= 0 ? '+' : ''}${Math.round((1 - st.recoilK) * 100)}%</b></div>
      <div class="att-srow"><span>Magazine Size</span><b>${st.mag} (${base.mag} base)</b></div>
      <div class="att-srow"><span>ADS Zoom</span><b>${st.zoom.toFixed(2)}× ${st.silent ? '· 🔇 Suppressed' : ''}</b></div>
    </div>
    <div class="att-slots">
  `;

  for (const slKey of ATT_SLOTS) {
    const mId = mods[slKey];
    const mDef = mId ? ATT_DEFS[mId] : null;
    html += `
      <div class="att-card">
        <small>${ATT_SLOT_NAMES[slKey]}</small>
        <b>${mDef ? mDef.i + ' ' + mDef.n : 'Empty Slot'}</b>
        <p>${mDef ? mDef.d : 'No attachment mounted in this slot.'}</p>
        ${mDef ? `<button type="button" class="att-btn warn" data-detach="${slKey}">Detach</button>` : ''}
      </div>
    `;
  }
  html += `</div><div class="ch2" style="margin:8px 0 6px;font-size:12px;opacity:.85">Available Attachments in Inventory</div><div class="att-bag">`;

  let anyInBag = false;
  for (const id in ATT_DEFS) {
    const n = cnt(id);
    const a = ATT_DEFS[id];
    const equipped = mods[a.slot] === id;
    if (n <= 0 && !equipped) continue;
    anyInBag = true;
    html += `
      <div class="att-row">
        <div><b>${a.i} ${a.n}</b> <small style="opacity:.7">(${ATT_SLOT_NAMES[a.slot]} · Bag: ${n})</small><br><span style="opacity:.75;font-size:11px">${a.d}</span></div>
        <button type="button" class="att-btn ${equipped ? 'on' : ''}" data-mount="${id}" ${equipped || n <= 0 ? 'disabled' : ''}>${equipped ? 'Mounted' : 'Mount'}</button>
      </div>
    `;
  }
  if (!anyInBag) {
    html += `<div class="att-row"><span style="opacity:.75">No attachments in your bag. Craft them at a Workbench under Components, or loot Military/Elite crates.</span></div>`;
  }
  html += `</div>`;
  box.innerHTML = html;

  box.querySelector('#att-close').onpointerdown = () => closeAttUI();
  const tacBtn = box.querySelector('#att-tac');
  if (tacBtn) {
    tacBtn.onpointerdown = () => {
      tacLightOn = !tacLightOn;
      blip(tacLightOn ? 620 : 380, 0.04, 'triangle');
      renderAttUI();
    };
  }
  box.querySelectorAll('[data-gidx]').forEach(b => {
    b.onpointerdown = () => {
      const idx = +b.dataset.gidx;
      attTarget = SL[idx];
      if (idx < 6) sel = idx;
      render();
      renderAttUI();
    };
  });
  box.querySelectorAll('[data-detach]').forEach(b => {
    b.onpointerdown = () => detachAttachment(gSlot, b.dataset.detach);
  });
  box.querySelectorAll('[data-mount]').forEach(b => {
    b.onpointerdown = () => mountAttachment(gSlot, b.dataset.mount, false);
  });
}

/* ---- 3D item models + physical drops (G to drop) ---- */
Object.assign(ITM, {
  // Leather: Rolled & stacked cured brown leather hides with stitching & twine tie
  leather: bld(b => {
    b.box(0.34, 0.04, 0.26, 0, 0.03, 0, 0x6e4222, [0, 0.15, 0]);
    b.box(0.30, 0.035, 0.22, 0.02, 0.065, -0.01, 0x85522c, [0, -0.2, 0]);
    b.cyl(0.065, 0.065, 0.34, 12, 0, 0.14, 0.02, 0x784825, [0, 0, 1.5708]);
    b.cyl(0.042, 0.042, 0.35, 10, 0, 0.14, 0.02, 0x4a2a14, [0, 0, 1.5708]);
    for (const x of [-0.09, 0.09]) b.cyl(0.07, 0.07, 0.025, 12, x, 0.14, 0.02, 0xd2b48a, [0, 0, 1.5708]);
  }),

  // Crude Oil: Black ribbed steel drum with amber hazard stripe & bung caps
  crude: bld(b => {
    b.cyl(0.14, 0.14, 0.38, 14, 0, 0.20, 0, 0x16181c);
    b.cyl(0.144, 0.144, 0.08, 14, 0, 0.20, 0, 0xd99b26);
    for (const y of [0.03, 0.13, 0.27, 0.37]) b.cyl(0.148, 0.148, 0.022, 14, 0, y, 0, 0x2c3038);
    b.cyl(0.125, 0.125, 0.015, 12, 0, 0.39, 0, 0x0b0c0e);
    b.cyl(0.024, 0.024, 0.03, 8, 0.06, 0.40, 0, 0xc8a23c);
    b.cyl(0.016, 0.016, 0.025, 8, -0.06, 0.40, 0.03, 0x7a828c);
  }),

  // Explosives: Bundle of 3 red/gold dynamite sticks + C4 block + digital timer & det-cord
  explosives: bld(b => {
    for (const [x, y, z] of [[-0.06, 0.08, -0.05], [0.06, 0.08, -0.05], [0, 0.16, -0.05]]) {
      b.cyl(0.048, 0.048, 0.34, 10, x, y, z, 0xb82e24, [0, 0, 1.5708]);
      b.cyl(0.05, 0.05, 0.04, 10, x - 0.1, y, z, 0x181b1f, [0, 0, 1.5708]);
      b.cyl(0.05, 0.05, 0.04, 10, x + 0.1, y, z, 0x181b1f, [0, 0, 1.5708]);
    }
    b.box(0.26, 0.11, 0.12, 0, 0.08, 0.05, 0xd4a638);
    b.box(0.12, 0.06, 0.05, 0, 0.15, 0.07, 0x22262b);
    b.box(0.07, 0.03, 0.055, -0.01, 0.15, 0.075, 0xff2a2a);
    b.cyl(0.012, 0.012, 0.08, 8, 0.08, 0.15, 0.05, 0xc8a23c, [0, 0, 1.5708]);
  }),

  // Targeting Computer: Rugged military laptop with hinged screen, radar display & antenna
  targeting_computer: bld(b => {
    b.box(0.36, 0.045, 0.26, 0, 0.03, 0.03, 0x46523a);
    b.box(0.30, 0.015, 0.16, 0, 0.055, 0.05, 0x1e2227);
    for (let r = 0; r < 3; r++) b.box(0.26, 0.01, 0.025, 0, 0.06, 0.01 + r * 0.04, 0x383e46);
    b.box(0.36, 0.24, 0.035, 0, 0.15, -0.10, 0x46523a, [-0.28, 0, 0]);
    b.box(0.30, 0.18, 0.02, 0, 0.15, -0.088, 0x0d2618, [-0.28, 0, 0]);
    b.tor(0.055, 0.007, 0, 0.15, -0.078, 0x38ff6a, [-0.28, 0, 0], 12, 6);
    b.box(0.14, 0.008, 0.008, 0, 0.15, -0.076, 0x38ff6a, [-0.28, 0, 0]);
    b.cyl(0.01, 0.01, 0.18, 8, 0.16, 0.22, -0.11, 0x22262b);
  }),

  // Targeting Camera (CCTV): Articulated surveillance camera with lens, IR ring, hood & mount
  cctv: bld(b => {
    b.box(0.14, 0.14, 0.03, -0.12, 0.10, 0, 0x3a3f47);
    b.cyl(0.022, 0.022, 0.14, 8, -0.06, 0.12, 0, 0x555b64, [0, 0, 1.1]);
    b.box(0.28, 0.13, 0.14, 0.04, 0.18, 0, 0xd8dde4);
    b.box(0.31, 0.025, 0.16, 0.05, 0.25, 0, 0xbfc6d0);
    b.cyl(0.052, 0.052, 0.07, 12, 0.19, 0.175, 0, 0x1c1f24, [0, 0, 1.5708]);
    b.cyl(0.038, 0.038, 0.08, 12, 0.195, 0.175, 0, 0x1b4d5e, [0, 0, 1.5708]);
    b.sph(0.012, 0.17, 0.22, 0.045, 0xff2222, 1, 6);
  }),

  // Respawn Bed: Miniature wooden bed with headboard, mattress, rust blanket & pillow
  bed: bld(b => {
    for (const sx of [-0.22, 0.22]) for (const sz of [-0.14, 0.14]) b.box(0.035, 0.18, 0.035, sx, 0.09, sz, 0x4a321c);
    b.box(0.48, 0.045, 0.30, 0, 0.07, 0, 0x6b4828);
    b.box(0.035, 0.16, 0.30, -0.22, 0.14, 0, 0x5a3c20);
    b.box(0.43, 0.05, 0.26, 0, 0.11, 0, 0xe6dfd0);
    b.box(0.28, 0.055, 0.27, 0.06, 0.115, 0, 0xb84228);
    b.box(0.10, 0.035, 0.19, -0.14, 0.14, 0, 0xf5f2eb);
  }),

  // Low Grade Fuel: Detailed red/amber jerrycan + sight glass + spout
  fuel: bld(b => {
    b.box(0.28, 0.36, 0.18, 0, 0.19, 0, 0xb83228);
    b.box(0.3, 0.04, 0.2, 0, 0.08, 0, 0xd9a520);
    b.box(0.3, 0.04, 0.2, 0, 0.29, 0, 0x22252a);
    b.box(0.06, 0.2, 0.19, 0.07, 0.19, 0, 0xe8b838);
    b.cyl(0.038, 0.038, 0.07, 8, -0.06, 0.4, 0, 0x22252a);
    b.cyl(0.045, 0.045, 0.025, 8, -0.06, 0.44, 0, 0xd9a520);
    b.box(0.03, 0.08, 0.03, 0.06, 0.4, 0.05, 0x8a241c);
    b.box(0.03, 0.08, 0.03, 0.06, 0.4, -0.05, 0x8a241c);
    b.box(0.04, 0.03, 0.13, 0.06, 0.44, 0, 0x8a241c);
  }),

  // Bedroll: Rolled canvas sleeping bag with leather straps, blanket & stake
  bedroll: bld(b => {
    b.cyl(0.11, 0.11, 0.56, 12, 0, 0.12, 0, 0xb84a2c, [0, 0, 1.5708]);
    b.cyl(0.075, 0.075, 0.58, 10, 0, 0.12, 0, 0xe2d6be, [0, 0, 1.5708]);
    b.cyl(0.035, 0.035, 0.6, 8, 0, 0.12, 0, 0x4a3220, [0, 0, 1.5708]);
    for (const x of [-0.17, 0.17]) {
      b.cyl(0.118, 0.118, 0.04, 12, x, 0.12, 0, 0x3b2616, [0, 0, 1.5708]);
      b.box(0.05, 0.04, 0.04, x, 0.23, 0.03, 0xd9a520);
    }
    b.box(0.44, 0.03, 0.04, 0, 0.23, 0, 0x3b2616);
  }),

  // Scrap (if not already added by Scrap patch)
  scrap: ITM.scrap || bld(b => {
    b.cyl(0.11, 0.12, 0.05, 8, -0.05, 0.04, -0.03, 0x6a6e74);
    b.cyl(0.05, 0.05, 0.06, 8, -0.05, 0.04, -0.03, 0x222428);
    b.box(0.18, 0.035, 0.1, 0.06, 0.05, 0.04, 0x8a5232, [0.2, 0.5, -0.15]);
    b.box(0.14, 0.03, 0.08, -0.02, 0.08, 0.05, 0x7c8288, [-0.15, -0.4, 0.2]);
    b.cyl(0.025, 0.025, 0.14, 6, 0.04, 0.09, -0.05, 0xc9a437, [0.4, 0.2, 1.2]);
  })
});

// Helper to normalize & center any structure/device mesh for handheld & ground drop use
function makeNormalizedItemModel(id, targetRadius) {
  const it = ITEMS[id];
  if (!it) return null;
  const raw = mk(it, null);
  const wrap = new T.Group();
  const bb = new T.Box3().setFromObject(raw);
  const center = bb.getCenter(new T.Vector3());
  const size = bb.getSize(new T.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const sc = (targetRadius || 0.48) / maxDim;
  raw.scale.setScalar(sc);
  raw.position.set(-center.x * sc, -bb.min.y * sc, -center.z * sc);
  wrap.add(raw);
  return wrap;
}

// Register 3D `ITM` builders for every Device (`dv`) and Building Piece (`bd`)
// and any remaining item in `ITEMS` so 100% of items have a 3D model in `ITM`.
function registerAllMissingItemModels() {
  for (const id in ITEMS) {
    if (!ITM[id]) {
      const it = ITEMS[id];
      if (it.bd) {
        // Building piece miniature + blueprint roll accent
        ITM[id] = () => {
          const g = makeNormalizedItemModel(id, 0.52);
          return g;
        };
      } else if (it.dv) {
        // Placeable device miniature
        ITM[id] = () => makeNormalizedItemModel(id, 0.5);
      } else {
        // Procedural fallback crate/parcel for any custom future item
        ITM[id] = bld(b => {
          b.box(0.28, 0.2, 0.22, 0, 0.1, 0, 0x7a5a38);
          b.box(0.3, 0.03, 0.24, 0, 0.19, 0, 0x4a3626);
          b.box(0.05, 0.21, 0.23, 0, 0.1, 0, 0xc9a437);
        });
      }
    }
    if (HOLD[id] === undefined && !ITEMS[id].gun) {
      HOLD[id] = ITEMS[id].bd ? 0.42 : ITEMS[id].dv ? 0.44 : 0.42;
    }
  }
}
registerAllMissingItemModels();

Object.assign(HOLD, {
  fuel: 0.44,
  bedroll: 0.42,
  scrap: 0.48,
  bandage: 0.5,
  medkit: 0.45,
  rations: 0.5,
  meat: 0.45,
  cooked: 0.45,
  ore: 0.45,
  metal: 0.45,
  gears: 0.45,
  circuit: 0.45,
  blade: 0.46,
  propane: 0.42,
  sewing_kit: 0.46,
  tarp: 0.42,
  fuse: 0.48,
  road_sign: 0.44,
  wire: 0.48,
  campfire: 0.42,
  ammo: 0.42,
  ammo_hp: 0.42,
  ammo_ap: 0.42,
  ammo_inc: 0.42,
  helmet: 0.42,
  vest: 0.34,
  legs: 0.38
});

const DROPS = [];
const PICKFX = [];
const dropRingGeo = new T.RingGeometry(0.18, 0.25, 16);
dropRingGeo.rotateX(-Math.PI / 2);

function dropRingColor(id) {
  const it = ITEMS[id];
  if (!it) return 0xd9c27c;
  if (it.gun || id === 'launcher' || it.nade) return 0xe6a23c;
  if (it.arm || it.mel || it.tool) return 0x6ab0e8;
  if (it.use) return 0x68c456;
  if (it.bd || it.dv) return 0xc9a437;
  return 0xb8b2a2;
}

// Build a centered, normalized 3D drop group for any item ID
function buildDropMesh(id, n) {
  const rootG = new T.Group();
  const spinG = new T.Group();

  // Subtle ground halo ring so small items are easy to spot in grass
  const ringMat = new T.MeshBasicMaterial({
    color: dropRingColor(id),
    transparent: true,
    opacity: 0.45,
    side: T.DoubleSide,
    depthWrite: false
  });
  const ring = new T.Mesh(dropRingGeo, ringMat);
  ring.position.y = 0.02;
  rootG.add(ring);

  // Build actual 3D item model from ITM / itemModel
  if (!ITM[id]) registerAllMissingItemModels();
  const mdl = itemModel(id);
  const bb = new T.Box3().setFromObject(mdl);
  const sz = bb.getSize(new T.Vector3());
  const ctr = bb.getCenter(new T.Vector3());
  const maxD = Math.max(sz.x, sz.y, sz.z) || 0.4;
  const targetSize = ITEMS[id] && ITEMS[id].gun ? 0.62 : 0.42;
  const sc = Math.min(1.35, Math.max(0.32, targetSize / maxD));
  mdl.scale.multiplyScalar(sc);
  mdl.position.set(-ctr.x * sc, -ctr.y * sc, -ctr.z * sc);
  spinG.add(mdl);

  // If stack has multiple items, add offset visual copies for a "pile" look
  const copies = n >= 25 ? 2 : n >= 5 ? 1 : 0;
  for (let c = 0; c < copies; c++) {
    const extra = itemModel(id);
    extra.scale.copy(mdl.scale).multiplyScalar(0.86);
    const ang = (c + 1) * 2.1;
    extra.position.set(
      mdl.position.x + Math.cos(ang) * 0.09,
      mdl.position.y - 0.03 * (c + 1),
      mdl.position.z + Math.sin(ang) * 0.09
    );
    extra.rotation.set(0.25 * (c + 1), ang, -0.2);
    spinG.add(extra);
  }

  spinG.position.y = 0.24;
  rootG.add(spinG);

  rootG.userData.spinG = spinG;
  rootG.userData.ring = ring;
  rootG.userData.ringMat = ringMat;
  return rootG;
}

// Spawn a 3D dropped item with ballistic velocity, bounce, and idle animation
function spawnDrop(id, n, x, y, z, vx, vy, vz, meta) {
  if (!ITEMS[id] || !(n > 0)) return null;

  // Merge into an existing nearby settled drop of the same stackable item
  const maxStack = ITEMS[id].max || 1;
  if (maxStack > 1 && (!meta || !meta.dur)) {
    for (const d of DROPS) {
      if (d.id === id && d.n < maxStack && Math.hypot(d.x - x, d.z - z) < 1.35) {
        const add = Math.min(maxStack - d.n, n);
        d.n += add;
        n -= add;
        d.g.userData.n = d.n;
        d.popT = 0.01; // Trigger a pop-bounce on the merged stack
        d.vy = Math.max(d.vy, 1.8);
        d.settled = false;
        if (n <= 0) return d.g;
      }
    }
  }

  // Cap total world drops so performance never degrades
  if (DROPS.length >= 65) {
    const old = DROPS.shift();
    if (old && old.g) {
      const ti = things.indexOf(old.g);
      if (ti >= 0) things.splice(ti, 1);
      scene.remove(old.g);
    }
  }

  const gnd = Math.max(G(x, z, y), H(x, z), 0.05);
  const startY = y != null ? Math.max(y, gnd + 0.12) : gnd + 0.35;
  const g = buildDropMesh(id, n);
  g.position.set(x, startY, z);
  g.scale.setScalar(0.01); // Smooth scale-in pop animation

  g.userData.k = 'drop';
  g.userData.item = id;
  g.userData.n = n;
  g.userData.uses = 1;
  if (meta) {
    g.userData.dur = meta.dur;
    g.userData.mag = meta.mag;
    g.userData.at = meta.at;
    g.userData.mods = meta.mods;
  }

  scene.add(g);
  things.push(g);

  const dObj = {
    g,
    id,
    n,
    x,
    y: startY,
    z,
    vx: vx != null ? vx : (Math.random() - 0.5) * 2.2,
    vy: vy != null ? vy : 2.8 + Math.random() * 1.4,
    vz: vz != null ? vz : (Math.random() - 0.5) * 2.2,
    rx: (Math.random() - 0.5) * 9,
    ry: (Math.random() - 0.5) * 7,
    rz: (Math.random() - 0.5) * 9,
    bounces: 0,
    settled: false,
    popT: 0,
    phase: Math.random() * 6.283,
    life: 600
  };
  DROPS.push(dObj);
  return g;
}

// Keep `dropFood` compatible with existing animal kills while using the new 3D physics drop
function dropFood(x, z, id, n) {
  const y = Math.max(H(x, z), 0.05) + 0.4;
  return spawnDrop(
    id || 'meat',
    n || 1,
    x,
    y,
    z,
    (Math.random() - 0.5) * 2.6,
    3.1 + Math.random() * 1.2,
    (Math.random() - 0.5) * 2.6
  );
}

// Toss an item or slot forward from the player's hands into the world
function tossItemFromPlayer(slotObj, count) {
  if (!slotObj || !ITEMS[slotObj.id]) return false;
  const q = Math.min(count || slotObj.n, slotObj.n);
  const cp = Math.cos(pitch);
  const fx = -Math.sin(yaw) * cp,
    fy = Math.sin(pitch),
    fz = -Math.cos(yaw) * cp;
  const spd = 5.4;
  spawnDrop(
    slotObj.id,
    q,
    P.x + fx * 0.55,
    P.y - 0.15 + fy * 0.3,
    P.z + fz * 0.55,
    fx * spd + (Math.random() - 0.5) * 0.6,
    Math.max(1.6, fy * spd + 2.2),
    fz * spd + (Math.random() - 0.5) * 0.6,
    { dur: slotObj.dur, mag: slotObj.mag, at: slotObj.at, mods: slotObj.mods }
  );
  blip(280, 0.045, 'sine');
  say('Dropped ' + (q > 1 ? q + '× ' : '') + ITEMS[slotObj.id].n + '.');
  return true;
}

// Drop the currently selected hotbar item (press G, or Shift+G for 1)
function dropHeldSlot(onlyOne) {
  if (dead) return;
  const slotIdx = open && pick !== null && pick < 30 && SL[pick] ? pick : sel;
  const s = SL[slotIdx];
  if (!s) return say('Nothing in that slot to drop.');
  const q = onlyOne ? 1 : s.n;
  tossItemFromPlayer(s, q);
  s.n -= q;
  if (s.n <= 0) {
    SL[slotIdx] = null;
    if (pick === slotIdx) pick = null;
  }
  render();
  persist();
}

// Trigger magnetic fly-to-player animation when picking up a drop
function pickupDropObject(o) {
  const u = o.userData;
  const id = u.item || 'meat';
  const n = u.n || 1;
  if (!room(id, n)) return say('Inventory full.');

  // Preserve durability, mag, ammo type & attachments if picking up a dropped tool/weapon
  if (u.dur !== undefined || u.mag !== undefined || u.mods !== undefined) {
    const freeIdx = SL.slice(0, 30).findIndex(x => !x);
    if (freeIdx >= 0 && ITEMS[id].max === 1) {
      SL[freeIdx] = {
        id,
        n: 1,
        dur: u.dur ?? ITEMS[id].dur,
        mag: u.mag,
        at: u.at,
        mods: u.mods
      };
      toast(id, 1);
      render();
    } else {
      give(id, n);
    }
  } else {
    give(id, n);
  }

  // Remove from interactive lists
  const ti = things.indexOf(o);
  if (ti >= 0) things.splice(ti, 1);
  const di = DROPS.findIndex(d => d.g === o);
  if (di >= 0) DROPS.splice(di, 1);

  // Add to magnetic fly-to-hand pickup animation queue
  if (o.userData.ring) o.userData.ring.visible = false;
  PICKFX.push({
    g: o,
    x0: o.position.x,
    y0: o.position.y,
    z0: o.position.z,
    t: 0,
    dur: 0.18
  });

  blip(540, 0.04, 'triangle');
  setTimeout(() => blip(760, 0.05, 'sine'), 45);
  return say('Picked up ' + (n > 1 ? n + '× ' : '') + ITEMS[id].n + '.');
}

// Tick physics, bounce, idle hover/spin, and fly-to-hand pickup animations
function dropTick(dt) {
  for (let i = DROPS.length - 1; i >= 0; i--) {
    const d = DROPS[i];
    const g = d.g;
    if (!g || !g.parent) {
      DROPS.splice(i, 1);
      continue;
    }

    d.life -= dt;
    if (d.life <= 0) {
      const ti = things.indexOf(g);
      if (ti >= 0) things.splice(ti, 1);
      scene.remove(g);
      DROPS.splice(i, 1);
      continue;
    }

    // Pop-in elastic scale animation on spawn (0 -> 1.12 -> 1.0)
    if (d.popT < 0.28) {
      d.popT = Math.min(0.28, d.popT + dt);
      const u = d.popT / 0.28;
      const sc = u < 0.7 ? (u / 0.7) * 1.14 : 1.14 - ((u - 0.7) / 0.3) * 0.14;
      g.scale.setScalar(Math.max(0.05, sc));
    } else if (d.life < 4) {
      // Shrink out gently right before despawning
      g.scale.setScalar(Math.max(0.01, d.life / 4));
    } else {
      g.scale.setScalar(1);
    }

    const spinG = g.userData.spinG;

    if (!d.settled) {
      // Ballistic arc & gravity
      d.vy -= 11.5 * dt;
      const nx = Math.max(-B + 2, Math.min(B - 2, d.x + d.vx * dt));
      const nz = Math.max(-B + 2, Math.min(B - 2, d.z + d.vz * dt));
      let ny = d.y + d.vy * dt;

      // Bounce off walls/doors
      if (ordBlocked(nx, ny + 0.15, nz)) {
        d.vx *= -0.45;
        d.vz *= -0.45;
      } else {
        d.x = nx;
        d.z = nz;
      }

      const floorY = Math.max(G(d.x, d.z, d.y + 0.3), H(d.x, d.z), 0.04);

      // Mid-air tumble rotation
      if (spinG) {
        spinG.rotation.x += d.rx * dt;
        spinG.rotation.y += d.ry * dt;
        spinG.rotation.z += d.rz * dt;
      }

      // Ground impact & bounce
      if (ny <= floorY) {
        ny = floorY;
        if (Math.abs(d.vy) > 1.15 && d.bounces < 3) {
          d.vy = -d.vy * 0.42;
          d.vx *= 0.58;
          d.vz *= 0.58;
          d.rx *= 0.5;
          d.rz *= 0.5;
          d.bounces++;
          if (Math.hypot(P.x - d.x, P.z - d.z) < 18) {
            blip(170 + d.bounces * 45, 0.025, 'triangle');
          }
        } else {
          d.vy = 0;
          d.vx = 0;
          d.vz = 0;
          d.settled = true;
        }
      }
      d.y = ny;
      g.position.set(d.x, d.y, d.z);
    } else {
      // Settled idle animation: smooth upright alignment, vertical bobbing & 360° spin
      d.phase += dt * 2.6;
      if (spinG) {
        spinG.rotation.x += (0 - spinG.rotation.x) * Math.min(1, dt * 8);
        spinG.rotation.z += (0.14 * Math.sin(d.phase * 0.7) - spinG.rotation.z) * Math.min(1, dt * 8);
        spinG.rotation.y += dt * 1.35;
        spinG.position.y = 0.24 + Math.sin(d.phase) * 0.055;
      }
      if (g.userData.ringMat) {
        g.userData.ringMat.opacity = 0.32 + 0.18 * Math.sin(d.phase * 1.3);
        const rSc = 0.92 + 0.08 * Math.sin(d.phase * 1.3);
        g.userData.ring.scale.set(rSc, rSc, 1);
      }
    }
  }

  // Animate picked-up items flying into the player's hand
  for (let i = PICKFX.length - 1; i >= 0; i--) {
    const f = PICKFX[i];
    f.t += dt;
    const u = Math.min(1, f.t / f.dur);
    const e = u * u * (3 - 2 * u);
    const tx = P.x - Math.sin(yaw) * 0.35;
    const ty = P.y - 0.28;
    const tz = P.z - Math.cos(yaw) * 0.35;
    f.g.position.set(
      f.x0 + (tx - f.x0) * e,
      f.y0 + (ty - f.y0) * e + Math.sin(u * Math.PI) * 0.22,
      f.z0 + (tz - f.z0) * e
    );
    f.g.scale.setScalar(Math.max(0.05, 1 - e * 0.85));
    if (f.g.userData.spinG) f.g.userData.spinG.rotation.y += dt * 14;
    if (u >= 1) {
      scene.remove(f.g);
      PICKFX.splice(i, 1);
    }
  }
}

const FP_HAND_CACHE={};
function mkFpHand(side,pose){
 const key=side+"_"+pose;if(FP_HAND_CACHE[key]){const cl=FP_HAND_CACHE[key].clone();if(pose==="gun_r"&&cl.children.length>1)cl.userData.trigF=cl.children[1];return cl}
 const b=new MB(),s=side||1,sk=0xd8a882,skD=0xc28e68,nail=0xe8c8a8,glv=0x4a3522,glvD=0x2a1f16,slv=0x353c30,slvD=0x242920;
 // Forearm jacket sleeve + rolled knit cuff + bare lower forearm (rx=1.92 so +Y points backward +Z and downward -Y into the lower corner)
 b.cyl(.054,.042,.34,10,s*.048,-.095,.24,slv,[1.92,0,s*.20]);
 b.tor(.046,.0045,s*.030,-.056,.145,slvD,[1.92,0,s*.20],9,6);
 b.cyl(.045,.043,.048,10,s*.024,-.044,.115,slvD,[1.92,0,s*.20]);
 b.cyl(.040,.034,.095,10,s*.010,-.022,.058,sk,[1.90,0,s*.16]);
 // Wrist detail: survival field watch on left wrist, paracord wrap on right wrist
 if(s<0){
  b.cyl(.037,.037,.026,10,-.006,-.014,.038,0x3b2818,[1.90,0,-.16]);
  b.cyl(.022,.022,.012,10,-.012,.018,.034,0x1c2024,[.3,0,.2]);
  b.cyl(.017,.017,.014,10,-.012,.019,.034,0x58b882,[.3,0,.2]);
 }else{
  for(let i=0;i<3;i++)b.tor(.035,.0045,.006,-.010-i*.005,.034+i*.01,0x58442e,[.42,0,-.18],10,6);
 }
 // Fingerless tactical leather glove palm & dorsal knuckle protection
 b.box(.072,.078,.034,0,0,0,glv);
 b.box(.068,.042,.016,0,.016,s>0?.014:-.014,glvD);
 for(let i=0;i<4;i++){const fx=(i-1.5)*.016;b.sph(.0095,fx,.036,0,glvD,.82,6)}
 let trigG=null;
 if(pose==="gun_r"){
  const tb=new MB();
  tb.cyl(.0085,.0095,.046,7,-.018,0,-.016,sk,[1.35,-.18,0]);
  tb.cyl(.0075,.0085,.034,7,-.024,.002,-.046,skD,[1.55,-.45,0]);
  tb.sph(.007,-.028,.002,-.062,nail,.7,5);
  trigG=tb.build();trigG.position.set(0,.032,-.012);
  for(let i=0;i<3;i++){const fy=-.004-i*.019;
   b.cyl(.0085,.0095,.042,7,-.024,fy,-.022,sk,[1.57,.35,0]);
   b.cyl(.0075,.0085,.034,7,-.036,fy,-.028,skD,[1.57,1.25,0]);
   b.sph(.007,-.032,fy,-.012,nail,.7,5)}
  b.cyl(.010,.011,.042,7,-.028,.026,.008,sk,[.4,.6,.8]);
  b.cyl(.009,.010,.032,7,-.042,.034,-.012,skD,[.8,.9,.5]);
 }else if(pose==="gun_l"){
  for(let i=0;i<4;i++){const fz=-.028+i*.018;
   b.cyl(.0085,.0095,.042,7,.026,.018,fz,sk,[0,0,-.65]);
   b.cyl(.0075,.0085,.034,7,.036,.046,fz,skD,[0,0,-.15]);
   b.sph(.007,.034,.064,fz,nail,.7,5)}
  b.cyl(.010,.011,.044,7,-.026,.022,-.012,sk,[.2,0,.55]);
  b.cyl(.009,.010,.034,7,-.032,.050,-.016,skD,[.15,0,.15]);
 }else if(pose==="shaft"){
  // Wrapped power fist around vertical tool/weapon shaft
  for(let i=0;i<4;i++){const fy=.026-i*.018;
   b.cyl(.0085,.0095,.044,7,-s*.018,fy,-.024,sk,[1.57,s*.42,0]);
   b.cyl(.0075,.0085,.036,7,-s*.034,fy,-.014,skD,[1.57,s*1.35,0]);
   b.sph(.007,-s*.026,fy,.004,nail,.7,5)}
  b.cyl(.010,.011,.044,7,-s*.024,.024,.012,sk,[.5,s*.5,s*.7]);
  b.cyl(.009,.010,.034,7,-s*.036,.028,-.010,skD,[.9,s*.8,s*.4]);
 }else if(pose==="rock"){
  // Survival hammerstone grip: fingers splayed & clamped firmly around the base/sides of the stone so the knapped head is exposed forward
  for(let i=0;i<4;i++){const fx=(i-1.5)*.019,arch=Math.abs(i-1.5)*.004;
   b.cyl(.009,.010,.044,7,fx,.018-arch,-.028,sk,[1.05,0,(i-1.5)*-.08]);
   b.cyl(.008,.009,.036,7,fx,.042-arch,-.048,skD,[.45,0,(i-1.5)*-.06]);
   b.sph(.0075,fx,.058-arch,-.052,nail,.75,5)}
  b.cyl(.011,.012,.046,7,-.038,.020,-.016,sk,[.75,.35,.55]);
  b.cyl(.0095,.011,.036,7,-.046,.046,-.034,skD,[.35,.55,.25]);
  b.sph(.008,-.044,.060,-.042,nail,.75,5);
 }else if(pose==="guard"){
  // Off-hand counterbalance fist for 1-handed melee & rock bashing
  for(let i=0;i<4;i++){const fx=(i-1.5)*.016;
   b.cyl(.0085,.0095,.040,7,fx,.028,-.018,sk,[1.45,0,0]);
   b.cyl(.0075,.0085,.032,7,fx,.014,-.032,skD,[2.35,0,0]);
   b.sph(.007,fx,.002,-.022,nail,.7,5)}
  b.cyl(.010,.011,.042,7,-s*.028,.020,-.006,sk,[.9,s*.4,s*.6]);
  b.cyl(.009,.010,.032,7,-s*.018,.022,-.026,skD,[1.4,s*.7,s*.3]);
 }else{
  for(let i=0;i<4;i++){const fx=(i-1.5)*.017;
   b.cyl(.0085,.0095,.044,7,fx,.016,-.026,sk,[1.15,0,0]);
   b.cyl(.0075,.0085,.036,7,fx,.042,-.042,skD,[.45,0,0]);
   b.sph(.007,fx,.060,-.046,nail,.7,5)}
  b.cyl(.010,.011,.044,7,-s*.034,.018,-.008,sk,[.65,s*.35,s*.55]);
  b.cyl(.009,.010,.036,7,-s*.042,.046,-.022,skD,[.25,s*.45,s*.25]);
 }
 const out=b.build();if(trigG)out.add(trigG);FP_HAND_CACHE[key]=out;
 const cl=out.clone();if(pose==="gun_r"&&cl.children.length>1)cl.userData.trigF=cl.children[1];return cl;
}
function isShaftItem(id){
 const it=ITEMS[id];if(!it)return false;
 return !!(it.mel||it.tool==="hatchet"||it.tool==="pickaxe"||id==="hammer"||id==="club"||id==="knife"||id==="machete"||id==="spear"||id==="torch"||id==="bow");
}
function isTwoHandHold(id){
 const it=ITEMS[id];if(!it)return false;
 return !!(it.bd||it.dv||id==="spear"||id==="bow"||id==="launcher"||id==="medkit"||id==="c4"||id==="satchel"||id==="wood"||id==="stone"||id==="ore");
}
function syncVM(){const s=SL[sel],id=s?s.id:null,m0=s&&gunMods(s),sig=id?(id+"|"+(m0?(m0.sight||"")+","+(m0.barrel||"")+","+(m0.under||""):"")):null;if(id===vmId&&sig===vmSig)return;vmId=id;vmSig=sig;lnT=0;mT=0;bloom=0;fireCd=0;while(vm.children.length)vm.remove(vm.children[0]);vmM=null;vmP=null;if(!id)return;
 if(!ITEMS[id])return;if(!ITEMS[id].gun&&!ITM[id])registerAllMissingItemModels();vmM=itemModel(id);vmM.scale.setScalar(ITEMS[id].gun?VMS[id][0]:id==="chainsaw"?.6:id==="jackhammer"?.52:(ITEMS[id].tool==="hatchet"||ITEMS[id].tool==="pickaxe")?.62:id==="rock"?.66:(HOLD[id]||.45));
 drawT=.24;gz=gzv=gr=grv=gy=gyv=gro=grov=0;actT=0;ejDone=true;cylR=cylT=0;
 if(ITEMS[id].gun){
  vmM.rotation.set(0,Math.PI/2,0);const gp=vmM.userData.grip||[0,0,0],fp=vmM.userData.fore||[.28,.06,0],sc=VMS[id][0];
  vmG.set(gp[2]*sc,gp[1]*sc,-gp[0]*sc);vmM.position.set(-vmG.x,-vmG.y,-vmG.z);
  vmP=new T.Group();vmP.add(vmM);attachVM(vmM,s);
  const rH=mkFpHand(1,"gun_r"),isPist=id==="pistol"||id==="revolver";
  rH.position.set(.014,-.018,.018);rH.rotation.set(.18,.08,-.12);vmP.add(rH);
  const lH=mkFpHand(-1,isPist?"gun_r":"gun_l");
  const fx=(fp[2]-gp[2])*sc-.022,fy=(fp[1]-gp[1])*sc-.026,fz=-(fp[0]-gp[0])*sc;
  const lBase=isPist?[-.022,-.028,-.018]:[fx,fy,fz];
  lH.position.set(lBase[0],lBase[1],lBase[2]);
  lH.rotation.set(isPist?.24:.08,isPist?-.28:.22,isPist?.28:.18);
  lH.userData.base=lBase;rH.userData.base=[.014,-.018,.018];
  vmP.userData.rH=rH;vmP.userData.lH=lH;
  vm.add(vmP);const fl=makeFlash();vmM.userData.fl=fl;vmM.userData.fm=fl.userData.m;vmM.add(fl);fl.visible=false;drawT=.36;
 }else if(id==="launcher"){
  vmM.rotation.set(0,Math.PI/2,0);const gp=vmM.userData.grip||[.20,.04,0],fp=vmM.userData.fore||[-.18,.04,0],sc=HOLD.launcher||.4;
  vmG.set(gp[2]*sc,gp[1]*sc,-gp[0]*sc);vmM.position.set(-vmG.x,-vmG.y,-vmG.z);
  vmP=new T.Group();vmP.add(vmM);
  const rH=mkFpHand(1,"gun_r"),lH=mkFpHand(-1,"gun_l");
  rH.position.set(.014,-.018,.018);rH.rotation.set(.18,.08,-.12);
  const fx=(fp[2]-gp[2])*sc-.022,fy=(fp[1]-gp[1])*sc-.026,fz=-(fp[0]-gp[0])*sc;
  lH.position.set(fx,fy,fz);lH.rotation.set(.08,.22,.18);
  lH.userData.base=[fx,fy,fz];rH.userData.base=[.014,-.018,.018];
  vmP.userData.rH=rH;vmP.userData.lH=lH;vmP.add(rH,lH);vm.add(vmP);
 }else if(id==="rock"){
  // Survival Hammerstone in right hand + independent left guard hand
  vmP=new T.Group();
  vmM.position.set(-.006,.018,-.018);
  vmM.rotation.set(.18,-.22,.08);
  vmM.userData.baseRot=[.18,-.22,.08];
  vmM.userData.basePos=[-.006,.018,-.018];
  vmP.add(vmM);
  const rH=mkFpHand(1,"rock");
  rH.position.set(.008,-.008,.014);rH.rotation.set(.14,-.12,-.10);
  rH.userData.base=[.008,-.008,.014];vmP.userData.rH=rH;vmP.add(rH);
  const lH=mkFpHand(-1,"guard");
  lH.position.set(-.21,-.23,-.42);lH.rotation.set(.12,.28,.18);
  lH.userData.base=[-.21,-.23,-.42];lH.userData.indep=true;
  vmP.userData.lH=lH;vm.add(lH);
  vm.add(vmP);
 }else{
  vmP=new T.Group();
  const shaft=isShaftItem(id),twoH=isTwoHandHold(id);
  if(shaft){
   // Position shafted weapon/tool so handle sits in fist and head/blade rises cleanly above & forward
   if(id==="bow"){vmM.rotation.set(.15,Math.PI/2,.12);vmM.position.set(-.03,.05,-.06)}
   else if(id==="spear"){vmM.rotation.set(-1.18,Math.PI,-.06);vmM.position.set(-.01,-.02,-.18)}
   else if(id==="chainsaw"){vmM.rotation.set(.04,Math.PI,0);vmM.position.set(0,-.07,.04)}
   else if(id==="jackhammer"){vmM.rotation.set(.1,Math.PI,0);vmM.position.set(0,-.02,.04)}
   else{vmM.rotation.set(-.22,Math.PI,-.04);vmM.position.set(0,.055,-.025)}
   vmM.userData.baseRot=[vmM.rotation.x,vmM.rotation.y,vmM.rotation.z];
   vmM.userData.basePos=[vmM.position.x,vmM.position.y,vmM.position.z];
   vmP.add(vmM);
   const rH=mkFpHand(1,"shaft");
   rH.position.set(.008,-.018,.014);rH.rotation.set(.14,-.14,-.08);
   if(id==="chainsaw"){rH.position.set(.012,.028,.075)}else if(id==="jackhammer"){rH.position.set(.1,-.012,.02)}
   if(id==="chainsaw"||id==="jackhammer")rH.userData.base=[rH.position.x,rH.position.y,rH.position.z];else rH.userData.base=[.008,-.018,.014];vmP.userData.rH=rH;vmP.add(rH);
   if(twoH){
    const lH=mkFpHand(-1,"shaft");
    lH.position.set(...(id==="chainsaw"?[-.085,.048,-.11]:id==="jackhammer"?[-.1,-.012,.02]:id==="spear"?[-.048,-.035,-.16]:[-.014,.04,-.06]));
    lH.rotation.set(.16,id==="chainsaw"?.42:id==="spear"?.36:.24,id==="chainsaw"?.28:.14);lH.userData.base=[lH.position.x,lH.position.y,lH.position.z];
    vmP.userData.lH=lH;vmP.add(lH);
   }else{
    const lH=mkFpHand(-1,"guard");
    lH.position.set(-.21,-.24,-.42);lH.rotation.set(.12,.28,.18);
    lH.userData.base=[-.21,-.24,-.42];lH.userData.indep=true;
    vmP.userData.lH=lH;vm.add(lH);
   }
  }else{
   const bb=new T.Box3().setFromObject(vmM),c=bb.getCenter(new T.Vector3()),sz=bb.getSize(new T.Vector3()),mx=Math.max(sz.x,sz.y,sz.z)||.2;
   if(mx>.26){const fit=.22/mx;vmM.scale.multiplyScalar(fit);bb.setFromObject(vmM);bb.getCenter(c)}
   else if(mx<.12){const fit=.15/mx;vmM.scale.multiplyScalar(fit);bb.setFromObject(vmM);bb.getCenter(c)}
   vmM.position.set(-c.x-.005,-c.y+.034,-c.z-.028);
   vmM.rotation.set(.14,-.32,.06);
   vmM.userData.baseRot=[.14,-.32,.06];
   vmM.userData.basePos=[vmM.position.x,vmM.position.y,vmM.position.z];
   vmP.add(vmM);
   const rH=mkFpHand(1,"cradle");
   rH.position.set(.008,-.008,.012);rH.rotation.set(.12,-.16,-.10);
   rH.userData.base=[.008,-.008,.012];vmP.userData.rH=rH;vmP.add(rH);
   if(twoH){
    const lH=mkFpHand(-1,"cradle");
    lH.position.set(-.078,-.006,.008);lH.rotation.set(.12,.24,.16);
    lH.userData.base=[-.078,-.006,.008];vmP.userData.lH=lH;vmP.add(lH);
   }else{
    const lH=mkFpHand(-1,"guard");
    lH.position.set(-.22,-.25,-.42);lH.rotation.set(.12,.28,.18);
    lH.userData.base=[-.22,-.25,-.42];lH.userData.indep=true;
    vmP.userData.lH=lH;vm.add(lH);
   }
  }
  vm.add(vmP);
 }}
function bobVM(dt,mv){if(!vmM||!vmP)return;const it=ITEMS[vmId],b=Math.sin(age*9)*mv*.014,bx=Math.cos(age*4.5)*mv*.012,br=Math.sin(age*2.1)*.004,k=Math.min(1,dt*10);swX+=(-mdx*.0008-swX)*k;swY+=(mdy*.0008-swY)*k;mdx=mdy=0;
 if(it.gun){gunPose(dt,mv,b,bx)}
 else{
  drawT=Math.max(0,drawT-dt);const dr=drawT>0?(drawT/.24)*(drawT/.24):0;
  let lk=0,ld=0;if(vmId==="launcher"&&lnT>0){lnT=Math.max(0,lnT-dt);const p=1-lnT/.9;lk=Math.max(0,1-p/.16);lk*=lk;ld=p>.2?Math.sin(Math.PI*Math.min(1,(p-.2)/.7)):0}
  const sm=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
  // mx/my/mz translate the arm from the shoulder; mrx/mry/mrz rotate the forearm moderately so the sleeve always stays anchored low,
  // while headRx/headRz snap the tool/weapon head forward at the wrist!
  let mx=0,my=0,mz=0,mrx=0,mry=0,mrz=0,headRx=0,headRz=0,offX=0,offY=0,offZ=0,offRx=0;
  const MM=ITEMS[vmId]&&ITEMS[vmId].mel;
  if(MM&&mT>0){
   mT=Math.max(0,mT-dt);
   const p=1-mT/mD,st=MM.st;
   const wu=p<.25?sm(p/.25):0;
   const strk=p>=.25&&p<.50?sm((p-.25)/.25):0;
   const imp=p>=.46&&p<.68?Math.sin((p-.46)/.22*Math.PI)*(swingHit?1:.35):0;
   const rec=p>=.50?1-sm((p-.50)/.50):0;
   const sK=p<.25?-wu:p<.50?-1+2*strk:rec;
   if(st==="smash"){
    // Heavy Spiked Club overhead bludgeon
    mx=sK<0?-sK*.07:-sK*.12;
    my=sK<0?-sK*.14:-sK*.08+imp*.035;
    mz=sK<0?-sK*.05:-sK*.22+imp*.055;
    mrx=sK<0?-sK*.28:-sK*.24+imp*.10;
    mry=sK*.24;mrz=-sK*.22;
    headRx=sK<0?-sK*.38:-sK*.68+imp*.24;
   }else if(st==="slash"){
    // Alternating diagonal Machete cleave
    const dir=slashDir||1;
    mx=-sK*.22*dir;
    my=sK<0?-sK*.08:-sK*.04+imp*.02;
    mz=sK>0?-sK*.16+imp*.04:.04*(-sK);
    mrx=sK<0?-sK*.18:-sK*.20+imp*.08;
    mry=sK*.45*dir;
    mrz=-sK*.38*dir;
    headRx=-sK*.45;headRz=-sK*.35*dir;
    offX=sK*.045*dir;offY=-Math.abs(sK)*.025;offZ=sK*.05;offRx=-Math.abs(sK)*.15;
   }else if(st==="stab"){
    // Fast forward Combat Knife stab
    mx=sK<0?-sK*.04:-sK*.08;
    my=sK<0?-sK*.03:sK*.025;
    mz=sK<0?-sK*.07:-sK*.28+imp*.05;
    mrx=sK<0?-sK*.14:-sK*.18+imp*.06;
    mry=sK*.18;mrz=sK*.24;
    headRx=-sK*.52;
    offX=.035*Math.max(0,sK);offZ=.06*Math.max(0,sK);offRx=-.18*Math.max(0,sK);
   }else{
    // Two-handed Wooden Spear polearm thrust
    mx=-sK*.05;
    my=sK<0?-sK*.02:sK*.03;
    mz=sK<0?-sK*.09:-sK*.36+imp*.06;
    mrx=sK<0?sK*.10:-sK*.16+imp*.06;
    mry=sK*.08;
    headRx=-sK*.22;
   }
  }else if(swing>0){
   const d=swingD||.38,p=1-swing/d;
   const wu=p<.26?sm(p/.26):0;
   const strk=p>=.26&&p<.50?sm((p-.26)/.24):0;
   const imp=p>=.46&&p<.68?Math.sin((p-.46)/.22*Math.PI)*(swingHit?1:.3):0;
   const rec=p>=.50?1-sm((p-.50)/.50):0;
   const sK=p<.26?-wu:p<.50?-1+2*strk:rec;
   if(swingKind==="rock"||vmId==="rock"){
    // Heavy survival hammerstone overhead-diagonal bash:
    // Arm lifts up & right on windup, drives forward-left-down across crosshair, while wrist snaps the stone into the surface!
    mx=sK<0?-sK*.085:-sK*.135+imp*.025;
    my=sK<0?-sK*.125:-sK*.065+imp*.040;
    mz=sK<0?-sK*.055:-sK*.215+imp*.065;
    mrx=sK<0?-sK*.28:-sK*.22+imp*.12;
    mry=sK*.30;
    mrz=sK<0?sK*.22:sK*.26-imp*.08;
    headRx=sK<0?-sK*.25:-sK*.55+imp*.22;
    headRz=sK*.22;
    // Left off-hand braces up on windup, then pulls back & down for counter-torque on the slam
    offX=sK<0?(-sK)*.045:-sK*.055;
    offY=sK<0?(-sK)*.065:-sK*.045;
    offZ=sK<0?-(-sK)*.055:sK*.075;
    offRx=sK<0?(-sK)*.22:-sK*.18;
   }else if(swingKind==="saw"||swingKind==="drill"){
    // Powered tools: no wind-up, just a short push into the surface
    const u=Math.sin(p*Math.PI);
    mz=-.09*u;my=swingKind==="saw"?-.02*u:0;mrx=-.04*u;headRx=-.03*u;
   }else if(swingKind==="chop"||vmId==="hatchet"){
    // Two-handed diagonal axe cleave into timber
    mx=sK<0?-sK*.105:-sK*.165+imp*.03;
    my=sK<0?-sK*.115:-sK*.055+imp*.025;
    mz=sK<0?-sK*.055:-sK*.215+imp*.055;
    mrx=sK<0?-sK*.26:-sK*.22+imp*.10;
    mry=sK*.36;
    mrz=sK<0?sK*.32:sK*.34-imp*.10;
    headRx=sK<0?-sK*.32:-sK*.64+imp*.22;
    headRz=sK*.18;
   }else if(swingKind==="mine"||vmId==="pickaxe"){
    // High overhead two-handed quarry pickaxe strike
    mx=sK<0?-sK*.045:-sK*.075;
    my=sK<0?-sK*.155:-sK*.085+imp*.045;
    mz=sK<0?-sK*.065:-sK*.235+imp*.065;
    mrx=sK<0?-sK*.32:-sK*.25+imp*.12;
    mry=sK*.16;
    mrz=-sK*.14;
    headRx=sK<0?-sK*.38:-sK*.72+imp*.26;
   }else if(swingKind==="use"||(it&&it.use)){
    const u=Math.sin(p*Math.PI);
    mx=-u*.11;my=u*.085;mz=u*.07;mrx=u*.28;mrz=u*.20;
   }else{
    // Builder Hammer / general tool strike
    mx=sK<0?-sK*.06:-sK*.10;
    my=sK<0?-sK*.11:-sK*.06+imp*.035;
    mz=sK<0?-sK*.05:-sK*.19+imp*.05;
    mrx=sK<0?-sK*.24:-sK*.20+imp*.10;
    mry=sK*.22;mrz=sK*.22;
    headRx=sK<0?-sK*.30:-sK*.58+imp*.20;
    offY=-Math.abs(sK)*.035;offZ=sK*.05;
   }
  }
  if(vmId==="launcher"){
   vmP.position.set(.20*VK+swX+bx,-.19+swY+b+br-lk*.04-ld*.12-dr*.22,-.46+lk*.22);
   vmP.rotation.set(lk*.16+ld*.18+swY*.7-dr*.45,-swX*.7,lk*.08-ld*.12);
  }else{
   const shaft=isShaftItem(vmId),isRock=vmId==="rock";
   const baseX=(isRock?.20:shaft?.22:.20)*VK,baseY=isRock?-.195:shaft?-.215:-.185,baseZ=isRock?-.44:shaft?-.48:-.45;
   vmP.position.set(baseX+swX+bx+mx,baseY+swY+b+br+my-dr*.18,baseZ+mz+dr*.05);
   vmP.rotation.set((isRock?.08:shaft?.04:.10)+mrx+swY*.65-dr*.25,mry-swX*.65,(isRock?-.06:shaft?-.08:-.06)+mrz);
   if(vmId==="chainsaw"||vmId==="jackhammer"){
    const run=(fireHeld||swing>0)&&!open,jt=run?(vmId==="jackhammer"?.011:.007):.0015;
    vmP.position.x+=(Math.random()-.5)*jt;vmP.position.y+=(Math.random()-.5)*jt;vmP.position.z+=(Math.random()-.5)*jt*.6;
    const cn=vmM.userData.chain,bt=vmM.userData.bit;
    if(cn&&cn.parent)cn.position.z=(age*(run?1.6:.2))%.05;
    if(bt&&bt.parent)bt.position.z=run?Math.sin(age*95)*.016:0;
   }
   // Snap the held tool/rock/weapon head forward into the strike while keeping the forearm naturally angled
   if(vmM&&vmM.userData.baseRot){
    const br0=vmM.userData.baseRot;
    vmM.rotation.set(br0[0]+headRx,br0[1],br0[2]+headRz);
   }
   const rH=vmP.userData.rH,lH=vmP.userData.lH;
   if(rH&&rH.userData.base){
    const rb=rH.userData.base;
    rH.position.set(rb[0],rb[1]+Math.sin(age*2.1)*.002,rb[2]);
    rH.rotation.x=.14+headRx*.22;
   }
   if(lH&&lH.userData.base){
    const lb=lH.userData.base;
    if(lH.userData.indep){
     lH.position.set(lb[0]*VK+swX*.6+bx*.7+offX,lb[1]+swY*.6+b*.8-br+offY-dr*.14,lb[2]+offZ+dr*.04);
     lH.rotation.set(.12+swY*.5+offRx-dr*.2,.28-swX*.5,.18);
    }else{
     lH.position.set(lb[0],lb[1]-Math.sin(age*2.1)*.002,lb[2]);
     lH.rotation.x=.16+headRx*.18;
    }
   }
  }}}
function blockDist(ox,oy,oz,dx,dy,dz,max){let best=max;
 // terrain: sampled along the ray
 for(let u=.6;u<best;u+=.6){const x=ox+dx*u,y=oy+dy*u,z=oz+dz*u;if(y<H(x,z)-.05){best=u;break}}
 // walls: exact ray vs box (no gaps, so thin walls can't be skipped between samples)
 const BIG=1e9,sl=(o,d,lo,hi)=>{if(Math.abs(d)<1e-9)return o>lo&&o<hi?[-BIG,BIG]:null;const a=(lo-o)/d,b=(hi-o)/d;return a<b?[a,b]:[b,a]};
 for(let i=0;i<ALLC.length;i++){const c=ALLC[i];if(c.ramp||(c.d&&(c.d.open||c.d._gone)))continue;
  let ylo=-BIG,yhi=BIG;if(c.found){ylo=c.top-2.45;yhi=c.top-.04}else if(c.y!==undefined){ylo=c.y-.08;yhi=c.y+(c.h||3.05)}
  const sx=sl(ox,dx,c.x0-.12,c.x1+.12);if(!sx)continue;const sz=sl(oz,dz,c.z0-.12,c.z1+.12);if(!sz)continue;const sy=sl(oy,dy,ylo,yhi);if(!sy)continue;
  const t0=Math.max(.6,sx[0],sz[0],sy[0]),t1=Math.min(best,sx[1],sz[1],sy[1]);if(t0>=t1)continue;
  if(c.winWall){for(let u=t0;u<=t1;u+=.1){const x=ox+dx*u,y=oy+dy*u,z=oz+dz*u;if(y>c.y+1.02&&y<c.y+2.22&&Math.hypot(x-c.wx,z-c.wz)<.52)continue;best=u;break}}
  else best=t0}
 return best}
function tracer(ox,oy,oz,dx,dy,dz,len,yw,col){if(!col)fxAdd(0,0xffe2a0,ox+dx*.7,oy+dy*.7,oz+dz*.7,0,0,0,.07,.2,.2,.2,0);const rx=Math.cos(yw)*(1-adsLerp*.85),rz=-Math.sin(yw)*(1-adsLerp*.85),_tr=poolTracer(ox+dx*.55+rx*.2,oy+dy*.55-.14*(1-adsLerp*.55),oz+dz*.55+rz*.2,ox+dx*len,oy+dy*len,oz+dz*len,col,65)}
let hmTo=0;
function hitMark(crit,kill){const c=$('cross');c.classList.add('hit');c.style.borderColor=kill?'#ff3838':crit?'#ffd24a':'';clearTimeout(hmTo);hmTo=setTimeout(()=>{c.classList.remove('hit');c.style.borderColor=''},kill?180:120)}
// ===== AMMO TYPES, GUN ANIMATION, EFFECTS =====
let bloom=0;
const tri=(p,a,b,c)=>{if(p<=0)return 0;const x=p<a?p/a:p<b?1:p<c?1-(p-b)/(c-b):0;return x*x*(3-2*x)};
const ANIM={
 pistol:{kb:1.6,ku:3.1,ky:.42,kr:.5,cam:.01,ab:.13,a:'slide',ad:.15,mz:[.44,.17],fs:.8,fl:.045,rk:'mag',md:[-.22,-.98],f:250},
 revolver:{kb:2.7,ku:4.8,ky:.65,kr:1.2,cam:.026,sh:.004,ab:.04,a:'hammer',ad:.26,ej:'r',ep:9,mz:[.55,.205],fs:1.15,fl:.065,rk:'cyl',f:135,sp:[210,.55]},
 shotgun:{kb:3.3,ku:5.6,ky:.85,kr:1.1,cam:.038,sh:.009,ab:.24,a:'pump',ad:.65,ej:'act',ep:.45,cs:'hull',mz:[.88,.175],fs:1.45,fl:.075,rk:'shells',f:92,sp:[185,.54]},
 pump:{kb:3.2,ku:5.4,ky:.8,kr:1.05,cam:.036,sh:.008,ab:.24,a:'pump',ad:.68,ej:'act',ep:.42,cs:'hull',mz:[.96,.205],fs:1.45,fl:.075,rk:'shells',f:95,sp:[190,.55]},
 rifle:{kb:2.9,ku:4.5,ky:.45,kr:.65,cam:.034,sh:.005,ab:.22,a:'bolt',ad:.52,ej:'act',ep:.40,mz:[1.12,.168],fs:1.3,fl:.065,rk:'bolt',f:118,sp:[195,.56]},
 sar:{kb:1.8,ku:2.9,ky:.48,kr:.55,cam:.014,ab:.09,a:'slide',ad:.11,mz:[.96,.20],fs:1.0,fl:.045,rk:'mag',md:[.1,-1],f:160},
 smg:{kb:.88,ku:1.45,ky:.48,kr:.48,cam:.003,ab:.08,a:'slide',ad:.065,mz:[.78,.142],fs:.75,fl:.038,rk:'mag',md:[.12,-.99],f:310},
 thompson:{kb:1.05,ku:1.75,ky:.52,kr:.55,cam:.0035,ab:.09,a:'slide',ad:.085,mz:[.74,.175],fs:.9,fl:.042,rk:'mag',md:[.1,-1],f:205},
 ak:{kb:1.35,ku:2.2,ky:.58,kr:.58,cam:.0045,ab:.10,a:'slide',ad:.085,mz:[1.0,.20],fs:1.05,fl:.048,rk:'mag',md:[.43,-.9],f:175}};
for(const k in ANIM)ANIM[k]=Object.assign({sh:0,ej:'a',ep:0,cs:'',sp:[250,.65],md:[0,-.9]},ANIM[k]);
const ADS_Y={pistol:.036,revolver:.032,shotgun:.062,pump:.052,rifle:.022,sar:.048,smg:.042,thompson:.052,ak:.046};
// pooled tracer lines: reuse a fixed set of Line objects instead of building geometry + material per shot
const TRP=[];for(let i=0;i<24;i++){const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(new Float32Array(6),3));const l=new T.Line(g,new T.LineBasicMaterial({color:0xffe9a0}));l.visible=false;l.frustumCulled=false;scene.add(l);TRP.push({l,busy:false,t:0})}
function poolTracer(x0,y0,z0,x1,y1,z1,col,ms){let s=TRP.find(q=>!q.busy);if(!s){s=TRP.reduce((a,q)=>q.t<a.t?q:a,TRP[0])}clearTimeout(s.to);const a=s.l.geometry.attributes.position.array;a[0]=x0;a[1]=y0;a[2]=z0;a[3]=x1;a[4]=y1;a[5]=z1;s.l.geometry.attributes.position.needsUpdate=true;s.l.material.color.setHex(col||0xffe9a0);s.l.visible=true;s.busy=true;s.t=performance.now();s.to=setTimeout(()=>{s.l.visible=false;s.busy=false},ms||70)}
const FXP=[],fxSph=new T.SphereGeometry(1,6,5),fxB=new T.BoxGeometry(1,1,1),fxCyl=new T.CylinderGeometry(.5,.5,1,8),fxM={};
const isSmokeCol=c=>c===0xb4bac4||c===0xb0b6c0||c===0xb8bec8||c===0x8a909a||c===0x8a8578;
const fxMat=c=>fxM[c]||(fxM[c]=new T.MeshBasicMaterial(isSmokeCol(c)?{color:c,transparent:true,opacity:.24,depthWrite:false}:{color:c}));
function mkCaseMesh(hull){const g=new T.Group();
 if(hull){
  const body=new T.Mesh(fxCyl,fxMat(0xc82820));body.scale.set(.024,.048,.024);body.position.y=.008;g.add(body);
  const brass=new T.Mesh(fxCyl,fxMat(0xe2bc48));brass.scale.set(.026,.022,.026);brass.position.y=-.022;g.add(brass);
  const rim=new T.Mesh(fxCyl,fxMat(0xf0cc58));rim.scale.set(.029,.004,.029);rim.position.y=-.032;g.add(rim);
  const mouth=new T.Mesh(fxCyl,fxMat(0x18181a));mouth.scale.set(.020,.003,.020);mouth.position.y=.032;g.add(mouth);
 }else{
  const body=new T.Mesh(fxCyl,fxMat(0xe2bc48));body.scale.set(.014,.034,.014);g.add(body);
  const neck=new T.Mesh(fxCyl,fxMat(0xd4ac36));neck.scale.set(.011,.012,.011);neck.position.y=.020;g.add(neck);
  const rim=new T.Mesh(fxCyl,fxMat(0xf2ce5a));rim.scale.set(.016,.004,.016);rim.position.y=-.017;g.add(rim);
  const mouth=new T.Mesh(fxCyl,fxMat(0x18181a));mouth.scale.set(.009,.003,.009);mouth.position.y=.026;g.add(mouth);
 }
 return g}
let gvy=0,gvyv=0,gvx=0,gvxv=0,recP=0,recY=0,barrelHeat=0,smokeAcc=0,actF=0;
function fxAdd(box,c,x,y,z,vx,vy,vz,life,sx,sy,sz,grav,bounce){if(FXP.length>180){const o=FXP.shift();scene.remove(o.m)}
 let m;if(box===2||box===3){m=mkCaseMesh(box===3)}else{const geo=box?fxB:fxSph;m=new T.Mesh(geo,fxMat(c))}
 m.position.set(x,y,z);m.scale.set(sx,sy||sx,sz||sx);if(box)m.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6);scene.add(m);
 FXP.push({m,vx,vy,vz,t:life,l:life,sx,sy:sy||sx,sz:sz||sx,g:grav||0,b:bounce||0,rx:(Math.random()-.5)*26,ry:(Math.random()-.5)*26,rz:(Math.random()-.5)*26,box,smk:isSmokeCol(c)&&!box})}
function fxTick(dt){for(let i=FXP.length-1;i>=0;i--){const p=FXP[i],m=p.m;p.t-=dt;if(p.t<=0){scene.remove(m);FXP.splice(i,1);continue}
 p.vy-=p.g*dt;m.position.x+=p.vx*dt;m.position.y+=p.vy*dt;m.position.z+=p.vz*dt;
 if(p.b){const gy=H(m.position.x,m.position.z)+.02;if(m.position.y<gy){m.position.y=gy;p.vy*=-p.b;p.vx*=.62;p.vz*=.62;p.rx*=.55;p.ry*=.55;p.rz*=.55;if(Math.abs(p.vy)<.35){p.vy=0;p.g=0;p.vx=p.vz=0;p.rx=p.ry=p.rz=0}}}
 if(p.box){m.rotation.x+=p.rx*dt;m.rotation.y+=p.ry*dt;m.rotation.z+=(p.rz||0)*dt}
 const k=p.smk?(.65+(1-p.t/p.l)*1.15)*Math.min(1,p.t/(p.l*.25)):Math.min(1,p.t/(p.l*.32));m.scale.set(p.sx*k,p.sy*k,p.sz*k)}}
const vb=()=>{const sy=Math.sin(yaw),cy=Math.cos(yaw),sp=Math.sin(pitch),cp=Math.cos(pitch);return{f:[-sy*cp,sp,-cy*cp],r:[cy,0,-sy],u:[sy*sp,cp,cy*sp]}};
function ejectCase(A,burst){const{f,r,u}=vb(),q=Math.random,hull=A.cs==='hull',lat=.18*(1-adsLerp*.55),up=-.06*(1-adsLerp*.45);
 const x=P.x+f[0]*.44+r[0]*lat+u[0]*up,y=P.y+f[1]*.44+r[1]*lat+u[1]*up,z=P.z+f[2]*.44+r[2]*lat+u[2]*up;
 const s1=1.85+q()*1.15,s2=1.55+q()*.85,n=burst?(q()-.5)*1.6:0;
 const vx=r[0]*s1+u[0]*s2-f[0]*(.25+q()*.25)+n,vy=r[1]*s1+u[1]*s2-f[1]*.25,vz=r[2]*s1+u[2]*s2-f[2]*(.25+q()*.25)+n;
 // Cohesive spinning 3D rimmed brass casing (box=2) or two-tone 12ga crimson/brass shotgun hull (box=3)
 fxAdd(hull?3:2,0xe2bc48,x,y,z,vx,vy,vz,3.2,1,1,1,9.4,.42);
 // Subtle translucent breech smoke wisp escaping from the open ejection port
 if(!burst)fxAdd(0,0xb4bac4,x+r[0]*.04,y+u[1]*.02,z+r[2]*.04,r[0]*.55+(q()-.5)*.2,u[1]*.48+.22,r[2]*.55+(q()-.5)*.2,.26,.018,.018,.018,-.45)}
function dropMag(){const{f,r,u}=vb(),q=Math.random;fxAdd(1,0x1c1e21,P.x+f[0]*.48-u[0]*.28+r[0]*.05,P.y+f[1]*.48-u[1]*.28,P.z+f[2]*.48-u[2]*.28+r[2]*.05,r[0]*.35+(q()-.5)*.35,-.45,r[2]*.35+(q()-.5)*.35,2.4,.052,.17,.074,9.2,.28)}
function hitFx(x,y,z,flesh,at,pel,crit){const r=Math.random,n=pel>2?3:6;
 if(flesh){for(let i=0;i<(crit?n+4:n);i++)fxAdd(0,crit&&i%2?0xff2828:0xa01818,x,y,z,(r()-.5)*(crit?4.4:3.2),r()*(crit?3.4:2.6)+.5,(r()-.5)*(crit?4.4:3.2),.48,crit?.044:.036,crit?.044:.036,crit?.044:.036,9)}
 else{for(let i=0;i<n;i++)fxAdd(0,at==='ammo_ap'?0x9fd0ff:0xffd468,x,y,z,(r()-.5)*5.8,r()*3.4+.7,(r()-.5)*5.8,.26,.024,.024,.024,6.5);for(let i=0;i<(pel>2?2:4);i++)fxAdd(0,0x8a8578,x,y,z,(r()-.5)*1.4,r()*1.4+.35,(r()-.5)*1.4,.6,.075,.075,.075,-.65)}
 if(at==='ammo_inc')for(let i=0;i<n+3;i++)fxAdd(0,r()<.5?0xff6a1a:0xffc040,x,y,z,(r()-.5)*2.7,r()*2.7+.85,(r()-.5)*2.7,.52,.052,.052,.052,-1.5)}
function makeFlash(){const g=new T.Group();
 const mOuter=new T.MeshBasicMaterial({color:0xffb848,transparent:true,opacity:.92,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide});
 const mCore=new T.MeshBasicMaterial({color:0xfffbe8,transparent:true,opacity:.98,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide});
 // Incandescent white-hot inner plasma core + primary Mach shock cone
 g.add(new T.Mesh(new T.SphereGeometry(.062,8,6),mCore));
 g.add(new T.Mesh(new T.SphereGeometry(.095,8,6),mOuter));
 const cn=new T.Mesh(new T.ConeGeometry(.072,.42,8),mOuter);cn.rotation.z=-Math.PI/2;cn.position.x=.21;g.add(cn);
 const cnIn=new T.Mesh(new T.ConeGeometry(.038,.26,7),mCore);cnIn.rotation.z=-Math.PI/2;cnIn.position.x=.13;g.add(cnIn);
 // 6 radial star-burst gas jets + 2 horizontal compensator/brake side jets
 for(let i=0;i<6;i++){const pv=new T.Group(),sp=new T.Mesh(new T.ConeGeometry(.026,.34,5),mOuter);sp.position.y=.17;pv.add(sp);pv.rotation.x=i*1.0472;g.add(pv)}
 const ring=new T.Mesh(new T.TorusGeometry(.085,.014,6,12),mOuter);ring.rotation.y=Math.PI/2;ring.position.x=.06;g.add(ring);
 g.userData.m=mOuter;g.userData.mc=mCore;g.userData.ring=ring;return g}
function ignite(a){const b=BURN.find(x=>x.a===a);if(b)b.t=4;else BURN.push({a,t:4,k:.3})}
function burnTick(dt){for(let i=BURN.length-1;i>=0;i--){const b=BURN[i],a=b.a;if(a.hp<=0||b.t<=0){BURN.splice(i,1);continue}b.t-=dt;b.k-=dt;
 const p=a.m&&a.m.position?a.m.position:a,r=Math.random;
 if(r()<dt*22)fxAdd(0,r()<.5?0xff6a1a:0xffc040,p.x+(r()-.5)*.5,(p.y||0)+.4+r()*1.1,p.z+(r()-.5)*.5,(r()-.5)*.4,1+r(),(r()-.5)*.4,.45,.09,.09,.09,-1);
 if(b.k<=0){b.k=.5;shoot(a,4,'burn')}}}
function gunKick(A){const q=Math.random;
 gzv=Math.min(7.5,gzv+A.kb*(.92+q()*.22));
 grv=Math.min(13,grv+A.ku*(.85+q()*.35));
 gvyv=Math.min(2.4,gvyv+A.kb*.32*(.85+q()*.3));
 gvxv+=(q()-.38)*A.ky*.45;
 gyv+=(q()-.46)*A.ky;
 grov+=(q()-.42)*A.kr;
 const cPitch=A.cam*(.85+q()*.3)*(1-adsLerp*.28),cYaw=(q()-.48)*A.cam*.65*(1-adsLerp*.28);
 camK=Math.min(.095,camK+cPitch);camY+=cYaw;camR+=(q()-.45)*A.cam*.95;
 pitch=Math.min(1.3,pitch+cPitch*.55);yaw+=cYaw*.45;
 recP=Math.min(.22,recP+cPitch*.55);recY+=cYaw*.45;
 if(A.sh)shake=Math.max(shake,A.sh);
 actD=actT=A.ad;actF=0;barrelHeat=Math.min(1.8,barrelHeat+.45);
 ejDone=!(A.ej==='a'||A.ej==='act');cylT+=1.0472}
function gunPose(dt,mv,b,bx){const id=vmId,A=ANIM[id]||ANIM.pistol,v=VMS[id],s=SL[sel],md=Math.min(dt,.04),U=vmM.userData,kk=A.sp[0],cc=2*Math.sqrt(kk)*A.sp[1];
 gzv+=(-kk*gz-cc*gzv)*md;gz+=gzv*md;
 grv+=(-kk*gr-cc*grv)*md;gr+=grv*md;
 gvyv+=(-kk*1.15*gvy-cc*1.05*gvyv)*md;gvy+=gvyv*md;
 gvxv+=(-kk*gvx-cc*gvxv)*md;gvx+=gvxv*md;
 gyv+=(-kk*gy-cc*gyv)*md;gy+=gyv*md;
 grov+=(-kk*gro-cc*grov)*md;gro+=grov*md;
 gz=Math.max(-.035,Math.min(gz,.22));gr=Math.max(-.08,Math.min(gr,.48));gvy=Math.max(-.02,Math.min(gvy,.045));
 // Smooth muscle recovery after burst/shot finishes
 if(fireCd<=0&&!fireHeld&&(recP>1e-4||Math.abs(recY)>1e-4)){
  const rp=recP*Math.min(1,dt*5.5),ry=recY*Math.min(1,dt*5.5);
  pitch=Math.max(-1.3,pitch-rp);yaw-=ry;recP-=rp;recY-=ry;
 }
 if(actT>0)actT=Math.max(0,actT-dt);invT=Math.max(0,invT-dt);drawT=Math.max(0,drawT-dt);
 const ap=actT>0?1-actT/actD:1;if(!ejDone&&ap>=A.ep){ejDone=true;ejectCase(A)}
 let px=gvx*(1-adsLerp*.55),py=gvy*(1-adsLerp*.55),pz=0,rx=0,rz=0,back=0,lift=0,mgo=0,mgv=true,spin=0,cylOut=0,trigPull=0,rackHand=0;
 if(actT>0){
  trigPull=tri(ap,.08,.28,.55);
  if(A.a==='slide'){
   // Fast blowback (0..20%), rear buffer dwell (20..34%), rapid return (34..78%) + bolt-bounce micro-rebound (78..94%)
   back=ap<.78?tri(ap/.78,.24,.42,1):tri((ap-.78)/.16,.4,.6,1)*.14;
   if(ap>=.76&&!(actF&1)){actF|=1;gzv-=A.kb*.16;grv-=A.ku*.11}
  }else if(A.a==='pump'){
   // Stage 1 blast (0..16%), Stage 2 forceful pump back (16..52%), Stage 3 slam forward (52..88%)
   const pp=Math.max(0,(ap-.14)/.76);
   back=tri(pp,.36,.52,1);
   rz+=back*.16*(1-adsLerp*.45);rx-=back*.07*(1-adsLerp*.45);py-=back*.018;
   if(ap>=.22&&!(actF&1)){actF|=1;blip(320,.03,'triangle')}
   if(ap>=.72&&!(actF&2)){actF|=2;gzv-=.45;grv-=.35;blip(480,.028,'square')}
  }else if(A.a==='bolt'){
   // 4-stage manual bolt cycle: lift handle (14..32%), pull back & eject (32..58%), push forward (58..82%), cam down (82..98%)
   lift=tri(ap,.14,.74,.92);
   back=tri(Math.max(0,(ap-.22)/.62),.32,.62,1);
   rz+=lift*.18*(1-adsLerp*.4);rx+=back*.08*(1-adsLerp*.4);py-=lift*.015;
   if(ap>=.18&&!(actF&1)){actF|=1;blip(540,.025,'triangle')}
   if(ap>=.78&&!(actF&2)){actF|=2;gzv-=.38;blip(620,.03,'square')}
  }else if(A.a==='hammer'){
   back=ap<.22?tri(ap/.22,.6,.85,1):0;
  }
 }
 const empty=!s||(s.mag||0)<=0;
 if(reloadT>0&&reloadS===s){const p=1-reloadT/reloadD,e0=Math.min(1,p/.13,(1-p)/.12),e=e0*e0*(3-2*e0),rk=A.rk;
  if(rk==='mag'){py+=-.09*e;px+=-.035*e;rx+=.24*e;rz+=-.46*e+Math.sin(p*18)*.016*e;
   const o=Math.max(0,Math.min(1,(p-.16)/.22)),i=Math.max(0,Math.min(1,(p-.48)/.18));
   if(p<.38)mgo=o*.58;else if(p<.48)mgv=false;else mgo=.58*(1-i);
   if(p>=.32&&!(rlF&1)){rlF|=1;dropMag();blip(420,.035,'square')}
   if(p>=.65&&!(rlF&2)){rlF|=2;gvyv+=.55;grv+=.65;blip(640,.035,'square')}
   if(p>=.82&&!(rlF&8)){rlF|=8;gzv-=.45;blip(780,.03,'triangle')}
   pz=(p>.61&&p<.73)?.028*Math.sin((p-.61)/.12*Math.PI):0;
   rackHand=p>.74&&p<.95?tri((p-.74)/.21,.35,.55,1):0;
   if(A.a==='slide')back=empty?(p<.82?1:Math.max(0,1-(p-.82)/.08)):rackHand}
  else if(rk==='shells'){py+=-.11*e;px+=-.03*e;rx+=.32*e;rz+=.52*e;const ph=Math.max(0,Math.min(1,(p-.14)/.72)),pu=ph>0&&ph<1?Math.max(0,Math.sin(ph*Math.PI*5)):0;pz=.032*pu;py-=.022*pu;if(pu>.96&&!(rlF&2)){rlF|=2;gvyv+=.25;blip(520,.025,'square')}else if(pu<.2)rlF&=~2;back=tri(Math.max(0,(p-.85)/.13),.42,.58,1);if(p>=.88&&!(rlF&8)){rlF|=8;blip(460,.03,'triangle')}}
  else if(rk==='bolt'){py+=-.09*e;rx+=.22*e;rz+=.36*e;lift=tri(p,.16,.78,.88);back=tri(Math.max(0,(p-.12)/.76),.16,.8,1);const c2=p>.34&&p<.68?Math.max(0,Math.sin((p-.34)/.34*Math.PI*2)):0;pz=.026*c2;py-=.02*c2}
  else if(rk==='cyl'){py+=-.1*e;px+=-.04*e;rz+=-.65*e;rx+=.28*e+.42*tri(p,.12,.22,.34);cylOut=tri(p,.12,.78,.9);if(p>=.2&&!(rlF&4)){rlF|=4;for(let i=0;i<6;i++)ejectCase(A,1)}spin=Math.max(0,Math.min(1,(p-.28)/.44))*12.57;rz+=.32*tri(Math.max(0,(p-.84)/.12),.5,.5,1)}}
 else if(A.a==='slide'&&empty)back=Math.max(back,1);
 if(drawT>0){const k=drawT/.38,e=k*k;py-=e*.28;rx-=e*.62;px+=e*.04}
 if(invT>0){const si=Math.sin(Math.PI*(1-invT/.5));rz+=si*.3;py-=si*.04;rx+=si*.1}
 const sc=v[0],sightY=(U&&U.sightY)||IRON_SIGHT_Y[id]||.25,mods=s&&gunMods(s),hasOptic=!!(mods&&(mods.sight==='holo'||mods.sight==='scope8x'));
 const targetZ=hasOptic?(id==='pistol'||id==='revolver'?-.34:-.23):(id==='pistol'||id==='revolver'?-.36:id==='ak'?-.21:id==='smg'?-.23:-.25);
 const targetY=-sightY*sc,adsX=-v[1]*VK*adsLerp,adsY=(targetY-v[2])*adsLerp,adsZ=(targetZ-v[3])*adsLerp,hipK=1-adsLerp;
 const cr=$('cross');if(cr)cr.style.opacity=adsLerp>.05?String(Math.max(0,+(1-adsLerp*1.15).toFixed(2))):'';
 vmP.position.set(v[1]*VK+adsX+swX*(1-adsLerp*.9)+bx*(1-adsLerp*.88)+px*hipK+gvx*adsLerp*.35+vmG.x,v[2]+adsY+swY*(1-adsLerp*.9)+b*(1-adsLerp*.88)+py*hipK+gvy*adsLerp*.35+Math.sin(age*1.7)*.001*(1-adsLerp*.8)+vmG.y,v[3]+adsZ+gz*(1-adsLerp*.45)+pz+vmG.z);
 vmP.rotation.set(gr*(1-adsLerp*.5)+rx*hipK+swY*.85*(1-adsLerp*.85),gy*(1-adsLerp*.5)-swX*.85*(1-adsLerp*.85),gro*(1-adsLerp*.55)+rz*hipK);
 if(U.act){const ab=U.act.userData.b;U.act.position.x=ab[0]-back*A.ab;if(A.a==='bolt')U.act.rotation.x=-lift*1.18;else if(A.a==='hammer')U.act.rotation.z=back*.62}
 if(U.mag){U.mag.visible=mgv;U.mag.position.set(A.md[0]*mgo,A.md[1]*mgo,0)}
 // Left support hand animation: pump forend stroke, mag grab/slap/rack, shell feed, cylinder swing, and recoil wrist flex
 if(vmP.userData.lH&&vmP.userData.lH.userData.base){const lH=vmP.userData.lH,lb=lH.userData.base;
  let lx=lb[0],ly=lb[1]-adsLerp*.018,lz=lb[2];
  if(A.a==='pump'&&actT>0)lz+=back*A.ab*sc;
  if(reloadT>0&&reloadS===s){
   if(A.rk==='mag'){
    if(rackHand>0){lx+=.025*rackHand;ly+=.055*rackHand;lz+=(.12+back*.08)*rackHand}
    else{ly-=mgo*.24-pz*1.2;lz+=mgo*.09}
   }else if(A.rk==='shells'){ly+=pz*2.1-.035;lz+=.065;lx+=.018}
   else if(A.rk==='cyl'){lx+=cylOut*.065;ly-=cylOut*.032}
  }
  lH.position.set(lx,ly,lz);
  lH.rotation.x=(id==='pistol'||id==='revolver'?.24:.08)+gr*.22+rackHand*.25;
 }
 // Right trigger hand animation: articulated trigger finger pull, bolt-action knob reach, and wrist shock absorption
 if(vmP.userData.rH&&vmP.userData.rH.userData.base){const rH=vmP.userData.rH,rb=rH.userData.base;
  const boltK=A.a==='bolt'?Math.max(lift,back):0;
  rH.position.set(rb[0]+boltK*.028,rb[1]-adsLerp*.035+boltK*.062,rb[2]+adsLerp*.04-boltK*.055+(A.a==='bolt'?back*.085:0));
  rH.rotation.x=.18+gr*.26-boltK*.35;
  if(rH.userData.trigF){rH.userData.trigF.rotation.x=trigPull*.42;rH.userData.trigF.position.z=-.012+trigPull*.009}
 }
 if(U.cyl){cylR+=(cylT-cylR)*Math.min(1,dt*20);U.cyl.rotation.x=cylR+spin;const cb=U.cyl.userData.b||[.01,.172,0];U.cyl.position.z=cb[2]+cylOut*.078;U.cyl.position.y=cb[1]-cylOut*.025}
 // Multi-layered attachment-aware 3D muzzle flash + lingering hot barrel smoke wisps
 if(barrelHeat>0){barrelHeat=Math.max(0,barrelHeat-dt);if((smokeAcc+=dt)>.09){smokeAcc=0;const{f,r,u}=vb(),mx=P.x+f[0]*.68+r[0]*(.15*(1-adsLerp*.88))-u[0]*.09,my=P.y+f[1]*.68-u[1]*.09,mz=P.z+f[2]*.68+r[2]*(.15*(1-adsLerp*.88))-u[2]*.09;fxAdd(0,0xb0b6c0,mx,my,mz,(Math.random()-.5)*.12,.32+Math.random()*.18,(Math.random()-.5)*.12,.42,.024*Math.min(1,barrelHeat),.024*Math.min(1,barrelHeat),.024*Math.min(1,barrelHeat),-.35)}}
 const fl=U.fl;if(fl){const on=flashT>0;fl.visible=on;if(on){U.fm.color.setHex(flashCol);const brk=mods&&mods.barrel==='muzzle_brake',bst=mods&&mods.barrel==='muzzle_boost';const q=Math.min(1,flashT/A.fl*1.35)*flashK*A.fs*.48/v[0];fl.scale.set(q*(bst?1.65:brk?.95:1.25),q*(brk?1.15:1),q*(brk?1.68:1));fl.rotation.x=flashR;fl.position.set(A.mz[0]+(bst?.08:brk?.05:0),A.mz[1],0);if(fl.userData.ring)fl.userData.ring.scale.setScalar(.8+(1-flashT/A.fl)*.9)}}}
function shoot(a,dmg,ty){if(!a||a.hp<=0)return;
 if(a.k==='raider'||a.k==='settler'){underFire(a,P.x,P.z,P.y-1.7);let ak=a.armorK||1,hv=a.heavy?.6:1;
  if(ty==='ammo_hp'){ak=Math.max(.35,1-(1-ak)*1.7);hv=a.heavy?.5:1}else if(ty==='ammo_ap'){ak=1-(1-ak)*.15;hv=a.heavy?.9:1}else if(ty==='burn'){ak=1;hv=1}
  a.hp-=dmg*(a.k==='raider'?foeMit(hv,ak):hv*ak);if(ty==='ammo_inc')ignite(a);if(a.k==='raider')alertRaiders(a,P.x,P.z);
  if(a.k==='settler'){const was=a.aggro>0;aggroSettler(a,35);if(a.hp<=0)killSettler(a);else if(!was&&ty!=='burn')say('The settler comes for you.')}return}
 a.hp-=ty==='burn'?dmg/2:dmg/8;if(ty==='ammo_inc')ignite(a);if(a.hp<=0)return killAnimal(a,true);if(a.k==='deer'){a.flee=6;a.fleeX=P.x;a.fleeZ=P.z}else{a.aggro=12;alertWolfPack(a)}}
function ensureAmmo(){if(cnt(ammoSel)>0)return true;for(const k of AMMO_IDS)if(cnt(k)>0){ammoSel=k;say('Switched to '+AMMO[k].n+' rounds.');return true}return false}
function fire(){const s=gunOf();if(!s||dead||open||chOpen||attOpen||fireCd>0||reloadT>0)return;const it=ITEMS[s.id],st=gunStats(s),g={...it.gun,dmg:st.dmg,rate:st.rate,spread:st.spread,range:st.range},AN=ANIM[s.id]||ANIM.pistol;
 if(!(s.mag>0)){if(ensureAmmo())reload();else{say('Out of ammo.');fireCd=.3;blip(900,.02,'square')}return}
 const at=s.at||'ammo',A=AMMO[at]||AMMO.ammo,dm=g.dmg*A.dm;
 s.mag--;fireCd=g.rate;flashT=st.silent?0:AN.fl;flashK=.85+Math.random()*.35;flashR=Math.random()*6.28;flashCol=A.fc;muzzle.color.setHex(A.fc);
 {const rk=st.recoilK;gunKick(rk===1?AN:{...AN,kb:AN.kb*rk,ku:AN.ku*rk,ky:AN.ky*rk,kr:AN.kr*rk,cam:AN.cam*rk,sh:AN.sh?AN.sh*rk:AN.sh})}
 const effSpread=g.spread*(1+bloom);bloom=Math.min(1.4,bloom+(g.auto?.16:.24)*st.recoilK);
 if(st.silent){blip(AN.f*.52,.032,'sine');blip(180,.02,'triangle')}else{blip(AN.f,.055,'sawtooth');blip(AN.f*.46,.095,'square');blip(78,.07,'triangle');scareDeerNear(P.x,P.z,48)}
 S.energy=Math.max(0,S.energy-.22);const ox=P.x,oy=P.y,oz=P.z;
 {const{f,r,u}=vb(),lat=.18*(1-adsLerp*.65),dn=(.11+.03*adsLerp),mx=ox+f[0]*.72+r[0]*lat-u[0]*dn,my=oy+f[1]*.72-u[1]*dn,mz=oz+f[2]*.72+r[2]*lat-u[2]*dn,smkSc=(1-adsLerp*.55);
  for(let i=0;i<(st.silent?2:3);i++)fxAdd(0,i?0x8a909a:0xb8bec8,mx+f[0]*(i*.09)+r[0]*.03,my+f[1]*(i*.09),mz+f[2]*(i*.09)+r[2]*.03,f[0]*(1.4+i*.5)+r[0]*.35+(Math.random()-.5)*.25,f[1]*1.2+.28+Math.random()*.18,f[2]*(1.4+i*.5)+r[2]*.35+(Math.random()-.5)*.25,.24+i*.05,(.016+i*.005)*smkSc,(.016+i*.005)*smkSc,(.016+i*.005)*smkSc,-.38);
  if(!st.silent)for(let i=0;i<3;i++)fxAdd(0,0xffdc78,mx,my,mz,f[0]*(4+Math.random()*3)+(Math.random()-.5)*1.4,f[1]*4+(Math.random()-.3)*1.4,f[2]*(4+Math.random()*3)+(Math.random()-.5)*1.4,.12,.009,.009,.009,3.5)}
 let broke=false;if(!ch('inf')&&--s.dur<=0){const bm=s.mods;SL[sel]=null;broke=true;if(bm)for(const k of['sight','barrel','under'])if(bm[k]){if(!give(bm[k],1,1))tossItemFromPlayer(bm[k],1)}}
 const cands=things.filter(o=>{const ex=o.position.x-ox,ez=o.position.z-oz;return o.visible!==false&&ex*ex+ez*ez<(g.range+6)**2});
 let anyHit=false,anyCrit=false,anyKill=false;
 for(let p=0;p<g.pellets;p++){const yw=yaw+(Math.random()-.5)*2*effSpread,pt=pitch+(Math.random()-.5)*2*effSpread,cp=Math.cos(pt),dx=-Math.sin(yw)*cp,dy=Math.sin(pt),dz=-Math.cos(yw)*cp;
  ray.set(new T.Vector3(ox,oy,oz),new T.Vector3(dx,dy,dz));ray.far=g.range;
  let ho=null,hd=g.range,hp1=null,ho2=null,hd2=0,hp2=null;
  for(const h of ray.intersectObjects(cands,true)){let o=h.object;while(o&&!o.userData.k)o=o.parent;if(!o||o.userData.k==='bush'||o.userData.k==='hemp'||o.userData.k==='drop'||(o.userData.a&&o.userData.a.hp<=0)||(o.userData.k==='barrel'&&o.userData.uses!==undefined&&o.userData.uses<=0))continue;
   if(!ho){ho=o;hd=h.distance;hp1=h.point;if(at!=='ammo_ap'||!ho.userData.a)break}else if(o!==ho&&o.userData.a){ho2=o;hd2=h.distance;hp2=h.point;break}}
  let end=hd;const lim=ho2?hd2:hd,bd=blockDist(ox,oy,oz,dx,dy,dz,lim);
  if(bd<lim){if(bd<hd){ho=null;ho2=null;hd=bd;end=bd}else{ho2=null;end=bd}}else end=lim;
  if(ho&&ho.userData.a){
   const a=ho.userData.a,hy=hp1?hp1.y:(oy+dy*hd),relY=hy-(ho.position.y||a.y||0);
   const isHuman=a.k==='raider'||a.k==='settler';
   const crit=isHuman?relY>=1.38:(relY>=(a.k==='wolf'?.52:.72));
   const limb=isHuman&&relY<.65;
   const mult=crit?1.75:limb?.8:1;
   if(limb&&a.hp>0)a.back=Math.max(a.back||0,.25);
   const wasAlive=a.hp>0;
   shoot(a,dm*mult,at);
   anyHit=true;if(crit)anyCrit=true;if(wasAlive&&a.hp<=0)anyKill=true;
   hitFx(ox+dx*hd,oy+dy*hd,oz+dz*hd,true,at,g.pellets,crit);
  }else if(ho&&ho.userData.k==='barrel'){
   if(ho.userData.uses==null)ho.userData.uses=2;
   if(ho.userData.uses>0){const raw=barrelLoot(ho.userData.kind);for(const q in raw)if(raw[q]){const n=q==='scrap'?Math.max(raw[q],dropN(raw[q])):dropN(raw[q]);if(n&&room(q,n))give(q,n)}RT.scavenge+=.28;bumpHeat(.05);if(--ho.userData.uses<=0)remove(ho)}anyHit=true;
   hitFx(ox+dx*hd,oy+dy*hd,oz+dz*hd,false,at,g.pellets,false);
  }else if(end<g.range-.05)hitFx(ox+dx*end,oy+dy*end,oz+dz*end,false,at,g.pellets,false);
  if(ho2&&ho2.userData.a){
   const a2=ho2.userData.a,hy2=hp2?hp2.y:(oy+dy*hd2),relY2=hy2-(ho2.position.y||a2.y||0);
   const crit2=(a2.k==='raider'||a2.k==='settler')?relY2>=1.38:relY2>=.55;
   const wasAlive2=a2.hp>0;
   shoot(a2,dm*.65*(crit2?1.65:1),at);
   anyHit=true;if(crit2)anyCrit=true;if(wasAlive2&&a2.hp<=0)anyKill=true;
   hitFx(ox+dx*hd2,oy+dy*hd2,oz+dz*hd2,true,at,g.pellets,crit2);
  }
  if(p<3||g.pellets<3)tracer(ox,oy,oz,dx,dy,dz,end,yw,A.tc)}
 if(anyHit){hitMark(anyCrit,anyKill);if(anyCrit)blip(1180,.038,'sine');else blip(780,.025,'triangle')}
 ray.far=4.5;if(broke)say(it.n+' broke!');render()}
function reload(){const s=gunOf();if(!s||dead||reloadT>0)return;const g={...ITEMS[s.id].gun,mag:gunMagMax(s),reload:gunStats(s).reload},ld=s.at||'ammo';
 if((s.mag||0)<=0||ld===ammoSel){if(g.mag-(s.mag||0)<=0)return say('Magazine full.')}
 if(!ensureAmmo())return say('No ammo.');
 if((s.mag||0)>0&&(s.at||'ammo')===ammoSel&&g.mag-(s.mag||0)<=0)return say('Magazine full.');
 reloadT=reloadD=g.reload;reloadS=s;rlF=0;say(ammoSel==='ammo'?'Reloading...':'Reloading '+AMMO[ammoSel].n+'...')}
function reloadDone(){const s=reloadS;reloadT=0;reloadS=null;if(!s)return;const g={...ITEMS[s.id].gun,mag:gunMagMax(s)},ld=s.at||'ammo',ty=ammoSel,sw=(s.mag||0)>0&&ld!==ty,base=sw?0:(s.mag||0),m=Math.min(g.mag-base,cnt(ty));
 if(m<=0){render();return}take(ty,m);
 if(sw){const old=s.mag;if(!give(ld,old,1)){give(ty,m,1);say('Inventory full.');render();return}}
 s.mag=base+m;s.at=ty;render()}
function cycleAmmo(){const av=AMMO_IDS.filter(k=>cnt(k)>0||k===ammoSel);if(av.length<2){say('No other ammo types in your bag.');return}
 ammoSel=av[(av.indexOf(ammoSel)+1)%av.length];const s=gunOf();invT=.5;
 say('Ammo: '+AMMO[ammoSel].n+(s&&(s.mag||0)>0&&(s.at||'ammo')!==ammoSel?' - press R to load it.':''))}

// Holding the button keeps swinging melee weapons and tools at their own rate.
function holdSwing(it){const t=target(),k=t&&t.userData.k;
 if(t&&!t.userData.a&&(k==='crate'||k==='drop'||k==='recycler'||(k==='dev'&&!(t.userData.d&&t.userData.d.t==='tc'&&t.userData.d.owner!=='you')))){fireHeld=false;return}
 if(it.mel){if(mCd<=0)act()}else if(toolCd<=0)act()}
function trigger(down,useKey){if(!down){fireHeld=false;return}if(dead||open||chOpen||attOpen)return;const s=SL[sel];
 if(useKey){const o=target()||closestUse();if(o&&!o.userData.a){act();return}if(canDrink()){act();return}}
 if(s&&s.id==='launcher'){fireHeld=true;fireRocketPlayer();return}
 if(s&&ITEMS[s.id].nade){if(throwCd<=0)useSlot(sel);return}
 const gun=gunOf();if(!gun){const hi=s&&ITEMS[s.id];if(hi&&(hi.mel||hi.tool))fireHeld=true;act();return}
 const o=target();if(o&&(o.userData.k==='crate'||o.userData.k==='dev'||o.userData.k==='drop'||o.userData.k==='recycler'||o.userData.k==='hemp')){act();return}
 fireHeld=true;fire()}
function combatTick(dt,mv){fireCd=Math.max(0,fireCd-dt);toolCd=Math.max(0,toolCd-dt);kickV=Math.max(0,kickV-dt*7);flashT=Math.max(0,flashT-dt);swing=Math.max(0,swing-dt);mCd=Math.max(0,mCd-dt);bloom=Math.max(0,bloom-dt*(adsLerp>.5?4.2:2.8));fxTick(dt);burnTick(dt);{const dk=Math.exp(-dt*9);camK*=dk;camY*=dk;camR*=dk}
 if(reloadT>0){if(reloadS!==SL[sel]){reloadT=0;reloadS=null}else if((reloadT-=dt)<=0)reloadDone()}
 if(fireHeld&&(open||chOpen||attOpen||dead))fireHeld=false;
 if(fireHeld){const s=SL[sel],it=s&&ITEMS[s.id];if(s&&s.id==='launcher')fireRocketPlayer();else if(it&&it.gun&&it.gun.auto)fire();else if(it&&(it.mel||it.tool))holdSwing(it);else if(!s||!it.gun)fireHeld=false}
 {const hi=heldIt();if(fireHeld&&hi&&hi.tool&&hi.tier===3){engT-=dt;if(engT<=0){engT=.1;blip(hi.n==='Chainsaw'?58+Math.random()*18:42+Math.random()*10,.11,'sawtooth')}}}
 muzzle.intensity=flashT>0?2.5:0;tickAttachmentFX(dt);bobVM(dt,mv)}
const plab2=o=>o.userData.a&&gunOf()?'Shoot '+o.userData.k:plabel(o);
function lootRaider(e){
 if(Math.hypot(P.x-e.x,P.z-e.z)>55)return;
 const r=Math.random,pk=a=>a[r()*a.length|0];
 if(e.warlord){
  give('scrap',28+(r()*22|0));
  give('metal',25+(r()*25|0));
  if(e.gun)give(e.gun,1);
  give('ammo',40+(r()*35|0));
  give(pk(['ammo_ap','ammo_inc','ammo_hp']),16+(r()*16|0));
  give('medkit',1+(r()<.6?1:0));
  give(pk(['c4','satchel']),1);
  give(pk(['semi_body','smg_body','tech','fuse']),1+(r()<.5?1:0));
  give(pk(['gears','pipe','spring','road_sign']),2+(r()*2|0));
  for(const id of['helmet','vest','legs'])if(r()<.65)give(id,1);
  return;
 }
 if(e.camp){
  give('scrap',8+(r()*12|0));
  if(e.gun&&r()<.75)give(e.gun,1);
  give('ammo',14+(r()*20|0));
  if(r()<.45)give(AMMO_IDS[1+(r()*3|0)],8+(r()*10|0));
  give(pk(['blade','rope','sheet','propane','sewing_kit','tarp','fuse','gears','pipe','spring','road_sign','semi_body']),1+(r()<.4?1:0));
  if(r()<.55)give(pk(['medkit','bandage','rations']),1);
  if(e.armr){for(const[f,id]of[['h','helmet'],['v','vest'],['l','legs']])if(e.armr[f]&&r()<.48)give(id,1)}
  if(e.kit&&e.kit!=='melee'&&r()<.65)give(e.kit==='rocket'?'rocket':e.kit,1);
  return;
 }
 if(r()<.7)give('scrap',1+(r()*4|0));if(e.gun){if(r()<.55)give(e.gun,1);const am=(e.ammo||0)+(e.mag||0);if(am>0)give('ammo',Math.max(2,Math.min(40,Math.round(am*.5))))}if(e.armr){for(const[f,id]of[['h','helmet'],['v','vest'],['l','legs']])if(e.armr[f]&&r()<.4)give(id,1)}give('ammo',2+(r()*6|0));if(r()<.2)give(AMMO_IDS[1+(r()*3|0)],3+(r()*8|0));if(e.heavy&&r()<.6)give('metal',3+(r()*4|0));if(r()<.5)give('powder',1+(r()*3|0));if(e.kit&&e.kit!=='melee'&&e.kit!=='rocket'&&r()<.6)give(e.kit,1);if(e.kit==='rocket'){give('rocket',1);if(r()<.2)give('launcher',1)}}
// ===== CHEAT MENU =====
function jumpSettler(n,i){if(!n||n.hp<=0)return say('That settler is gone.');const face=(n.tc&&!n.tc._gone)?n.tc:(n.lot||{x:n.hx,z:n.hz});let x,z;if(n.post){x=n.post.x;z=n.post.z}else{const dx=n.x-face.x,dz=n.z-face.z,d=Math.hypot(dx,dz)||1;x=n.x+dx/d*3.4;z=n.z+dz/d*3.4}P.x=LP.x=x;P.z=LP.z=z;P.y=Math.max(H(x,z),0)+1.7;yaw=Math.atan2(-(face.x-x),-(face.z-z));pitch=-.22;const step=n.bp&&n.bp.length?(n.i+'/'+n.bp.length):'0';const piece=n.bp&&n.bp[n.i]?String(n.bp[n.i][0]).replace(/^stone_/,'').replace(/_/g,' '):'';say('Settler '+(i+1)+' — '+(n.home?'holding the camp.':piece?('farming '+piece+' ('+step+').'):'working the field ('+step+').'))}
function landFix(){if(H(P.x,P.z)<-1.2){P.x=LP.x=SP.x;P.z=LP.z=SP.z}}
function toggleCheat(){if(attOpen)closeAttUI();chOpen=!chOpen;if(chOpen&&open){open=false;curBox=null;pick=null;render()}renderCheat();lookLock(!chOpen&&!open)}
function chBtn(l,on,f){const b=document.createElement('button');b.className='cbn'+(on?' on':'');b.textContent=l;b.onpointerdown=()=>{f();renderCheat()};return b}
function renderCheat(){const p=$('cheat');$('chb').textContent=chOpen?'Close':'Cheats';p.style.display=chOpen?'block':'none';if(!chOpen)return;p.innerHTML='';
 {const g0=document.createElement('div');g0.className='cg';p.appendChild(g0);g0.appendChild(chBtn('Exit',false,()=>{if(chOpen)toggleCheat()}))}
 const sec=t=>{const h=document.createElement('div');h.className='ch2';h.textContent=t;p.appendChild(h)},grid=()=>{const g=document.createElement('div');g.className='cg';p.appendChild(g);return g};
 grid().appendChild(chBtn('Cheats: '+(CH.on?'ON':'OFF'),CH.on,()=>{CH.on=!CH.on;if(!CH.on)landFix()}));
 if(!CH.on){sec('Turn cheats on to use these options.');return}
 const tg=(l,k,after)=>chBtn(l,CH[k],()=>{CH[k]=!CH[k];if(after)after()}),act=(l,f)=>chBtn(l,false,f),giv=(l,f,msg)=>act(l,()=>{f();say(msg)});
 sec('Player');let g=grid();g.append(tg('God mode','god'),tg('Infinite needs','inf'),tg('Peaceful','peace'),tg('Free crafting','free'),tg('Fly','fly',()=>{if(!CH.fly)landFix()}),tg('Super speed','fast'),act('Refill needs',()=>{S.health=S.hunger=S.thirst=S.energy=100;S.warmth=70;say('Needs refilled.')}));
 sec('Time');g=grid();for(const[l,v]of[['Dawn',.27],['Noon',.5],['Dusk',.73],['Midnight',0]])g.appendChild(act(l,()=>{t=v;say('Time set: '+l)}));
 g.appendChild(tg('Freeze time','freeze'));g.appendChild(act('Cycle weather',()=>{const order=['clear','overcast','rain','storm','fog','snow'];wx=order[(order.indexOf(wx)+1)%order.length];wxT=100;say(WXSAY[wx])}));
 sec('Fast-forward');g=grid();for(const v of[1,5,20,60])g.appendChild(chBtn(v+'×',CH.ts===v,()=>CH.ts=v));
 sec('Gather rate');g=grid();for(const v of[1,2,5,10])g.appendChild(chBtn(v+'×',GATHER===v,()=>{GATHER=v;window.__bpGather=v;window.__bpSaveGather&&window.__bpSaveGather(v);say('Gather rate '+v+'×.')}));
 sec('Items');g=grid();
 g.append(giv('Materials',()=>{give('wood',500,1);give('stone',500,1);give('cloth',100,1);give('fiber',100,1);give('ore',200,1);give('metal',200,1);give('leather',60,1);give('crude',100,1);give('fuel',100,1);give('berry',20,1);give('cooked',10,1)},'Materials, cloth, fiber, leather, crude oil & fuel added.'),
   giv('Components (T1-T3)',()=>{give('scrap',250,1);for(const [id,n] of [['blade',15],['rope',15],['sheet',15],['propane',8],['sewing_kit',12],['tarp',12],['fuse',8],['gears',15],['pipe',15],['spring',12],['road_sign',12],['semi_body',5],['smg_body',5],['circuit',10],['tech',8]])give(id,n,1)},'All Tier 1, Tier 2, Tier 3 components & Scrap added.'),
  giv('Attachments',()=>{for(const k in ATT_DEFS)give(k,1,1)},'All weapon attachments added.'),
  giv('Build kits',()=>{for(const t of['wood','stone','metal'])for(const k in PT)give(t+'_'+k,10,1)},'Wood, stone and metal building kits added.'),
  giv('Tool tiers',()=>{for(const k of['hatchet','pickaxe','metal_hatchet','metal_pickaxe','chainsaw','jackhammer'])give(k,1,1)},'Stone, metal and powered tools added.'),
  giv('Devices + tools',()=>{for(const k in DV)give(k,k==='lamp'?10:2,1);give('bed',1,1);give('wire',1,1);give('hatchet',1,1);give('pickaxe',1,1)},'Devices, doors, refinery, pump jack, quarry & bed added.'),
  giv('Guns + armor',()=>{for(const k of['pistol','revolver','shotgun','pump','smg','thompson','sar','rifle','ak','helmet','vest','legs','boots'])give(k,1,1);give('medkit',3,1);give('rations',5,1);give('ammo',200,1);for(const k of AMMO_IDS)if(k!=='ammo')give(k,60,1)},'Guns, armor and ammo added.'),
  giv('Explosives + Tech',()=>{give('sulfur',40,1);give('charcoal',30,1);give('powder',40,1);give('explosives',20,1);give('targeting_computer',5,1);give('cctv',5,1);give('beancan',6,1);give('satchel',4,1);give('c4',2,1);give('rocket',6,1);give('launcher',1,1)},'Explosives, targeting tech, charges & rockets added.'),
  giv('Elite loot',()=>{for(const[id,n]of lootTable(3))give(id,n)},'Elite loot added.'),
  giv('War-Chest loot',()=>{for(const[id,n]of crateLoot(4))give(id,n)},'Raider War-Chest loot added.'),
  act('Clear bag',()=>{SL.fill(null,0,30);pick=null;render();say('Bag cleared.')}));
 sec('Teleport');g=grid();
 g.append(giv('Spawn',()=>{P.x=LP.x=SP.x;P.z=LP.z=SP.z},'Teleported to spawn.'),act('Next monument',()=>{if(!MONS.length)return say('No monuments.');const m=MONS[mi++%MONS.length];P.x=LP.x=m.x;P.z=LP.z=m.z+m.d*C/2+3;say('Teleported: '+m.n)}),act('Next raider camp',()=>{if(!RCAMPS.length)return say('No raider camps.');const m=RCAMPS[rci++%RCAMPS.length];P.x=LP.x=m.x;P.z=LP.z=m.z+m.d*C/2+4;P.y=Math.max(G(P.x,P.z),H(P.x,P.z))+1.7;yaw=Math.atan2(-(m.x-P.x),-(m.z-P.z));pitch=-.15;say('Teleported to '+m.n+' ('+m.raiders.filter(r=>r&&r.hp>0).length+' raiders).')}));
 g.appendChild(act('Next settler',()=>{const L=NP.filter(n=>n.hp>0);if(!L.length)return say('No settlers left.');const n=L[(window.__csi=(window.__csi||0)+1)%L.length];jumpSettler(n,NP.indexOf(n))}));
 sec('World');g=grid();
 g.append(act('Spawn raider',()=>spawnRaider(true)),act('Spawn wolf',()=>{const q=landNear(7,12);if(q){const a=mkAnimal('wolf',q[0],q[1]);if(a)a.aggro=16}}),act('Spawn deer',()=>{const q=landNear(10,20);if(q)mkAnimal('deer',q[0],q[1])}),
  act('Skip to raid dusk',()=>skipToRaid()),act('Start raid now',()=>launchRaid()),
  act('Max heat',()=>{RT.heat=5;RT.blood+=2;RT.build+=4;say('Heat pinned at 5.')}),act('Cool heat',()=>{RT.heat=0;say('Heat cleared.')}),
  act('Respawn camps',()=>{for(const c of RCAMPS){for(const r of c.raiders){if(r.m){scene.remove(r.m);const ti=things.indexOf(r.m);if(ti>=0)things.splice(ti,1)}const ei=EN.indexOf(r);if(ei>=0)EN.splice(ei,1)}c.raiders=[];spawnCampGarrison(c)}say('All Raider Camps respawned & War-Chests restocked.')}),
  act('Kill hostiles',()=>{for(const e of EN)e.hp=-99;for(const w of WV.slice())killAnimal(w,false);say('Hostiles cleared.')}));}
// ===== MINIMAP =====
const MMc=$('mm'),mx=MMc.getContext('2d'),MS=448,MRS=1024,WIN=700,MBG=document.createElement('canvas'),MRD=document.createElement('canvas');MBG.width=MBG.height=MS;
{const g=MBG.getContext('2d'),im=g.createImageData(MS,MS);for(let j=0;j<MS;j++)for(let i=0;i<MS;i++){const h=H((i/MS-.5)*2*B,(j/MS-.5)*2*B);let c;if(h<-.2)c=[20,70,100];else if(h<.8)c=[185,170,120];else{const q=Math.min(1,h/9),bw=biomeW((i/MS-.5)*2*B,(j/MS-.5)*2*B),bc=[0,0,0];for(let k=0;k<4;k++)for(let e=0;e<3;e++)bc[e]+=bw[k]*MMB[k][e];c=[bc[0]+q*40,bc[1]+q*20,bc[2]+q*30]}const o=(j*MS+i)*4;im.data[o]=c[0];im.data[o+1]=c[1];im.data[o+2]=c[2];im.data[o+3]=255}g.putImageData(im,0,0);const ix=x=>((x/(2*B))+.5)*MS,iy=z=>((z/(2*B))+.5)*MS;}
MRD.width=MRD.height=MRS;{const g=MRD.getContext('2d'),k=MRS/(2*B),ix=x=>(x+B)*k,iy=z=>(z+B)*k;g.lineCap='round';g.lineJoin='round';
 const path=pts=>{g.beginPath();g.moveTo(ix(pts[0].x),iy(pts[0].z));for(let i=1;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];g.quadraticCurveTo(ix(a.x),iy(a.z),(ix(a.x)+ix(b.x))/2,(iy(a.z)+iy(b.z))/2)}const l=pts[pts.length-1];g.lineTo(ix(l.x),iy(l.z))};
 for(const pass of[0,1])for(const rd of ROADS){if(!rd.pts||rd.pts.length<2)continue;const tr=rd.kind==='trail';path(rd.pts);if(pass===0){g.setLineDash([]);g.strokeStyle='rgba(40,28,14,.7)';g.lineWidth=tr?4.6:8}else{g.setLineDash(tr?[7,4]:[]);g.strokeStyle=tr?'#c9a96e':'#f3e6b8';g.lineWidth=tr?2.4:5}g.stroke()}
 g.setLineDash([]);for(const m of MONS){const x=ix(m.x),y=iy(m.z);g.fillStyle=m.raiderCamp?'#d92626':'#e6d36a';g.strokeStyle='#2a2112';g.lineWidth=1.5;g.fillRect(x-4,y-4,8,8);g.strokeRect(x-4,y-4,8,8)}}
let mmT=0;
function minimap(){const n=performance.now();if(n-mmT<120)return;mmT=n;mx.fillStyle='#0b3b57';mx.fillRect(0,0,100,100);{const sw=WIN/(2*B)*MS;mx.drawImage(MBG,(P.x/(2*B)+.5)*MS-sw/2,(P.z/(2*B)+.5)*MS-sw/2,sw,sw,0,0,100,100);{const sr=WIN/(2*B)*MRS;mx.drawImage(MRD,(P.x/(2*B)+.5)*MRS-sr/2,(P.z/(2*B)+.5)*MRS-sr/2,sr,sr,0,0,100,100)}}const p=(x,z)=>[(x-P.x)/WIN*100+50,(z-P.z)/WIN*100+50],dot=(x,z,c,r)=>{const q=p(x,z);mx.fillStyle=c;mx.beginPath();mx.arc(q[0],q[1],r,0,6.283);mx.fill()};
 for(const q of MONS)dot(q.x,q.z,q.raiderCamp?'#ff2828':'#f0e040',q.raiderCamp?4.0:3.2);for(const q of fires)dot(q.x,q.z,'#ffb030',2);for(const q of NP)dot(q.x,q.z,q.aggro>0?'#ff5530':'#4aa0ff',2.5);for(const q of EN)dot(q.x,q.z,'#ff3030',2.5);for(const q of WV)dot(q.x,q.z,'#ff9a30',2);for(const d of devs)if(d.t==='tc'&&!d._gone)dot(d.x,d.z,d.owner==='you'?'#e6c340':'#c4552a',d.owner==='you'?3.3:2.1);if(CLAIM)dot(CLAIM.x,CLAIM.z,'#ffffff',3.4);
 for(const m of MK){const q=p(m.x,m.z);mx.fillStyle=m.c;mx.strokeStyle='#fff';mx.lineWidth=1.2;mx.beginPath();mx.arc(Math.max(4,Math.min(96,q[0])),Math.max(4,Math.min(96,q[1])),3,0,6.283);mx.fill();mx.stroke()}
 const q=p(P.x,P.z);mx.save();mx.translate(q[0],q[1]);mx.rotate(-yaw);mx.fillStyle='#fff';mx.beginPath();mx.moveTo(0,-5);mx.lineTo(3.5,4);mx.lineTo(-3.5,4);mx.closePath();mx.fill();mx.restore()}

// ===== FULL MAP =====
const fmW=document.createElement('div');fmW.id='fmap';fmW.className='ui';
fmW.innerHTML='<div id="fmbox"><div id="fmh"><b>Island map</b><span id="fmz">1.0x</span><span class="fmsp"></span><button type="button" id="fmm">📍 Marker</button><button type="button" id="fmc0">Me</button><button type="button" id="fmzo">−</button><button type="button" id="fmzi">+</button><button type="button" id="fmx">Close</button></div><div id="fmcw"><canvas id="fmc"></canvas><div id="fmhint">Scroll or pinch to zoom · drag to pan · tap 📍 Marker, then tap the map (or double-click)</div><div id="fmi"><input id="fmn" maxlength="24" aria-label="Marker name"><span id="fmd"></span><button type="button" id="fmcol">Color</button><button type="button" id="fmdel">Delete</button></div></div><div id="fmk"><i style="background:#fff"></i>You <i style="background:#e6c340"></i>Your cupboard <i style="background:#c4552a"></i>Settler base <i style="background:#4aa0ff"></i>Settler <i style="background:#ff2828"></i>Raider camp <i style="background:#ff3030"></i>Raider <i style="background:#ffb030"></i>Fire <i style="background:#33a8ff"></i>Your markers</div></div>';root.appendChild(fmW);
const fmC=$('fmc'),fmQ=s=>fmW.querySelector(s),fmI=fmQ('#fmi'),fmN=fmQ('#fmn'),fmD=fmQ('#fmd'),fmZl=fmQ('#fmz'),fmHint=fmQ('#fmhint'),fmMb=fmQ('#fmm');
let fmT=0,fmZ=1,fmCx=0,fmCz=0,fmSel=-1,fmAdd=false,HIMAP=null,hiBusy=false,hiRow=0;
const fmS=()=>Math.min(fmC.clientWidth,fmC.clientHeight)/(2*B)*.97*fmZ;
// High-res shaded terrain, built in slices the first time the map opens so it never stalls the game.
function buildHi(){if(HIMAP||hiBusy)return;hiBusy=true;const S=1024,cv=document.createElement('canvas');cv.width=cv.height=S;const g=cv.getContext('2d'),im=g.createImageData(S,S),d=im.data,h=new Float32Array(S*S);hiRow=0;
 const step=()=>{const end=Math.min(S,hiRow+20);for(;hiRow<end;hiRow++)for(let i=0;i<S;i++){const wx=(i/S-.5)*2*B,wz=(hiRow/S-.5)*2*B,y=H(wx,wz),o=(hiRow*S+i)*4;h[hiRow*S+i]=y;let r,gg,b;
   if(y<-.2){const k=Math.max(0,Math.min(1,(-y-.2)/3));r=52-k*42;gg=140-k*92;b=164-k*84;if(y>-.55){const f=(y+.55)/.35*.55;r+=(205-r)*f;gg+=(232-gg)*f;b+=(236-b)*f}}
   else if(y<.8){const k=(y+.2)/1;r=205-k*12;gg=190-k*6;b=134-k*10}
   else{const q=Math.min(1,y/12),bw=biomeW(wx,wz),bc=[0,0,0];for(let k=0;k<4;k++)for(let e=0;e<3;e++)bc[e]+=bw[k]*MMB[k][e];const sk=Math.min(1,(y-.8)/1.2);r=193+(bc[0]+q*46-193)*sk;gg=178+(bc[1]+q*26-178)*sk;b=124+(bc[2]+q*34-124)*sk}
   d[o]=r;d[o+1]=gg;d[o+2]=b;d[o+3]=255}
  if(hiRow<S){if(mapOpen)drawFull();return setTimeout(step,0)}
  for(let j=0;j<S;j++)for(let i=0;i<S;i++){const y=h[j*S+i];if(y<-.2)continue;const a=h[Math.max(0,j-1)*S+Math.max(0,i-1)],c=h[Math.min(S-1,j+1)*S+Math.min(S-1,i+1)],sh=1+Math.max(-.4,Math.min(.4,(c-a)*.2)),o=(j*S+i)*4;d[o]*=sh;d[o+1]*=sh;d[o+2]*=sh}
  g.putImageData(im,0,0);HIMAP=cv;hiBusy=false;if(mapOpen)drawFull()};
 setTimeout(step,0)}
function drawFull(){const cw=fmC.clientWidth,ch=fmC.clientHeight;if(!cw||!ch)return;const g=fmC.getContext('2d'),rs=fmC.width/cw;g.setTransform(rs,0,0,rs,0,0);
 const s=fmS(),X=x=>cw/2+(x-fmCx)*s,Y=z=>ch/2+(z-fmCz)*s;
 const wg=g.createLinearGradient(0,0,0,ch);wg.addColorStop(0,'#0d4666');wg.addColorStop(1,'#082e47');g.fillStyle=wg;g.fillRect(0,0,cw,ch);
 g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(HIMAP||MBG,X(-B),Y(-B),2*B*s,2*B*s);
 const lab=(t,x,y,col,fs)=>{g.font='600 '+(fs||11)+'px sans-serif';g.textAlign='center';g.lineJoin='round';g.lineWidth=3.2;g.strokeStyle='rgba(6,12,20,.9)';g.strokeText(t,x,y);g.fillStyle=col||'#fff';g.fillText(t,x,y)};
 const gs=[50,100,200,250,500].find(v=>v*s>=80)||500;g.strokeStyle='rgba(255,255,255,.11)';g.lineWidth=1;g.beginPath();for(let v=Math.ceil(-B/gs)*gs;v<=B;v+=gs){const x=Math.round(X(v))+.5,y=Math.round(Y(v))+.5;g.moveTo(x,0);g.lineTo(x,ch);g.moveTo(0,y);g.lineTo(cw,y)}g.stroke();
 g.fillStyle='rgba(255,255,255,.55)';g.font='10px sans-serif';g.textAlign='left';for(let v=Math.ceil(-B/gs)*gs;v<=B;v+=gs){g.fillText(v,X(v)+3,ch-4);g.fillText(v,3,Y(v)-3)}
 const rw=Math.max(2.4,Math.min(12,6.5*s));
 for(const pass of[0,1])for(const rd of ROADS){const q=rd.pts;if(!q||q.length<2)continue;const tr=rd.kind==='trail';g.beginPath();g.moveTo(X(q[0].x),Y(q[0].z));for(let i=1;i<q.length-1;i++){const a=q[i],b=q[i+1];g.quadraticCurveTo(X(a.x),Y(a.z),(X(a.x)+X(b.x))/2,(Y(a.z)+Y(b.z))/2)}g.lineTo(X(q[q.length-1].x),Y(q[q.length-1].z));g.lineCap='round';g.lineJoin='round';
  if(pass===0){g.setLineDash([]);g.strokeStyle='rgba(38,26,12,.8)';g.lineWidth=(tr?rw*.55:rw)+2}else{g.setLineDash(tr?[rw*.9,rw*.7]:[]);g.strokeStyle=tr?'#d2b480':'#f4e7b8';g.lineWidth=tr?rw*.5:rw*.78}g.stroke()}
 g.setLineDash([]);
 const dot=(x,z,c,r)=>{g.fillStyle=c;g.beginPath();g.arc(X(x),Y(z),r,0,6.283);g.fill();g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=1;g.stroke()};
 const mr=Math.max(6,Math.min(11,5+s*2));
 for(const m of MONS){const x=X(m.x),y=Y(m.z);if(x<-40||y<-40||x>cw+40||y>ch+40)continue;
  if(m.raiderCamp){const alive=m.raiders?m.raiders.filter(r=>r&&r.hp>0).length:0;g.fillStyle=alive>0?'#d92626':'#7d8087';g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(x,y,mr+1,0,6.283);g.fill();g.stroke();g.fillStyle='#fff';g.font='700 '+(mr+3)+'px sans-serif';g.textAlign='center';g.fillText('☠',x,y+(mr+3)*.35);
   const rt=Math.ceil(m.respawnT||0);lab(String(m.n||'')+(alive>0?' ('+alive+')':' · respawn '+Math.floor(rt/60)+':'+String(rt%60).padStart(2,'0')),x,y-mr-6,'#ffd24a')}
  else{g.fillStyle='#e8c53c';g.strokeStyle='#2a2112';g.lineWidth=2;g.beginPath();g.moveTo(x,y-mr-1);g.lineTo(x+mr+1,y);g.lineTo(x,y+mr+1);g.lineTo(x-mr-1,y);g.closePath();g.fill();g.stroke();lab(String(m.n||''),x,y-mr-6,'#fff')}}
 for(const q of fires)dot(q.x,q.z,'#ffb030',3);
 for(const d of devs)if(d.t==='tc'&&!d._gone)dot(d.x,d.z,d.owner==='you'?'#e6c340':'#c4552a',d.owner==='you'?5.5:4.5);
 for(const q of NP)dot(q.x,q.z,q.aggro>0?'#ff5530':'#4aa0ff',3.5);
 for(const q of EN)dot(q.x,q.z,'#ff3030',3.5);for(const q of WV)dot(q.x,q.z,'#ff9a30',3);
 if(CLAIM)dot(CLAIM.x,CLAIM.z,'#ffffff',4.5);
 MK.forEach((m,i)=>{const x=X(m.x),y=Y(m.z),sel=i===fmSel,z=sel?14:12;g.save();g.translate(x,y);if(sel){g.shadowColor='#fff';g.shadowBlur=14}g.beginPath();g.arc(0,-z*1.5,z*.68,Math.PI*.82,Math.PI*.18);g.lineTo(0,0);g.closePath();g.fillStyle=m.c;g.fill();g.shadowBlur=0;g.strokeStyle='#fff';g.lineWidth=2;g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(0,-z*1.5,z*.26,0,6.283);g.fill();g.restore();
  if(fmZ>=1.25||sel){const dm=Math.round(Math.hypot(m.x-P.x,m.z-P.z));lab(m.n+' · '+dm+' m',x,y-z*2.4,'#fff')}});
 g.save();g.translate(X(P.x),Y(P.z));g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.arc(0,0,14,0,6.283);g.fill();g.rotate(-yaw);g.fillStyle='#fff';g.strokeStyle='#000';g.lineWidth=1.6;g.beginPath();g.moveTo(0,-10);g.lineTo(6.5,8);g.lineTo(0,4.5);g.lineTo(-6.5,8);g.closePath();g.fill();g.stroke();g.restore();
 const vg=g.createRadialGradient(cw/2,ch/2,Math.min(cw,ch)*.45,cw/2,ch/2,Math.max(cw,ch)*.78);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.38)');g.fillStyle=vg;g.fillRect(0,0,cw,ch);
 g.save();g.translate(cw-34,40);g.fillStyle='rgba(10,16,24,.7)';g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1.5;g.beginPath();g.arc(0,0,22,0,6.283);g.fill();g.stroke();g.fillStyle='#e8573a';g.beginPath();g.moveTo(0,-17);g.lineTo(5,2);g.lineTo(-5,2);g.closePath();g.fill();g.fillStyle='#ddd';g.beginPath();g.moveTo(0,17);g.lineTo(5,-2);g.lineTo(-5,-2);g.closePath();g.fill();g.restore();lab('N',cw-34,10,'#fff',12);
 const L=[10,25,50,100,250,500].filter(v=>v*s<=170).pop()||10,bl=L*s,bx=14,by=ch-22;g.fillStyle='rgba(10,16,24,.65)';g.fillRect(bx-6,by-16,bl+12,28);g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(bx,by-4);g.lineTo(bx,by+4);g.lineTo(bx+bl,by+4);g.lineTo(bx+bl,by-4);g.stroke();g.fillStyle='#fff';g.font='600 11px sans-serif';g.textAlign='left';g.fillText(L+' m',bx+2,by-6);
 if(hiBusy){g.textAlign='center';g.fillStyle='rgba(255,255,255,.8)';g.font='11px sans-serif';g.fillText('Sharpening map… '+Math.round(hiRow/10.24)+'%',cw/2,ch-8)}
 fmHint.style.display=fmZ<=1.01&&!MK.length?'block':'none';fmZl.textContent=fmZ.toFixed(1)+'x'}
function sizeFull(){const w=root.clientWidth||innerWidth,h=root.clientHeight||innerHeight,hh=fmQ('#fmh').offsetHeight+(fmQ('#fmk').offsetHeight||0)+22,cw=Math.max(240,w-16),ch=Math.max(180,h-hh-14),r=Math.min(2,window.devicePixelRatio||1);fmC.style.width=cw+'px';fmC.style.height=ch+'px';fmC.width=Math.round(cw*r);fmC.height=Math.round(ch*r)}
function fmClamp(){fmCx=Math.max(-B,Math.min(B,fmCx));fmCz=Math.max(-B,Math.min(B,fmCz))}
function fmZoom(z,ax,ay){const cw=fmC.clientWidth,ch=fmC.clientHeight,s0=fmS(),wx=fmCx+(ax-cw/2)/s0,wz=fmCz+(ay-ch/2)/s0;fmZ=Math.max(1,Math.min(10,z));const s1=fmS();fmCx=wx-(ax-cw/2)/s1;fmCz=wz-(ay-ch/2)/s1;if(fmZ<=1.001)fmCx=fmCz=0;fmClamp();drawFull()}
const fmWorld=(ax,ay)=>{const s=fmS();return{x:fmCx+(ax-fmC.clientWidth/2)/s,z:fmCz+(ay-fmC.clientHeight/2)/s}};
function fmInfo(){const m=MK[fmSel];fmI.style.display=m?'flex':'none';if(!m)return;if(document.activeElement!==fmN)fmN.value=m.n;fmD.textContent=Math.round(Math.hypot(m.x-P.x,m.z-P.z))+' m away';fmQ('#fmcol').style.borderColor=m.c}
function fmAddMarker(wx,wz){if(MK.length>=40)return say('Marker limit reached (40). Delete one first.');mkN=Math.max(mkN,MK.length)+1;MK.push({x:Math.max(-B,Math.min(B,wx)),z:Math.max(-B,Math.min(B,wz)),n:'Marker '+mkN,c:MKC[(mkN-1)%MKC.length]});fmSel=MK.length-1;fmInfo();drawFull();say('Marker placed.');try{persist()}catch(e){}}
function fmTap(ax,ay){if(fmAdd){const w=fmWorld(ax,ay);fmAdd=false;fmMb.classList.remove('on');return fmAddMarker(w.x,w.z)}
 const s=fmS();let hit=-1;for(let i=MK.length-1;i>=0;i--){const m=MK[i],x=fmC.clientWidth/2+(m.x-fmCx)*s,y=fmC.clientHeight/2+(m.z-fmCz)*s;if(Math.hypot(ax-x,ay-(y-18))<17){hit=i;break}}fmSel=hit;fmInfo();drawFull()}
const fmP=new Map();let fmMoved=0,fmPd=0;
fmC.addEventListener('pointerdown',e=>{e.preventDefault();try{fmC.setPointerCapture(e.pointerId)}catch(_){}const r=fmC.getBoundingClientRect();fmP.set(e.pointerId,{x:e.clientX-r.left,y:e.clientY-r.top});if(fmP.size===1)fmMoved=0;else{const a=[...fmP.values()];fmPd=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);fmMoved=99}});
fmC.addEventListener('pointermove',e=>{const p=fmP.get(e.pointerId);if(!p)return;const r=fmC.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,dx=x-p.x,dy=y-p.y;p.x=x;p.y=y;
 if(fmP.size===1){fmMoved+=Math.abs(dx)+Math.abs(dy);if(fmMoved>6){const s=fmS();fmCx-=dx/s;fmCz-=dy/s;fmClamp();drawFull()}}
 else if(fmP.size===2){const a=[...fmP.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(fmPd>0)fmZoom(fmZ*d/fmPd,(a[0].x+a[1].x)/2,(a[0].y+a[1].y)/2);fmPd=d}});
const fmUp=e=>{const p=fmP.get(e.pointerId);if(!p)return;const was=fmP.size;fmP.delete(e.pointerId);if(was===1&&fmMoved<=6&&e.type==='pointerup')fmTap(p.x,p.y);if(fmP.size===1)fmMoved=99};
fmC.addEventListener('pointerup',fmUp);fmC.addEventListener('pointercancel',fmUp);
fmC.addEventListener('wheel',e=>{e.preventDefault();e.stopPropagation();const r=fmC.getBoundingClientRect();fmZoom(fmZ*Math.exp(-e.deltaY*.0016),e.clientX-r.left,e.clientY-r.top)},{passive:false});
fmC.addEventListener('dblclick',e=>{e.preventDefault();const r=fmC.getBoundingClientRect(),w=fmWorld(e.clientX-r.left,e.clientY-r.top);fmAddMarker(w.x,w.z)});
fmMb.addEventListener('click',()=>{fmAdd=!fmAdd;fmMb.classList.toggle('on',fmAdd);if(fmAdd)say('Tap the map to drop a marker.')});
fmQ('#fmzi').addEventListener('click',()=>fmZoom(fmZ*1.5,fmC.clientWidth/2,fmC.clientHeight/2));
fmQ('#fmzo').addEventListener('click',()=>fmZoom(fmZ/1.5,fmC.clientWidth/2,fmC.clientHeight/2));
fmQ('#fmc0').addEventListener('click',()=>{fmZ=Math.max(fmZ,3);fmCx=P.x;fmCz=P.z;fmClamp();drawFull()});
fmQ('#fmcol').addEventListener('click',()=>{const m=MK[fmSel];if(!m)return;m.c=MKC[(Math.max(0,MKC.indexOf(m.c))+1)%MKC.length];fmInfo();drawFull()});
fmQ('#fmdel').addEventListener('click',()=>{if(fmSel<0)return;MK.splice(fmSel,1);fmSel=-1;fmInfo();drawFull();try{persist()}catch(e){}});
fmN.addEventListener('input',()=>{const m=MK[fmSel];if(m){m.n=fmN.value.slice(0,24)||'Marker';drawFull()}});
fmN.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'||e.key==='Escape')fmN.blur()});fmN.addEventListener('keyup',e=>e.stopPropagation());
function toggleMap(){if(dead&&!mapOpen)return;if(attOpen)closeAttUI();mapOpen=!mapOpen;fmW.style.display=mapOpen?'flex':'none';if(mapOpen){if(open)togglePanel();if(chOpen)toggleCheat();clearInput();fmZ=1;fmCx=fmCz=0;fmSel=-1;fmAdd=false;fmMb.classList.remove('on');fmInfo();sizeFull();drawFull();buildHi();fmT=performance.now();try{if(document.pointerLockElement===cv)document.exitPointerLock()}catch(e){}root.classList.add('menu')}else{try{persist()}catch(e){}root.classList.toggle('menu',!!(open||chOpen));lookLock(true)}}
function fmTick(){if(!mapOpen)return;if(dead){toggleMap();return}const n=performance.now();if(n-fmT<250)return;fmT=n;fmInfo();drawFull()}
fmW.addEventListener('pointerdown',e=>{e.stopPropagation()});fmW.addEventListener('mousedown',e=>e.stopPropagation());fmW.addEventListener('click',e=>{e.stopPropagation()});
$('fmx').addEventListener('click',()=>{if(mapOpen)toggleMap()});
MMc.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();toggleMap()});
window.addEventListener('resize',()=>{if(mapOpen){sizeFull();drawFull()}});
give('berry',3,1);render();
function campfire(){if(dead)return false;const x=P.x-Math.sin(yaw)*2,z=P.z-Math.cos(yaw)*2;if(H(x,z)<.4){say('Too wet for a fire.');return false}lightFire(x,z,300);say('Campfire lit. Stay close to stay warm.')}
function lightFire(x,z,life){const y=H(x,z),g=new T.Group();
 const fl=new T.Mesh(new T.ConeGeometry(.22,.85,7),new T.MeshBasicMaterial({color:0xff9a2a}));fl.position.y=.55;g.add(fl);
 const core=new T.Mesh(new T.ConeGeometry(.1,.5,6),new T.MeshBasicMaterial({color:0xfff1c4}));core.position.y=.62;g.add(core);
 for(let i=0;i<5;i++){const lg=new T.Mesh(new T.CylinderGeometry(.07,.09,1.15,6),i%2?mTrunk2:mTrunk);lg.rotation.z=Math.PI/2;lg.rotation.y=i*1.15;lg.position.set(0,.1+i*.02,0);g.add(lg)}
 const stones=new T.Mesh(new T.TorusGeometry(.42,.07,5,8),mRock);stones.rotation.x=Math.PI/2;stones.position.y=.08;g.add(stones);
 const l=new T.PointLight(0xff8a2a,2,16);l.position.y=1;g.add(l);g.position.set(x,y,z);scene.add(g);fires.push({x,z,life:life==null?300:life,g,l,fl})}
// loop
const dl=()=>(Math.sin(2*Math.PI*(t-.25))+1)/2;
const day=new T.Color(0x8eb4c9),night=new T.Color(0x05080f),tmp=new T.Color();
function update(dt){
 if(dead)return;age+=dt;hurtFx=Math.max(0,hurtFx-dt*1.6);
 const fwd=ch('freeze')?0:(CH.on?CH.ts:1),tn=t+dt*fwd*pace/REAL_DAY;if(tn>=1)days++;t=tn%1;
 let f=-jv.y,s=jv.x;if(keys.w||keys.arrowup)f++;if(keys.s||keys.arrowdown)f--;if(keys.d||keys.arrowright)s++;if(keys.a||keys.arrowleft)s--;
 const fly=ch('fly'),mv=Math.min(1,Math.hypot(f,s)),spr=!fly&&mv>.1&&S.energy>8&&!!(keys.shift||sprT),sp=(S.energy>10?4.2:2.4)*(ch('fast')?3:1)*(fly?1.5:1)*(spr?1.7:1)*(fly?1:wxSlow()),len=Math.hypot(f,s)||1,cp=fly?Math.cos(pitch):1;if(mv<.1||S.energy<=8)sprT=false;sprB.classList.toggle('on',spr);{const gA=gunOf(),stA=gA?gunStats(gA):null,zd=stA&&adsLerp>.01?1+(stA.zoom-1)*adsLerp:1,tf=(spr?FOVB+9:FOVB)/zd;if(Math.abs(cam.fov-tf)>.05){cam.fov+=(tf-cam.fov)*Math.min(1,dt*8);cam.updateProjectionMatrix()}}
 const dx=(-Math.sin(yaw)*f*cp+Math.cos(yaw)*s)/len*mv*sp*dt,dz=(-Math.cos(yaw)*f*cp-Math.sin(yaw)*s)/len*mv*sp*dt;
 if(fly){P.x=Math.max(-B,Math.min(B,P.x+dx));P.z=Math.max(-B,Math.min(B,P.z+dz));P.y=Math.min(150,Math.max(P.y+Math.sin(pitch)*f/len*mv*sp*dt,Math.max(G(P.x,P.z),-2.9)+1.2));if(H(P.x,P.z)>=-1.2){LP.x=P.x;LP.z=P.z}}
 else{slideStep(dx,dz);const gy=Math.max(G(P.x,P.z),-2.9)+1.7+Math.sin(age*9)*.04*mv;if(gy<P.y-.85)P.y=Math.max(gy,P.y-16*dt);else P.y+=(gy-P.y)*Math.min(1,dt*18);collide()}
 lastMv=mv*sp;cam.position.set(P.x,P.y,P.z);if(shake>0){cam.position.x+=(Math.random()-.5)*shake;cam.position.y+=(Math.random()-.5)*shake*.6;shake=Math.max(0,shake-dt*1.7)}cam.rotation.set(pitch+camK,yaw+camY,camR);cam.updateMatrixWorld();combatTick(dt,mv*(spr?1.6:1));
 // survival
 const d=dl();let temp=-10+28*d;const wet=precipAt(P.x,P.z);if(wx==='snow')temp-=wet?16:5;else if(wx==='storm')temp-=wet?11:3;else if(wx==='rain')temp-=wet?7:2;else if(wx==='fog')temp-=2;
 for(const q of fires){if(!q.keep)q.life-=dt*fwd*(pace/REF_PACE);if(!q.keep&&(wx==='rain'||wx==='storm')&&precipAt(q.x,q.z))q.life-=dt*fwd*(pace/REF_PACE)*(wx==='storm'?2.2:1.05);q.l.intensity=1.8+Math.random()*.8;q.fl.scale.y=.8+Math.random()*.5;if(Math.hypot(P.x-q.x,P.z-q.z)<7)temp+=30}
 fires=fires.filter(q=>{if(q.life<=0)scene.remove(q.g);return q.life>0});temp+=sysTick(dt);
 const bm=pace/REF_PACE;
 S.hunger-=(.10+(spr?.08:0))*dt*bm;S.thirst-=(.15+(spr?.1:0))*dt*bm;if(spr){S.hunger-=.4*dt;S.thirst-=.55*dt}if(wet&&(wx==='rain'||wx==='storm'))S.thirst=Math.min(100,S.thirst+(wx==='storm'?.65:.38)*dt*bm);
 if(spr)S.energy-=12*dt;else if(S.hunger>0){let regen=mv>.1?8:18;if(RF.has(key(Math.round(P.x/C),Math.round(P.z/C)))||nearFire())regen+=5;S.energy+=regen*dt}
 if(S.hunger<=0&&S.energy<12){if(!windTold){windTold=true;say('No food left. Stamina stays empty until you eat.')}}else if(S.hunger>8)windTold=false;
 S.warmth+=(Math.max(0,Math.min(100,40+temp*2.5))-S.warmth)*.08*dt*bm;
 for(const o of things)if(o.userData.k==='bush'&&o.userData.ready>0&&(o.userData.ready-=dt)<=0)o.userData.f.visible=true;
 if(ch('inf')){S.hunger=S.thirst=S.energy=100;S.warmth=Math.max(S.warmth,70)}if((saveAcc+=dt)>8){saveAcc=0;persist()}if(raidPhase==='active'||raidPhase==='warning')RT.quiet=0;else if(dl()>.55){RT.quiet+=dt*bm;if(RT.quiet>28&&RT.heat>0){RT.heat=Math.max(0,RT.heat-.45);RT.quiet=0;if(RT.heat<.2)say('Heat cooled off.');}}else RT.quiet=0;
 let hurt=0;if(S.hunger<=0)hurt+=1.5*bm;if(S.thirst<=0)hurt+=2*bm;if(S.warmth<20)hurt+=1*bm;
 if(hurt){S.health-=hurt*dt;hurtFx=Math.max(hurtFx,.15)}else if(S.health>0&&S.hunger>50&&S.thirst>50&&S.warmth>40)S.health=Math.min(100,S.health+.8*dt*bm);
 for(const k in S)S[k]=Math.max(0,Math.min(100,S[k]));
 if(ch('god'))S.health=100;
 if(S.health<=0){dead=true;clearInput();lookLock(false);const blow=demise&&age-demiseT<6?demise:'';const env=S.thirst<=0?'Dehydration':S.hunger<=0?'Starvation':S.warmth<20?'Exposure':'';$('why').textContent=(blow||env||'Your wounds')+' — you reached day '+(days+1)+'.';$('over').style.display='flex'}
 // sky
 tmp.copy(night).lerp(day,Math.pow(d,.7));scene.background.copy(tmp);scene.fog.color.copy(tmp);
 hemi.intensity=.28+.55*d+(boltT>0?1.7:0);sky2(d);tintWeather(dt);weatherTick(dt,fwd);if(boltT>0){scene.background.lerp(boltWhite,.6);boltT-=dt}
 if(msgT>0&&(msgT-=dt)<=0)$('msg').textContent='';
}
function tempWord(v){return v<20?'Freezing':v<40?'Cold':v<62?'Cool':v<85?'Warm':'Hot'}
function hud(){
 for(const k in S){const bar=$('b_'+k);if(bar)bar.style.width=S[k]+'%';const n=$('n_'+k);if(n)n.textContent=k==='warmth'?tempWord(S.warmth):Math.round(S[k]);const row=bar&&bar.parentElement&&bar.parentElement.parentElement;if(row)row.classList.toggle('low',S[k]<(k==='warmth'?35:25))}
 sprB.textContent=sprT&&S.energy>8?'Sprinting':S.hunger<=0?'No food':'Sprint';
 const hr=Math.floor(t*24),mn=Math.floor((t*24-hr)*60);
 $('clock').innerHTML=`Day ${days+1}&nbsp;&nbsp;${String(hr).padStart(2,'0')}:${String(mn).padStart(2,'0')}&nbsp;&nbsp;${WXNAME[wx]||''}`+(CH.on?`&nbsp;&nbsp;(${P.x|0}, ${P.z|0})`:'')+`<span class="pace">${pace}× · ${dayLenLabel()} · ${BIOME_N[biomeAt(P.x,P.z)]}</span>`;$('cht').style.display=CH.on?'block':'none';paintRate();minimap();fmTick();
 uiTick();
 
 const o=target()||closestUse(),p=$('prompt'),chip=!o&&(tool('hatchet')||tool('pickaxe'))?toolPiece():null,hold=SL[sel],hmr=tool('hammer')?hammerLabel():'';
 p.innerHTML=hmr?`<span>E</span>${hmr}`:o?`<span>E</span>${plab2(o)}`:chip?`<span>E</span>${tool('pickaxe')?'Mine the wall':'Chop the wall'}`:(hold&&ITEMS[hold.id].nade)?`<span>E</span>${ITEMS[hold.id].plant?'Set charge':'Throw'}`:(hold&&hold.id==='launcher')?'<span>E</span>Launch rocket':canDrink()?'<span>E</span>Drink water':'';
 {const gs=gunOf(),am=$('ammo');if(gs){am.style.display='block';{const ld=(gs.mag||0)>0?(gs.at||'ammo'):ammoSel,sw=ld!==ammoSel,str='<small style="color:'+AMMO[ammoSel].col+'">'+AMMO[ld].tag+(sw?' → '+AMMO[ammoSel].tag:'')+'</small>'+(reloadT>0?'RELOAD ':'')+(gs.mag||0)+' / '+cnt(ammoSel);if(am._s!==str){am._s=str;am.innerHTML=str}}}else if(hold&&hold.id==='launcher'){am.style.display='block';am.textContent=cnt('rocket')+' rockets'}else am.style.display='none'}
 wbHud();
 $('hurt').style.opacity=Math.max(0,(45-S.health)/45);$('hit').style.opacity=hurtFx;
}
if(opts&&(opts.saveData||opts.cont)){
 const raw=opts.saveData?(typeof opts.saveData==='string'?JSON.parse(opts.saveData):opts.saveData):loadRaw();
 if(!applySave(raw))say('No claim on record. Starting fresh.');
}else if(opts){
 if(opts.claimName)claimName=String(opts.claimName).trim()||claimName;
 if(opts.slotId)slotId=opts.slotId;
 if(opts.pace&&PACES.includes(+opts.pace))pace=+opts.pace;
 if(opts.gather&&+opts.gather>0)GATHER=+opts.gather;
 if(opts.kit==='pioneer'){give('hatchet',1,1);give('pickaxe',1,1);give('bandage',3,1);give('rations',2,1);give('wood',40,1);give('stone',30,1);say(claimName+' — Pioneer kit equipped.')}
 else if(opts.kit==='builder'){give('hatchet',1,1);give('pickaxe',1,1);give('hammer',1,1);give('revolver',1,1);give('ammo',36,1);give('bedroll',1,1);give('tc',1,1);give('wood',250,1);give('stone',200,1);give('metal',80,1);give('fuel',15,1);say(claimName+' — Outpost Builder kit equipped.')}
}
ensureStarter();render();persist(opts&&opts.saveData?'load':'auto');
const wakeBtn=$('wake');if(wakeBtn)wakeBtn.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation();wake();if(ev.pointerType==='mouse')lookLock(true)});
root.addEventListener('pointerdown',()=>{try{if(actx&&actx.state==='suspended')actx.resume()}catch(e){}},{passive:true});
window.__controlsTest={getYaw:()=>yaw,getSpeed:()=>lastMv,getPos:()=>({x:P.x,z:P.z,yaw}),setKeys(codes){for(const k of Object.keys(keys))keys[k]=0;const map={KeyW:'w',KeyA:'a',KeyS:'s',KeyD:'d',ShiftLeft:'shift',ShiftRight:'shift',ArrowUp:'arrowup',ArrowDown:'arrowdown',ArrowLeft:'arrowleft',ArrowRight:'arrowright'};for(const c of codes||[]){const k=map[c];if(k)keys[k]=1}}};
window.__bp={snap:()=>{cullT=0;nearT=0;update(.016);ren.render(scene,cam);return cv.toDataURL('image/png')},meleePose:(id,p,didHit)=>{SL[0]={id,n:1,dur:100};sel=0;adsHeld=false;adsLerp=0;vmId=null;syncVM();drawT=0;render();const isMel=!!(ITEMS[id]&&ITEMS[id].mel);if(isMel){mSt=ITEMS[id].mel.st;mD=.48;mT=mD*(1-p)+.016;swingHit=didHit?1:0;swing=0}else{startSwing(null,!!didHit,.42);swing=swingD*(1-p)+.016;mT=0}bobVM(.001,0);ren.render(scene,cam);return{id,p,pos:[+vmP.position.x.toFixed(3),+vmP.position.y.toFixed(3),+vmP.position.z.toFixed(3)],rot:[+vmP.rotation.x.toFixed(3),+vmP.rotation.y.toFixed(3),+vmP.rotation.z.toFixed(3)]}},shootPose:(id,att,ap,ads)=>{while(FXP.length){const o=FXP.pop();scene.remove(o.m)}const m=att&&typeof att==="object"?{sight:att.sight||null,barrel:att.barrel||null,under:att.under||null}:{sight:null,barrel:null,under:null};SL[0]={id,n:1,dur:ITEMS[id].dur||200,mag:(ITEMS[id].gun&&ITEMS[id].gun.mag)||6,at:"ammo",mods:m,att:att||{}};sel=0;adsHeld=!!ads;adsLerp=ads?1:0;drawT=0;reloadT=0;fireCd=0;vmId=null;syncVM();give("ammo",60,1);fire();if(ap!=null&&actD>0){const targetElapsed=actD*ap;let el=0;while(el<targetElapsed-.0001){const step=Math.min(.01,targetElapsed-el);flashT=Math.max(0,flashT-step);gunPose(step);fxTick(step);el+=step}}const U=(vmM&&vmM.userData)||{},act=U.act,rH=vmP&&vmP.userData&&vmP.userData.rH,lH=vmP&&vmP.userData&&vmP.userData.lH,fl=U.fl;return{id,actT:+actT.toFixed(3),actD:+actD.toFixed(3),trigF:rH&&rH.userData.trigF?+rH.userData.trigF.rotation.x.toFixed(3):null,flashVis:!!(fl&&fl.visible),fx:FXP.length,barrelHeat:+barrelHeat.toFixed(3),actX:act?+act.position.x.toFixed(4):null,actRotX:act?+act.rotation.x.toFixed(3):null,rHandPos:rH?[+rH.position.x.toFixed(3),+rH.position.y.toFixed(3),+rH.position.z.toFixed(3)]:null,lHandPos:lH?[+lH.position.x.toFixed(3),+lH.position.y.toFixed(3),+lH.position.z.toFixed(3)]:null}},setAds:on=>{adsHeld=!!on;adsLerp=on?1:0;if(on)drawT=0;return adsLerp},mount:id=>{const g=gunOf();return g?mountAttachment(g,id,true):false},bp:()=>[...BPK],scrap:()=>cnt('scrap'),research:id=>doResearch(id),launch:()=>launchRaid(),skip:()=>skipToRaid(),phase:()=>raidPhase,heat:()=>RT.heat,rating:()=>rate100(),raiders:()=>EN.filter(e=>e.hp>0).length,barricades:()=>devs.filter(d=>d.t==='barricade'&&!d._gone).map(d=>({x:+d.x.toFixed(1),z:+d.z.toFixed(1),owner:d.owner,hp:d.hp})),tick:(n,dt)=>{for(let i=0;i<(n||1);i++)update(dt||.05)},foes:()=>EN.filter(e=>e.hp>0).map((e,i)=>({i,x:+e.x.toFixed(1),z:+e.z.toFixed(1),siege:!!e.siege,tower:!!e.tower,camp:!!e.camp,gun:e.gun||null,walls:e.walls,hold:e.cvHold>age?+(e.cvHold-age).toFixed(1):0,hp:Math.round(e.hp)})),hitFoe:(i,dmg)=>{const e=EN.filter(r=>r.hp>0)[i];if(!e)return null;shoot(e,dmg||1);return{fireT:+(e.fireT-age).toFixed(1),walls:e.walls}},zap:dmg=>{let b=null,bd=1e9;for(const e of EN){if(e.hp<=0||!e.gun)continue;const q=Math.hypot(e.x-P.x,e.z-P.z);if(q<bd){bd=q;b=e}}if(!b)return null;shoot(b,dmg||1);return{d:+bd.toFixed(1),walls:b.walls,hold:+(b.cvHold-age).toFixed(1)}},siege:()=>EN.filter(e=>e.siege&&e.hp>0).length,near:()=>{const a=EN.filter(e=>e.hp>0).map(e=>Math.hypot(e.x-P.x,e.z-P.z));return a.length?Math.min(...a):-1},pos:()=>({x:+P.x.toFixed(2),y:+P.y.toFixed(2),z:+P.z.toFixed(2),g:+G(P.x,P.z).toFixed(2)}),place:(x,z,fl)=>{P.x=LP.x=x;P.z=LP.z=z;const f=FD.get(key(Math.round(x/C),Math.round(z/C)));const ft=fl==null?undefined:(f?f.y:0)+FH*(+fl||0)+1;P.y=Math.max(G(x,z,ft),-2.9)+1.7;return {x:+P.x.toFixed(2),y:+P.y.toFixed(2),z:+P.z.toFixed(2),gy:+G(x,z,ft).toFixed(2)}},wx:()=>wx,fog:()=>scene.fog.density,sky:()=>({wx,fog:+scene.fog.density.toFixed(4),rain:rainFx.p.visible,snow:snowFx.p.visible}),setWx:(k)=>{if(!WXNAME[k])return false;wx=k;wxT=120;return true},give:(id,n)=>!!give(id,n||1,1),count:(id)=>cnt(id),ords:()=>ORDS.length,blasts:()=>blastN,kits:()=>EN.filter(e=>e.hp>0).map(e=>(e.kit||'melee')+':'+(e.nades||0)),pace:()=>pace,time:()=>({t,days,pace,hr:t*24}),vitals:()=>({...S}),setPace:(v)=>{setPace(v);return pace},face:(x,z,p)=>{yaw=Math.atan2(-(x-P.x),-(z-P.z));pitch=p==null?-.12:+p},beasts:()=>DE.concat(WV).filter(a=>a.hp>0).map(a=>({k:a.k,x:+a.x.toFixed(1),z:+a.z.toFixed(1),d:+Math.hypot(a.x-P.x,a.z-P.z).toFixed(1)})).sort((a,b)=>a.d-b.d).slice(0,4),seal:()=>{const cx=Math.round(P.x/C),cz=Math.round(P.z/C),x=cx*C,z=cz*C,y=Math.max(H(x,z),1),fk=key(cx,cz);if(!FD.has(fk))construct(ITEMS.wood_foundation,{x,y,z,k:fk,p:'foundation',rot:0});const wk=key(cx,cz,'S');if(!WL.has(wk))construct(ITEMS.wood_wall,{x,z:z+C/2,y,k:wk,rot:0,p:'wall'});const c=ALLC.find(q=>q.wk===wk&&q.piece);return c?{hp:c.hp,x:(c.x0+c.x1)/2,z:(c.z0+c.z1)/2,y:(c.y||y)+1.3}:null},boom:(kind,x,y,z)=>{boom({kind:kind||'satchel',x,y,z,owner:'you',mesh:null});return{blasts:blastN,hp:ALLC.filter(c=>c.piece).map(c=>Math.round(c.hp))}},throwCan:()=>{const i=SL.findIndex(s=>s&&s.id==='beancan');if(i<0)return false;sel=i;return !!useSlot(i)},rocket:()=>{const i=SL.findIndex(s=>s&&s.id==='launcher');if(i>=0)sel=i;const info={throwCd,dead,rockets:cnt('rocket'),slot:SL[sel]&&SL[sel].id};fireRocketPlayer();info.after=cnt('rocket');info.ords=ORDS.length;info.throwCd2=throwCd;info.msg=($('msg')&&$('msg').textContent)||'';return info},health:()=>S.health,yards:()=>NP.map(n=>{const mine=d=>d.npc===n&&!d._gone,ts=devs.filter(d=>mine(d)&&d.t==='turret'),ws=wires.filter(w=>w.a.npc===n&&w.b.npc===n);return{ok:!!(n.tc&&!n.tc._gone&&n.devs.furnace&&n.devs.battery&&n.devs.wind&&n.devs.solar&&n.devs.switch&&ts.length===4&&ws.length>=8&&(n.floors||1)>=3),deck:n.devs.turret0&&n.tc?+(n.devs.turret0.y-n.tc.y).toFixed(2):0,floors:n.floors||1,skip:n.skip||0,hp:Math.round(n.hp),aggro:+(n.aggro||0).toFixed(1),step:n.i+'/'+n.bp.length,skip:n.skip||0,tur:ts.length,pw:ts.map(t=>+t.pw.toFixed(2)),wires:ws.length,bat:n.devs.battery?Math.round(n.devs.battery.ch):0,wind:n.devs.wind?+n.devs.wind.out.toFixed(1):0,x:n.tc?+n.tc.x.toFixed(1):+n.x.toFixed(1),z:n.tc?+n.tc.z.toFixed(1):+n.z.toFixed(1)}}),goto:(i)=>{const n=NP[i||0];if(!n||n.hp<=0)return null;jumpSettler(n,i||0);return{i:i||0,x:+P.x.toFixed(1),z:+P.z.toFixed(1),step:n.i,len:(n.bp&&n.bp.length)||0,home:!!n.home}},smack:()=>{const n=NP.find(x=>x.hp>0&&x.tc);if(!n)return null;const before=n.hp;hit(n.m);return{before,hp:Math.round(n.hp),aggro:+n.aggro.toFixed(1),angry:NP.filter(o=>o.aggro>0).length,k:n.m.userData.k}},tryPlace:(id,x,z)=>{const it=ITEMS[id];if(!it)return 'bad';const a=aim(it,x,z,0);if(!a.ok)return a.why||'no';if(it.dv==='tc'&&tcCovering(a.x,a.z))return 'overlap';if(privWhy(a.x,a.z,null))return 'blocked';construct(it,a,0);return 'ok'},anchor:()=>{const a=raidAnchor();return{x:+a.x.toFixed(1),z:+a.z.toFixed(1),tc:!!(a.tc&&!a.tc._gone),live:!!a.live,hp:a.tc?Math.round(a.tc.hp):0}},soak:()=>{const t=playerTC();if(t)t.sl=Array(12).fill(null);const seen=new Set();let hp0=0,n=0;for(const c of ALLC){if(!c.piece||c.owner!=='you'||!c.mesh||seen.has(c.mesh))continue;seen.add(c.mesh);c.born=0;hp0+=c.hp;n++}upkeepTick(600);const seen2=new Set();let hp1=0;for(const c of ALLC){if(!c.piece||c.owner!=='you'||!c.mesh||seen2.has(c.mesh))continue;seen2.add(c.mesh);hp1+=c.hp}return{pieces:n,before:Math.round(hp0),after:Math.round(hp1),paid:!!(t&&t.paid),short:(t&&t.short)||''}},world:()=>{const c=k=>things.filter(o=>o.userData.k===k).length;const kinds={};let off=0;for(const o of things)if(o.userData.k==='barrel'){const q=o.userData.kind||'?';kinds[q]=(kinds[q]||0)+1;let by=false;visitRoads(o.position.x,o.position.z,h=>{if(h.dist<h.half+h.edge+3.4)by=true});if(!by)off++}return{roads:ROADS.length,barrels:c('barrel'),offRoad:off,ponds:PONDS.map(q=>({x:+q.x.toFixed(1),z:+q.z.toFixed(1),r:+q.r.toFixed(1),y:+H(q.x,q.z).toFixed(2)})),kinds,sulfur:c('sulfur'),ore:c('ore'),junk:c('junk'),rocks:c('rock'),trees:c('tree'),mons:MONS.length}},mons:()=>MONS.map(m=>({n:m.n,x:+m.x.toFixed(1),z:+m.z.toFixed(1),raiderCamp:!!m.raiderCamp})),raiderCamps:()=>RCAMPS.map(c=>({n:c.n,kind:c.campKind,x:+c.x.toFixed(1),z:+c.z.toFixed(1),y:+c.y.toFixed(2),r:+c.r.toFixed(1),targetCount:c.targetCount,alive:c.raiders.filter(r=>r&&r.hp>0).length,roles:c.raiders.filter(r=>r&&r.hp>0).map(r=>r.role+(r.warlord?'*':'')+(r.tower?'^':'')+':'+r.gun),cleared:!!c.cleared,respawnT:+(c.respawnT||0).toFixed(1),warChests:CR.filter(o=>o.userData.tier===4&&Math.hypot(o.position.x-c.x,o.position.z-c.z)<c.r+4).length,eliteCrates:CR.filter(o=>o.userData.tier===3&&Math.hypot(o.position.x-c.x,o.position.z-c.z)<c.r+4).length})),barrels:()=>{const o={};for(const t of things){if(t.userData.k!=='barrel')continue;const k=t.userData.kind||'?';const a=o[k]=o[k]||[];if(a.length<3)a.push({x:+t.position.x.toFixed(1),z:+t.position.z.toFixed(1),y:+t.position.y.toFixed(2),g:+H(t.position.x,t.position.z).toFixed(2)})}return o},climb:(i)=>{const list=NP.filter(n=>n.tc&&!n.tc._gone),n=list[i||0];if(!n)return null;const y0=n.tc.y,t=n.devs.turret0,h=n.devs.heater,w=n.devs.wind;const cell=(d)=>d&&{x:+d.x.toFixed(2),z:+d.z.toFixed(2),y:+d.y.toFixed(2),cx:Math.round(d.x/C),cz:Math.round(d.z/C),fy:FD.get(key(Math.round(d.x/C),Math.round(d.z/C)))?.y,rf0:RF.has(key(Math.round(d.x/C),Math.round(d.z/C))),rf1:RF.has(key(Math.round(d.x/C),Math.round(d.z/C),1)),g:G(d.x,d.z,(FD.get(key(Math.round(d.x/C),Math.round(d.z/C)))?.y||0)+8)};return{base:+y0.toFixed(2),mid:+G(n.tc.x,n.tc.z+3,y0+4).toFixed(2),deck:+G(n.tc.x+3,n.tc.z,y0+8).toFixed(2),tur:cell(t),heat:cell(h),wind:cell(w),step:n.bp.filter(s=>s[0]==='turret'||s[0]==='heater'||s[0]==='wind').slice(0,4)}},sim:(steps)=>{const N=steps||500;for(let i=0;i<N;i++){npcTick(.05);furnaces(.05)}return NP.map(q=>({i:q.i,len:(q.bp&&q.bp.length)||0,home:!!q.home,skip:q.skip||0,w:q.inv.wood||0,s:q.inv.stone||0,m:q.inv.metal||0,o:q.inv.ore||0,g:q.inv.gears||0,c:q.inv.circuit||0}))},smelt:()=>NP.map((n,i)=>{const f=n.devs&&n.devs.furnace;if(!f||f._gone)return{i,step:n.i,close:!!n.close,no:1};return{i,step:n.i,close:!!n.close,burn:+(f.burn||0).toFixed(1),sl:f.sl.map(s=>s?s.id[0]+s.n:0)}}),farms:()=>NP.map((q,i)=>{const nodes=things.filter(o=>o.userData&&o.userData.farm===q),kinds={};for(const o of nodes)kinds[o.userData.k]=(kinds[o.userData.k]||0)+1;let near=1e9;for(const o of NP)if(o!==q)near=Math.min(near,Math.hypot((q.lot?q.lot.x:q.x)-(o.lot?o.lot.x:o.x),(q.lot?q.lot.z:q.z)-(o.lot?o.lot.z:o.z)));return{i,nodes:nodes.length,kinds,near:+(near>1e8?0:near).toFixed(0),spawn:+Math.hypot((q.lot?q.lot.x:q.x)-SP.x,(q.lot?q.lot.z:q.z)-SP.z).toFixed(0),step:q.i,len:(q.bp&&q.bp.length)||0,home:!!q.home}}),inv:()=>SL.slice(0,42).map(s=>s?s.id+':'+s.n+(s.mag!=null?'/m'+s.mag:''):null),click:(i)=>{clickSlot(i);return SL[i]?SL[i].id:null},openLast:()=>{const d=[...devs].reverse().find(q=>q&&!q._gone&&(isBox(q.t)||isInd(q.t)||q.t==='tc'));if(!d)return null;P.x=LP.x=d.x+1.5;P.z=LP.z=d.z+1.2;P.y=Math.max(G(d.x,d.z),0)+1.7;curBox=d;open=true;tab='bag';pick=null;render();return{t:d.t,owner:d.owner,sl:d.sl.map(s=>s?s.id+':'+s.n:null)}},takeAll:()=>{xferAll('take');pick=null;render();return true},storeBag:()=>{xferAll('store');pick=null;render();return true}};window.__bp.road=()=>{let posts=0,best=null,bd=1e9,lane=[];for(const p of POSTS){if(p.skip)continue;posts++;const d=Math.hypot(p.x-P.x,p.z-P.z);if(d<bd){bd=d;best=p}}for(const o of things){const k=o.userData&&o.userData.k;if(k!=='tree'&&k!=='rock'&&k!=='bush'&&k!=='junk'&&k!=='barrel'&&k!=='ore'&&k!=='sulfur')continue;let hit=null;visitRoads(o.position.x,o.position.z,h=>{if(!hit||h.dist<hit.dist)hit=h});if(hit&&hit.dist<hit.half+hit.edge-.15)lane.push(k+(o.userData.farm?'*':''))}return{posts,segs:SEGS.length,lane,h:+H(P.x,P.z).toFixed(3),feet:+(P.y-1.7).toFixed(3),post:best?{x:+best.x.toFixed(2),z:+best.z.toFixed(2),d:+bd.toFixed(2)}:null}};
window.__bp.qa=()=>{const segD=(m)=>{let best=1e9;for(const s of SEGS){const dx=s.bx-s.ax,dz=s.bz-s.az;let u=((m.x-s.ax)*dx+(m.z-s.az)*dz)/(s.l2||1);if(u<0)u=0;else if(u>1)u=1;const d=Math.hypot(m.x-(s.ax+dx*u),m.z-(s.az+dz*u));if(d<best)best=d}return best};const mons=MONS.map(m=>{const best=segD(m),half=5.1;return{n:m.n,r:+m.r.toFixed(1),best:+best.toFixed(1),edge:+(best-half).toFixed(1),on:best<m.r-4}});const bases=NP.map(n=>{const plan=n.plan||{},tur=devs.filter(d=>d.npc===n&&!d._gone&&d.t==='turret');let out=0;if(plan.w&&n.tc){const cx=Math.round(n.tc.x/C)-(plan.tx||0),cz=Math.round(n.tc.z/C)-(plan.tz||0),pads=[[cx-1,cz-1],[cx+plan.w,cz-1],[cx-1,cz+plan.d],[cx+plan.w,cz+plan.d]];out=tur.filter(t=>pads.some(p=>Math.round(t.x/C)===p[0]&&Math.round(t.z/C)===p[1])&&FD.has(key(Math.round(t.x/C),Math.round(t.z/C)))).length}return{w:plan.w||0,d:plan.d||0,fl:plan.floors||n.floors||0,tc:!!(n.tc&&!n.tc._gone),wb:!!(n.devs.workbench&&!n.devs.workbench._gone),fur:!!(n.devs.furnace&&!n.devs.furnace._gone),wind:!!(n.devs.wind&&!n.devs.wind._gone),bat:!!(n.devs.battery&&!n.devs.battery._gone),tur:tur.length,out,pw:tur.map(t=>+t.pw.toFixed(2)),wW:n.devs.wind?+n.devs.wind.out.toFixed(1):0,ch:n.devs.battery?Math.round(n.devs.battery.ch):0,wires:wires.filter(w=>w.a.npc===n||w.b.npc===n).length,job:n.job?n.job.k:null,away:+Math.hypot(n.x-(n.home?n.home.x:n.hx),n.z-(n.home?n.home.z:n.hz)).toFixed(1),step:(n.i||0)+'/'+(n.bp?n.bp.length:0),home:!!n.home,skip:n.skip||0}});const c=k=>things.filter(o=>o.userData.k===k).length;return{np:NP.length,forest:FOREST,trees:c('tree'),rocks:c('rock'),ore:c('ore'),sulfur:c('sulfur'),junk:c('junk'),mons,onRoad:mons.filter(m=>m.on).length,bases,calls:ren.info.render.calls,times:window.__times}};
window.__bp.shapes=()=>{const o={};for(const t of things){if(!t.userData||t.userData.k!=='barrel')continue;const k=t.userData.variant||'drum';o[k]=(o[k]||0)+1}return o};
window.__bp.tiers=()=>{const o={};for(const r of PCS)if(r.owner==='npc'&&r.m&&r.m.parent){const k=r.t;o[k]=(o[k]||0)+1}return o};window.__bp.mapOpen=()=>mapOpen;window.__bp.tracers=()=>TRP.filter(q=>q.busy).length;window.__bp.lodStats=()=>{const s=[0,0,0];for(const o of things)o.traverse(x=>{if(x.isLOD){const i=x.levels.findIndex(l=>l.object.visible);if(i>=0)s[i]++}});return s};window.__bp.rich=()=>{for(const n of NP){n.inv.stone=9000;n.inv.wood=6500;n.inv.metal=1800;n.inv.gears=320;n.inv.circuit=120;n.inv.ore=80;n.inv.fuel=80}};
window.__bp.needs=(o)=>{if(o){for(const k in o)if(k in S)S[k]=+o[k]}return{...S}};
// Test hooks for tools, crates and drag-and-drop (tests/tools.mjs)
window.__bp.inv={give:(id,n)=>give(id,n,1),slots:()=>SL.slice(0,30).map(q=>q&&{id:q.id,n:q.n,dur:q.dur}),box:()=>curBox&&{t:curBox.t,nm:curBox.nm,sl:curBox.sl.map(q=>q&&{id:q.id,n:q.n})},isOpen:()=>open,select:i=>{sel=i;render()},sel:()=>sel,fireHeld:()=>fireHeld,toolCd:()=>toolCd,drops:()=>DROPS.length,crates:()=>CR.map(o=>({x:o.position.x,y:o.position.y,z:o.position.z,tier:o.userData.tier,cd:o.userData.cd})),place:(x,z)=>{P.x=x;P.z=z},openNearestCrate:()=>{let b=null,bd=1e9;for(const o of CR){const d=Math.hypot(o.position.x-P.x,o.position.z-P.z);if(d<bd){bd=d;b=o}}if(b){b.userData.cd=0;openCrate(b)}return b?b.userData.tier:0},act:()=>act(),trig:d=>trigger(d),mCd:()=>mCd,energy:()=>S.energy,setSlot:(i,o)=>{SL[i]=o;render()},closePanel:()=>{if(open)togglePanel()},openPanel:()=>{if(!open)togglePanel()},tierYield:id=>{SL[0]={id,n:1,dur:ITEMS[id].dur};sel=0;return[ty('tree'),ty('stone'),ty('ore'),toolTier()]},say:()=>($('msg')||{}).textContent};
window.__bp.prove=()=>{for(const n of NP){n.inv.stone=9000;n.inv.wood=6500;n.inv.metal=1800;n.inv.gears=320;n.inv.circuit=120;n.inv.ore=80;n.inv.fuel=80;n.fail=0}let guard=0;while(NP.some(n=>n.bp&&n.i<n.bp.length)&&guard++<8000){for(const n of NP){if(!n.bp||n.i>=n.bp.length||n.hp<=0)continue;const st=n.bp[n.i];if(st&&st[0]!=='wire'){const at=pieceAt(st);if(Math.hypot(at.sx-n.x,at.sz-n.z)>3.2){n.x=at.sx+1.4;n.z=at.sz+1.5;n.y=Math.max(H(n.x,n.z),0);n.m.position.set(n.x,n.y,n.z);n.pth=[]}}n.cd=0}npcTick(.25)}flushTerrain();for(const n of NP)if(n.bp&&n.i>=n.bp.length&&n.tc&&!n.home)finishYard(n);power(.1);
 return {guard,rows:NP.map(n=>{const plan=n.plan||{},tc=n.tc;let walls=0;if(tc){const seen=new Set();for(const c of ALLC){if(!c.piece||c.owner!=='npc'||!c.mesh||seen.has(c.mesh))continue;const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2;if(Math.hypot(cx-tc.x,cz-tc.z)>28)continue;seen.add(c.mesh);walls++}}const need=plan.wallNeed!=null?plan.wallNeed:(plan.w&&plan.d?2*(plan.w+plan.d)*(plan.floors||1):0);const tur=devs.filter(d=>d.npc===n&&!d._gone&&d.t==='turret');let out=0;if(plan.w&&tc){const cx=Math.round(tc.x/C)-(plan.tx||0),cz=Math.round(tc.z/C)-(plan.tz||0),pads=[[cx-1,cz-1],[cx+plan.w,cz-1],[cx-1,cz+plan.d],[cx+plan.w,cz+plan.d]];out=tur.filter(t=>pads.some(p=>Math.round(t.x/C)===p[0]&&Math.round(t.z/C)===p[1])).length}const rm={};if(plan.rooms&&plan.rooms[0])for(const k in plan.rooms[0]){const r=plan.rooms[0][k];rm[r]=(rm[r]||0)+1}return{w:plan.w||0,d:plan.d||0,fl:plan.floors||0,walls,need,skip:n.skip||0,step:(n.i||0)+'/'+(n.bp?n.bp.length:0),home:!!n.home,wb:!!(n.devs.workbench&&!n.devs.workbench._gone),wind:!!(n.devs.wind&&!n.devs.wind._gone),fur:!!(n.devs.furnace&&!n.devs.furnace._gone),tur:tur.length,out,doors:devs.filter(d=>d.npc===n&&d.t==='door'&&!d._gone).length,furn:!!n.furn,rm}})}};
window.__bp.raiderShowcase=(pose)=>{
 while(EN.length){const e=EN.pop();scene.remove(e.m);const ti=things.indexOf(e.m);if(ti>=0)things.splice(ti,1)}
 const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
 const specs=[
  {off:-1.32,dist:2.25,heavy:true,face:0,gun:"ak",kit:"melee",aimT:pose==="aim"?2:0,sw:0,yawOff:.35},
  {off:-0.44,dist:1.95,heavy:false,face:1,gun:null,kit:"melee",aimT:0,sw:pose==="aim"?.24:0,armUp:pose==="aim"?.5:0,yawOff:-.15},
  {off:0.44,dist:2.05,heavy:true,face:2,gun:"shotgun",kit:"melee",aimT:pose==="aim"?2:0,sw:0,yawOff:-.35},
  {off:1.32,dist:2.25,heavy:false,face:2,gun:"smg",kit:"melee",aimT:pose==="aim"?2:0,sw:0,yawOff:-.55}
 ];
 for(const s of specs){
  const x=P.x+fx*s.dist+rx*s.off,z=P.z+fz*s.dist+rz*s.off,y=H(x,z);
  const m=spawnMan(0x8a2222,true,{heavy:s.heavy,face:s.face,gun:s.gun,kit:s.kit});
  m.position.set(x,y,z);
  m.rotation.y=Math.atan2(P.x-x,P.z-z)+(s.yawOff||0);
  const e={k:"raider",x,y,z,hp:90,maxHp:90,heavy:s.heavy,gun:s.gun,kit:s.kit,aimT:s.aimT||0,sw:s.sw||0,armUp:s.armUp||0,_mv:0,ph:0,cheat:true,m};
  m.userData.k="raider";m.userData.a=e;
  animMan(e,.016);
  things.push(m);EN.push(e);
 }
 pitch=-.06;cam.position.set(P.x,P.y,P.z);cam.rotation.set(pitch,yaw,0);cam.updateMatrixWorld();
 ren.render(scene,cam);
 return EN.length;
};
window.__bp.colCheck=()=>{
 let staticCount=0;for(const b of STATIC_GRID.values())staticCount+=b.length;
 let floating=0,sunkenRecy=0,buriedCrates=0;
 for(const o of things){
  const k=o.userData&&o.userData.k;
  if(k==="tree"||k==="rock"||k==="ore"||k==="sulfur"||k==="junk"||k==="barrel"||k==="bush"){
   const gy=H(o.position.x,o.position.z),dy=o.position.y-gy;
   if(dy>.48||dy<-.55)floating++;
  }else if(k==="recycler"){
   const m=MONS.find(q=>Math.hypot(q.x-o.position.x,q.z-o.position.z)<q.r+4);
   if(m&&Math.abs(o.position.y-(m.y+.055))>.08)sunkenRecy++;
  }else if(k==="crate"){
   const gy=G(o.position.x,o.position.z,o.position.y+.5);
   if(o.position.y<gy-.05)buriedCrates++;
  }
 }
 // Test player collision against first tree, rock, barrel, recycler, and helipad ramp if present
 const saveX=P.x,saveY=P.y,saveZ=P.z;
 const testPush=(tx,tz,ty)=>{
  P.x=tx+.05;P.z=tz+.05;P.y=(ty!=null?ty:H(tx,tz))+1.7;
  NEAR.length=0;for(const o of things){const dx=o.position.x-P.x,dz=o.position.z-P.z;if(dx*dx+dz*dz<64)NEAR.push(o)}
  collide();
  return +Math.hypot(P.x-tx,P.z-tz).toFixed(3);
 };
 const tr=things.find(o=>o.userData.k==="tree"),rk=things.find(o=>o.userData.k==="rock"),br=things.find(o=>o.userData.k==="barrel"),rc=things.find(o=>o.userData.k==="recycler"),cr=things.find(o=>o.userData.k==="crate");
 const pushes={
  tree:tr?testPush(tr.position.x,tr.position.z,tr.position.y):0,
  rock:rk?testPush(rk.position.x,rk.position.z,rk.position.y):0,
  barrel:br?testPush(br.position.x,br.position.z,br.position.y):0,
  recycler:rc?testPush(rc.position.x,rc.position.z,rc.position.y):0,
  crate:cr?testPush(cr.position.x,cr.position.z,cr.position.y):0
 };
 P.x=LP.x=saveX;P.y=saveY;P.z=LP.z=saveZ;
 return {allc:ALLC.length,staticCols:staticCount,logs:LOGS.length,floating,sunkenRecy,buriedCrates,pushes};
};
window.__bp.grade=()=>{let bad=0,n=0,worst=0,top=null;const sample=typeof Hg==='function'?Hg:H;for(const [k,f] of FD){const parts=String(k).split(',');if(parts.length!==2)continue;const x=+parts[0]*C,z=+parts[1]*C;for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const sx=x+i*.9,sz=z+j*.9,h=sample(sx,sz);n++;const over=h-(f.y-.02);if(over>.04){bad++;if(over>worst){worst=over;top={k,sx:+sx.toFixed(1),sz:+sz.toFixed(1),h:+h.toFixed(2),y:+f.y.toFixed(2),over:+over.toFixed(2)}}}}}return{bad,n,worst:+worst.toFixed(2),grass:GRASSN,shrubs:SHRUBN,forest:FOREST}};
let last=performance.now();
let rafId=0;
function loop(n){if(gen!==GEN)return;const rawDt=(n-last)/1000,dt=Math.max(0,Math.min(.1,rawDt))||0;last=n;if(!window.__bpPause&&!window.__bpPortrait){update(dt);hudT+=dt;if(hudT>=.08){hudT=0;hud()}adaptRes(rawDt);ren.render(scene,cam)}else if(window.__bpSnap){window.__bpSnap=0;update(.016);hud();ren.render(scene,cam)}rafId=requestAnimationFrame(loop)}
rafId=requestAnimationFrame(loop);
return {setGather:v=>{GATHER=v},getGather:()=>GATHER,getDifficulty:()=>DIFFK,difficulties:Object.keys(DIFFS),setDifficulty:k=>{if(!DIFFS[k])return DIFFK;DIFFK=k;DF=DIFFS[k];CAMP_RESPAWN=DF.campResp;for(const c of RCAMPS)if(c.reinforceT>CAMP_RESPAWN)c.reinforceT=CAMP_RESPAWN;persist('manual');say('Difficulty: '+DF.n+'. Raids, camps and settlers use it from now on.');return DIFFK},cheats:()=>toggleCheat(),setPace:v=>setPace(v),getPace:()=>pace,paces:PACES,getClaimName:()=>claimName,setClaimName:nm=>{claimName=String(nm||'').trim()||claimName;persist('manual');return claimName},getSlotId:()=>slotId,setSlotId:id=>{if(id)slotId=id;return slotId},saveNow:(kind)=>{persist(kind||'manual');say('Saved claim: '+claimName+'.');return snapshot()},saveAsNew:(nm)=>{slotId='slot_'+Date.now()+'_'+Math.random().toString(36).slice(2,6);if(nm)claimName=String(nm).trim()||claimName;persist('manual');say('Saved new slot: '+claimName+'.');return snapshot()},getSnapshot:nm=>snapshot(nm),exportSave:()=>{persist('manual');return JSON.stringify(snapshot())},lock:()=>lookLock(true),destroy(){try{if(document.pointerLockElement===cv)document.exitPointerLock()}catch(e){}window.removeEventListener('resize',rs);window.removeEventListener('blur',onBlurClear);document.removeEventListener('visibilitychange',onVis);window.removeEventListener('pointermove',tipGuard);window.removeEventListener('pointerdown',tipGuard);window.removeEventListener('blur',tipGuard);document.removeEventListener('mouseleave',tipGuard);document.removeEventListener('visibilitychange',tipGuard);if(GEN===gen)GEN++;cancelAnimationFrame(rafId);try{ren.dispose();ren.forceContextLoss()}catch(e){}window.__controlsTest=undefined;window.__bp=undefined;root.replaceChildren()}};

}
