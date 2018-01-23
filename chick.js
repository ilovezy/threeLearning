// 兔子
var CHICK = function () {
  this.status = "running";
  this.runningCycle = 0;
  this.mesh = new THREE.Group();
  this.body = new THREE.Group();
  this.mesh.add(this.body);

  // 躯干
  var torsoGeom = new THREE.CubeGeometry(10, 10, 10, 1);
  this.torso = new THREE.Mesh(torsoGeom, chick_brownMat);
  this.torso.position.z = 0;
  this.torso.position.y = 7;
  this.torso.castShadow = true;
  this.body.add(this.torso);

  // 尾巴
  var tailGeom = new THREE.CubeGeometry(3, 3, 3, 1);
  tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -2));
  this.tail = new THREE.Mesh(tailGeom, chick_lightBrownMat);
  this.tail.position.z = -4;
  this.tail.position.y = 5;
  this.tail.castShadow = true;
  this.torso.add(this.tail);

  this.torso.rotation.x = -PI / 8;

  // 头
  var headGeom = new THREE.CubeGeometry(10, 10, 13, 1);
  headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 7.5));
  this.head = new THREE.Mesh(headGeom, chick_brownMat);
  this.head.position.z = 2;
  this.head.position.y = 11;
  this.head.castShadow = true;
  this.body.add(this.head);

  // // 鼻子
  // var noseGeom = new THREE.CubeGeometry(6, 6, 3, 1);
  // this.nose = new THREE.Mesh(noseGeom, chick_lightBrownMat);
  // this.nose.position.z = 13.5;
  // this.nose.position.y = 2.6;
  // this.nose.castShadow = true;
  // this.head.add(this.nose);

  // 嘴
  var mouthGeom = new THREE.CubeGeometry(4, 2, 4, 1);
  mouthGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 3));
  mouthGeom.applyMatrix(new THREE.Matrix4().makeRotationX(PI / 12));
  this.mouth = new THREE.Mesh(mouthGeom, chick_brownMat);
  this.mouth.position.z = 8;
  this.mouth.position.y = -4;
  this.mouth.castShadow = true;
  this.head.add(this.mouth);

  var pawBGeom = new THREE.CubeGeometry(0.5, 0.5, 6, 1);
  this.pawBL = new THREE.Mesh(pawBGeom, new THREE.MeshPhongMaterial({
    color: 'orange',
    shininess: 0,
    shading: THREE.FlatShading,
  }));
  this.pawBL.position.x = 5;
  this.pawBL.position.y = 1.5;
  this.pawBL.position.z = 0;
  this.pawBL.castShadow = false;

  // 鸡爪子
  var clawGeom = new THREE.CubeGeometry(.3, 3.5, 0.3, 1);
  this.claw = new THREE.Mesh(clawGeom,new THREE.MeshPhongMaterial({
    color: 'orange',
    shininess: 0,
    shading: THREE.FlatShading,
  }));
  this.claw.position.x = 0;
  this.claw.position.y = 1.4;
  this.claw.position.z = 3;

  this.claw1 = this.claw.clone()
  this.claw1.position.x = -1
  this.claw1.position.y = 1.4
  this.claw1.position.z = 3
  this.claw1.rotation.z = 13

  this.claw2 = this.claw.clone()
  this.claw2.position.x = 1
  this.claw2.position.y = 1.4
  this.claw2.position.z = 3
  this.claw2.rotation.z = -13

  this.claw3 = this.claw.clone()
  this.claw3.position.x = 0
  this.claw3.position.y = -0.01
  this.claw3.position.z = 3

  this.pawBL.add(this.claw);
  this.pawBL.add(this.claw1);
  this.pawBL.add(this.claw2);
  this.pawBL.add(this.claw3);


  // 复制一个爪子
  this.pawBR = this.pawBL.clone();
  this.pawBR.position.x = -this.pawBL.position.x;
  this.pawBR.castShadow = true;

  this.body.add(this.pawBL);
  this.body.add(this.pawBR);

  // 耳朵
  var earGeom = new THREE.CubeGeometry(7, 18, 2, 1);
  earGeom.vertices[6].x += 4;
  earGeom.vertices[6].z += .5;

  earGeom.vertices[7].x += 4;
  earGeom.vertices[7].z -= 1;

  earGeom.vertices[2].x -= 4;
  earGeom.vertices[2].z -= 1;

  earGeom.vertices[3].x -= 4;
  earGeom.vertices[3].z += .5;

  earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 9, 0));

  this.earL = new THREE.Mesh(earGeom, chick_brownMat);
  this.earL.position.x = 2;
  this.earL.position.z = 2.5;
  this.earL.position.y = 5;
  this.earL.rotation.z = -PI / 12;
  this.earL.castShadow = true;
  this.head.add(this.earL);

  this.earR = this.earL.clone();
  this.earR.position.x = -this.earL.position.x;
  this.earR.rotation.z = -this.earL.rotation.z;
  this.earR.castShadow = true;
  this.head.add(this.earR);

  var eyeGeom = new THREE.CubeGeometry(2, 4, 4);

  this.eyeL = new THREE.Mesh(eyeGeom, chick_whiteMat);
  this.eyeL.position.x = 5;
  this.eyeL.position.z = 5.5;
  this.eyeL.position.y = 2.9;
  this.eyeL.castShadow = false;
  this.head.add(this.eyeL);

  // 虹膜（眼珠子）
  var irisGeom = new THREE.CubeGeometry(.6, 2, 2);
  this.iris = new THREE.Mesh(irisGeom,chick_blackMat);
  this.iris.position.x = 1.2;
  this.iris.position.y = 1;
  this.iris.position.z = 1;
  this.eyeL.add(this.iris);

  this.eyeR = this.eyeL.clone();
  this.eyeR.children[0].position.x = -this.iris.position.x;

  this.eyeR.position.x = -this.eyeL.position.x;
  this.head.add(this.eyeR);

  this.body.traverse(function (object) {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
}
// 兔子开跑
CHICK.prototype.run = function () {
  this.status = "running";

  var s = Math.min(speed, maxSpeed);

  this.runningCycle += delta * s * .7;
  this.runningCycle = this.runningCycle % (PI * 2);
  var t = this.runningCycle;

  var amp = 4;

  // BODY
  this.body.position.y = 6 + Math.sin(t - PI / 2) * amp;
  this.body.rotation.x = .2 + Math.sin(t - PI / 2) * amp * .1;

  this.torso.rotation.x = Math.sin(t - PI / 2) * amp * .1;
  this.torso.position.y = 7 + Math.sin(t - PI / 2) * amp * .5;

  // MOUTH
  this.mouth.rotation.x = PI / 16 + Math.cos(t) * amp * .05;

  // HEAD
  this.head.position.z = 2 + Math.sin(t - PI / 2) * amp * .5;
  this.head.position.y = 8 + Math.cos(t - PI / 2) * amp * .7;
  this.head.rotation.x = -.2 + Math.sin(t + PI) * amp * .1;

  // EARS
  this.earL.rotation.x = Math.cos(-PI / 2 + t) * (amp * .2);
  this.earR.rotation.x = Math.cos(-PI / 2 + .2 + t) * (amp * .3);

  // EYES
  this.eyeR.scale.y = this.eyeL.scale.y = .7 + Math.abs(Math.cos(-PI / 4 + t * .5)) * .6;

  // TAIL
  this.tail.rotation.x = Math.cos(PI / 2 + t) * amp * .3;

  // BACK RIGHT PAW
  this.pawBR.position.y = 1.5 + Math.sin(PI + t) * amp;
  this.pawBR.rotation.x = Math.cos(t + PI * 1.5) * PI / 3;


  this.pawBR.position.z = -Math.cos(PI + t) * amp;

  // BACK LEFT PAW
  this.pawBL.position.y = 1.5 + Math.sin(PI + t) * amp;
  this.pawBL.rotation.x = Math.cos(t + PI * 1.5) * PI / 3;

  this.pawBL.position.z = -Math.cos(PI + t) * amp;
}

// 跳跃
CHICK.prototype.jump = function () {
  if (this.status == "jumping") return;
  this.status = "jumping";
  var _this = this;
  var totalSpeed = CONFIG.flyingTime / speed; // 浮空时间
  var jumpHeight = CONFIG.jumpHeight || 45; // 跳跃高度

  TweenMax.to(this.earL.rotation, totalSpeed, {x: "+=.3", ease: Back.easeOut});
  TweenMax.to(this.earR.rotation, totalSpeed, {x: "-=.3", ease: Back.easeOut});

  TweenMax.to(this.pawBL.rotation, totalSpeed, {x: "+=.7", ease: Back.easeOut});
  TweenMax.to(this.pawBR.rotation, totalSpeed, {x: "-=.7", ease: Back.easeOut});

  TweenMax.to(this.tail.rotation, totalSpeed, {x: "+=1", ease: Back.easeOut});

  TweenMax.to(this.mouth.rotation, totalSpeed, {x: .5, ease: Back.easeOut});

  TweenMax.to(this.mesh.position, totalSpeed / 2, {y: jumpHeight, ease: Power2.easeOut});
  TweenMax.to(this.mesh.position, totalSpeed / 2, {
    y: 0, ease: Power4.easeIn, delay: totalSpeed / 2, onComplete: function () {
      _this.status = "running";
    }
  });
}

// 兔子摇头效果
CHICK.prototype.nod = function () {
  var _this = this;
  var sp = .5 + Math.random();

  // HEAD
  var tHeadRotY = -PI / 6 + Math.random() * PI / 3;
  TweenMax.to(this.head.rotation, sp, {
    y: tHeadRotY, ease: Power4.easeInOut, onComplete: function () {
      _this.nod()
    }
  });

  // EARS
  var tEarLRotX = PI / 4 + Math.random() * PI / 6;
  var tEarRRotX = PI / 4 + Math.random() * PI / 6;

  TweenMax.to(this.earL.rotation, sp, {x: tEarLRotX, ease: Power4.easeInOut});
  TweenMax.to(this.earR.rotation, sp, {x: tEarRRotX, ease: Power4.easeInOut});


  // PAWS BACK LEFT

  var tPawBLRot = Math.random() * PI / 2;
  var tPawBLY = -4 + Math.random() * 8;

  TweenMax.to(this.pawBL.rotation, sp / 2, {x: tPawBLRot, ease: Power1.easeInOut, yoyo: true, repeat: 2});
  TweenMax.to(this.pawBL.position, sp / 2, {y: tPawBLY, ease: Power1.easeInOut, yoyo: true, repeat: 2});


  // PAWS BACK RIGHT

  var tPawBRRot = Math.random() * PI / 2;
  var tPawBRY = -4 + Math.random() * 8;
  TweenMax.to(this.pawBR.rotation, sp / 2, {x: tPawBRRot, ease: Power1.easeInOut, yoyo: true, repeat: 2});
  TweenMax.to(this.pawBR.position, sp / 2, {y: tPawBRY, ease: Power1.easeInOut, yoyo: true, repeat: 2});

  // MOUTH
  var tMouthRot = Math.random() * PI / 8;
  TweenMax.to(this.mouth.rotation, sp, {x: tMouthRot, ease: Power1.easeInOut});
  // IRIS
  var tIrisY = -1 + Math.random() * 2;
  var tIrisZ = -1 + Math.random() * 2;
  var iris1 = this.iris;
  var iris2 = this.eyeR.children[0];
  TweenMax.to([iris1.position, iris2.position], sp, {y: tIrisY, z: tIrisZ, ease: Power1.easeInOut});

  //EYES
  if (Math.random() > .2) TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp / 8, {
    y: 0,
    ease: Power1.easeInOut,
    yoyo: true,
    repeat: 1
  });
}
