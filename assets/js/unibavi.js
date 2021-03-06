  // Global
  var ww = window.innerWidth
    , wh = window.innerHeight
    , autoAnimation      = true
    , cameraSphereRadius = 10
    , friction           = 0.55
    , spring             = 0.85
    , mouseControl       = false;
      
  // Option
  var forceUseCanvas     = false;
      
  // Counters
  var firstTime          = true
    , strokeCounter      =   0
    , strokeDuration     = Modernizr.webgl ? 180 : 900
    , globalCounter      =   0
    , globalRoopDuration = Modernizr.webgl ? 360 : 1800;
      
  // Processing.js
  var p5init             = true;
  
  // Three.js Scene Members  
  var scene
    , renderer
    , camera
    , controls
    , pointLights
    , stroke
    , strokeVertex
    , depth              = []
    , Renderer           = Modernizr.webgl && !forceUseCanvas ? THREE.WebGLRenderer : THREE.CanvasRenderer
    , MeshMaterial       = Modernizr.webgl && !forceUseCanvas ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;
    
  // 2012 winter
  /*
  var particles;
  
  if (Detector.webgl) {
    document.getElementById('console').innerHTML	+= "WebGL Rendrer<br />";
  } else {
    document.getElementById('console').innerHTML	+= "Canvas Renderer<br />";
  }
  */
      
  // Value Holders
  var strokeDefaultPos   = []
    , depthDefaultPos    = []      
    , cameraFriction     = 0.03
    , cameraSpring       = 0.05
    , cameraScale        = 0
    , strokeVertexTarget = []
    , curCamPos          = {x:0, y:0, z:10}
    , nextCamPos         = {x:0, y:0, z:10}
    , speed              = {x:0, y:0, z:0};
      
  // Color Preset Array
  // default
  
  var colorPatternIndexNum = Math.floor( Math.random() * 4 )
  	colorPatternIndexNumRow = Math.floor( Math.random() * 4 )
    , colorPristArray = [
      [
        rgb2hex( 77,  77,  77),
        rgb2hex(204, 204, 204),
        rgb2hex(  0, 104, 183),
        rgb2hex(245, 151,   0)], 
      [
        rgb2hex(217, 217, 217),
        rgb2hex(199,  95,  91),
        rgb2hex(242, 156, 159),
        rgb2hex(255, 246,  26)],
      [
        rgb2hex(255, 234, 240),
        rgb2hex(  0, 187, 236),
        rgb2hex( 44, 110, 213),
        rgb2hex(255, 252, 190)],
      [
        rgb2hex(137, 201, 151),
        rgb2hex(253, 251, 222),
        rgb2hex(131, 106,  74),
        rgb2hex(209, 163,  87)]
      ];
  setup();
  animate();
  
  // 2012 winter
  /*
  var colorPatternIndexNum = 0
    , colorPristArray = [
      [
        rgb2hex(  7, 114,  57),
        rgb2hex(231,  31,  25),
        rgb2hex(255,  31,  25),
        rgb2hex(251, 251, 251)]
      ];
      
  setup();
  animate();
  */
      
  // 2013 new year
  /*
  var colorPatternIndexNum = 0
    , colorPristArray = [
      [
        rgb2hex(229,   0,  28),
        rgb2hex(255, 255, 255),
        rgb2hex(251, 251, 251),
        rgb2hex(255, 255, 255)]
      ];
  setup();
  animate();
  */
  function setup() {
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(45.0, ww / wh, 0.1, 24.0);
    camera.position.z = 10;
    
    scene.add(camera);
    
    // Lights
    var pointLight1 = new THREE.PointLight(0xffffff)
      , pointLight2 = new THREE.PointLight(0xffffff)
      , pointLight3 = new THREE.PointLight(0xffffff)
      , pointLight4 = new THREE.PointLight(0xffffff);
      
    pointLights = new THREE.Object3D();

    pointLight1.position.x = 10;
    pointLight1.position.y = 0;
    pointLight1.position.z = 0;
    
    pointLight2.position.x = -10;
    pointLight2.position.y = 0;
    pointLight2.position.z = 0;
    
    pointLight3.position.x = 0;
    pointLight3.position.y = 0;
    pointLight3.position.z = 10;
    
    pointLight4.position.x = 0;
    pointLight4.position.y = 0;
    pointLight4.position.z = -10;
    
    pointLights.add(pointLight1);
    pointLights.add(pointLight2);
    pointLights.add(pointLight3);
    pointLights.add(pointLight4);
    
    scene.add(pointLights);  	
    
    // Stroke
    var strokeGeom = new THREE.Geometry();
    strokeGeom.vertices.push(         
      // U
      v(  0,  0,  0), v(  0,200,  0),
      v(  0,200,  0), v(100,200,  0),
      v(100,200,  0), v(100,  0,  0),         
      // U-N
      v(100,  0,  0), v(200,200,  0),
      // N
      v(200,200,  0), v(200,  0,  0),
      v(200,  0,  0), v(300,  0,  0),
      v(300,  0,  0), v(300,200,  0),         
      // N-I
      v(300,200,  0), v(400,  0,  0),
      // I
      v(400,  0,  0), v(400,200,  0),     
      // I-B
      v(400,200,  0), v(500,  0,  0),
      // B
      v(500,  0,  0), v(500,300,  0),
      v(500,300,  0), v(600,200,  0),
      v(600,200,  0), v(600,100,  0),
      v(600,100,  0), v(500,100,  0),
      // B-A
      v(500,100,  0), v(700,  0,  0),     
      // A
      v(700,  0,  0), v(800,  0,  0),
      v(800,  0,  0), v(800,200,  0),
      v(800,200,  0), v(700,200,  0),
      v(700,200,  0), v(700,100,  0),
      v(700,100,  0), v(800,100,  0)
    );
    
    var material = new THREE.LineBasicMaterial({color: 0x000000, lineWidth: 1.25});
    
    stroke = new THREE.Line(strokeGeom, material);
    stroke.type = THREE.Lines;                
    for (var i in stroke.geometry.vertices) {
      var lv = {};
      lv.x = stroke.geometry.vertices[i].x;
      lv.y = stroke.geometry.vertices[i].y;
      lv.z = stroke.geometry.vertices[i].z;
      strokeDefaultPos[i] = lv;
    }
    stroke.rotation.x = Math.PI;
    
    scene.add(stroke);
    
    if (!Detector.webgl) {
      stroke.position.z = 0.0001;
    }
    
    // Stroke Vertex
    if (Detector.webgl) {
      var strokeVertexGeometry = new THREE.SphereGeometry(0.02, 6, 6)
        , strokeVertexMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
      
      strokeVertex = new THREE.Object3D();
      strokeVertex.rotation.x = Math.PI;
      
      for (var i=0, maxi=stroke.geometry.vertices.length; i<maxi; i++) {
        var lv = {}
          , mesh = new THREE.Mesh(strokeVertexGeometry, strokeVertexMaterial);
  
        mesh.position.x = stroke.geometry.vertices[i].x;
        mesh.position.y = stroke.geometry.vertices[i].y;
        mesh.position.z = stroke.geometry.vertices[i].z;
        
        strokeVertex.add(mesh);
      }
      
      scene.add(strokeVertex);
    }
   
    // Depth Rhombus
    var g1 = new THREE.Geometry();
    g1.vertices.push(
      // U
      v(  0,  0,  0), v(  0,200,  0),
      v(-80, 80, 80), v(-80,280, 80));
    var g2 = new THREE.Geometry();
    g2.vertices.push(
      // U
      v(  0,200,  0), v(100,200,  0),
      v(-80,280, 80), v( 20,280, 80));
    var g3 = new THREE.Geometry();
    g3.vertices.push(
      // U
      v(100,200,  0), v(100,  0,  0),
      v( 20,280, 80), v( 20, 80, 80));
    var g4 = new THREE.Geometry();
    g4.vertices.push(
      // N
      v(200,200,  0), v(200,  0,  0),
      v(120,280, 80), v(120, 80, 80));
    var g5 = new THREE.Geometry();
    g5.vertices.push(
      // N
      v(200,  0,  0), v(300,  0,  0),
      v(120, 80, 80), v(220, 80, 80));
    var g6 = new THREE.Geometry();
    g6.vertices.push(
      // N
      v(300,  0,  0), v(300,200,  0),
      v(220, 80, 80), v(220,280, 80));
    var g7 = new THREE.Geometry();
    g7.vertices.push(
      // I
      v(400,  0,  0), v(400,200,  0),
      v(320, 80, 80), v(320,280, 80));
    var g8 = new THREE.Geometry();
    g8.vertices.push(
      // B
      v(500,  0,  0), v(500,300,  0),
      v(420, 80, 80), v(420,380, 80));
    var g9 = new THREE.Geometry();
    g9.vertices.push(
      // B
      v(500,300,  0), v(600,200,  0),
      v(420,380, 80), v(520,280, 80));
    var g10 = new THREE.Geometry();
    g10.vertices.push(
      // B
      v(600,200,  0), v(600,100,  0),
      v(520,280, 80), v(520,180, 80));
    var g11 = new THREE.Geometry();
    g11.vertices.push(
      // B
      v(600,100,  0), v(500,100,  0),
      v(520,180, 80), v(420,180, 80));
    var g12 = new THREE.Geometry();
    g12.vertices.push(
      // A
      v(700,  0,  0), v(800,  0,  0),
      v(620, 80, 80), v(720, 80, 80));
    var g13 = new THREE.Geometry();
    g13.vertices.push(
      // A
      v(800,  0,  0), v(800,200,  0),
      v(720, 80, 80), v(720,280, 80));
    var g14 = new THREE.Geometry();
    g14.vertices.push(
      // A
      v(800,200,  0), v(700,200,  0),
      v(720,280, 80), v(620,280, 80));
    var g15 = new THREE.Geometry();
    g15.vertices.push(
      // A
      v(700,200,  0), v(700,100,  0),
      v(620,280, 80), v(620,180, 80));
    var g16 = new THREE.Geometry();
    g16.vertices.push(
      // A
      v(700,100,  0), v(800,100,  0),
      v(620,180, 80), v(720,180, 80));
    
    g1 = setFParams(g1);      
    g2 = setFParams(g2);
    g3 = setFParams(g3);
    g4 = setFParams(g4);
    g5 = setFParams(g5);
    g6 = setFParams(g6);
    g7 = setFParams(g7);
    g8 = setFParams(g8);
    g9 = setFParams(g9);
    g10 = setFParams(g10);
    g11 = setFParams(g11);
    g12 = setFParams(g12);
    g13 = setFParams(g13);
    g14 = setFParams(g14);
    g15 = setFParams(g15);
    g16 = setFParams(g16);
    
    f1 = new THREE.Mesh(g1, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f2 = new THREE.Mesh(g2, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f3 = new THREE.Mesh(g3, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f4 = new THREE.Mesh(g4, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f5 = new THREE.Mesh(g5, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f6 = new THREE.Mesh(g6, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f7 = new THREE.Mesh(g7, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f8 = new THREE.Mesh(g8, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f9 = new THREE.Mesh(g9, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f10 = new THREE.Mesh(g10, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f11 = new THREE.Mesh(g11, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f12 = new THREE.Mesh(g12, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f13 = new THREE.Mesh(g13, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f14 = new THREE.Mesh(g14, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f15 = new THREE.Mesh(g15, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));
    f16 = new THREE.Mesh(g16, new MeshMaterial({ color: parseInt(colorPristArray[colorPatternIndexNum][Math.floor(Math.random() * 4)], 16), overdraw: true, side: 2 }));  
    
    depth.push(f1);
    depth.push(f2);
    depth.push(f3);
    depth.push(f4);
    depth.push(f5);
    depth.push(f6);
    depth.push(f7);
    depth.push(f8);
    depth.push(f9);
    depth.push(f10);
    depth.push(f11);
    depth.push(f12);
    depth.push(f13);
    depth.push(f14);
    depth.push(f15);
    depth.push(f16);       
           
    for (var i in depth) {
      //depth[i].doubleSided = true;
      depth[i].rotation.x = Math.PI;
      depth[i].bang  = false;
      depth[i].speedX = 0.4;
      depth[i].speedY = 0.4;
      depth[i].speedZ = 0.4;
      
      scene.add(depth[i]);
      
      // making array will be called like this 'depthDefaultPos[i][j].x' ...
      var fv = [],
          dv = depth[i].geometry.vertices;
      for (var j in dv) {
        var fgv = {};
        fgv.x = dv[j].x;
        fgv.y = dv[j].y;
        fgv.z = dv[j].z;
        fv.push(fgv);
      }
      
      depthDefaultPos[i] = fv;
    }
    
    renderer = new Renderer({antialias: true});
    renderer.setSize(ww, wh);
    document.getElementById('webglcontainer').appendChild(renderer.domElement);
    
    // add Stats.js
    stats = new Stats();
		stats.domElement.style.position	= 'absolute';
		stats.domElement.style.bottom	= '0px';
		// document.body.appendChild(stats.domElement);
		
		// allow 'p' to make screenshot
		THREEx.Screenshot.bindKey(renderer);
		document.getElementById('console').innerHTML	+= "- <i>p</i> for screenshot<br />";
		// allow 'o' to make screenshot of background
		document.onkeydown = function(e) { 
      var shift, ctrl; 
      // Mozilla(Firefox, NN) and Opera 
      if (e != null) { 
        keycode = e.which; 
        ctrl = typeof e.modifiers == 'undefined' ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK; 
        shift = typeof e.modifiers == 'undefined' ? e.shiftKey : e.modifiers & Event.SHIFT_MASK; 
      // Internet Explorer 
      } else { 
        keycode = event.keyCode; 
        ctrl = event.ctrlKey; 
        shift = event.shiftKey;
      }
      keychar = String.fromCharCode(keycode).toUpperCase(); 
      if (keychar == "O" && p5) { 
        p5.captureScreen();
      }
      if (keychar == "D" && p5) { 
        var windowWidth = $(window).width();
  			var windowHeight = $(window).height();
  			var windowScale = 1;
  			p5.setStageSize(windowWidth, windowHeight, windowScale);
      }
    }
    document.getElementById('console').innerHTML	+= "- <i>o</i> for screenshot of background (firefox nightly, webkit nightly and chrome stable only)<br />";
		
		// allow 'f' to go fullscreen where this feature is supported
  	if( THREEx.FullScreen.available() ){
  		THREEx.FullScreen.bindKey();		
  		document.getElementById('console').innerHTML	+= "- <i>f + d</i> for fullscreen<br />";
  	}
    
    // Three.js TrackballControls
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    
    renderer.domElement.addEventListener('mousedown', autoCameraOff);
    renderer.domElement.addEventListener('mouseup', autoCameraOn);
    
    var timer;
    
    function autoCameraOff() {
      clearTimeout(timer);
      mouseControl = true;
    }

    function autoCameraOn() {
      clearTimeout(timer);
      timer = setTimeout("mouseControl = false", 5000);
    }
    
    function setFParams(g) {
      g.faces.push(f4(0, 2, 3, 1));    
      g.computeCentroids();
      g.computeFaceNormals();
      g.faceUvs = [[]];
      g.faceVertexUvs = [[]];
      g.dynamic = true;
      
      for (var i in g.faces) {
        var faceuv = [
          new THREE.Vector2(0, 1),
          new THREE.Vector2(1, 1),
          new THREE.Vector2(1, 0),
          new THREE.Vector2(0, 0)
        ]
        g.faceVertexUvs[0].push(faceuv);
      }
      
      return g;
    }
  	
    // 2012 winter particle
    /* 
    var particle = new THREE.Geometry()
      , material = new THREE.ParticleBasicMaterial( { color: 0xC1AD84, size: 0.1 } );
    
  	for (var i=0, imax=1000; i<imax; i++) {
      particle.vertices.push(new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10));
  	}
  	particle.dynamic = true;
  	
  	particles = new THREE.ParticleSystem(particle, material);
  	
  	scene.add(particles);
  	*/
  	
  }
  
  function animate() {
    requestAnimationFrame(animate);
    stats.update();
    render();
  }
  
  function render() {
    strokeUpdate();
    depthRhombusUpdate();
    dividedBackgroundUpdate();
    lightsUpdte();
    counterUpdate();
    
    // 2012 winter
    //snowUpdate();
    
    if (mouseControl) {
      controls.update();
    } else {
      cameraUpdate();
    }
    
    renderer.render(scene, camera);

    function cameraUpdate() {
      var ax
        , ay
        , az;
      
      curCamPos.x = camera.position.x;
      curCamPos.y = camera.position.y;
      curCamPos.z = camera.position.z;
      
      ax = (nextCamPos.x - curCamPos.x) * cameraSpring;
      speed.x += ax;
      speed.x *= cameraFriction;
      curCamPos.x += speed.x;  
      
      ay = (nextCamPos.y - curCamPos.y) * cameraSpring;
      speed.y += ay;
      speed.y *= cameraFriction;
      curCamPos.y += speed.y;
      
      az = (nextCamPos.z - curCamPos.z) * cameraSpring;
      speed.z += az;
      speed.z *= cameraFriction;
      curCamPos.z += speed.z;
      
      camera.position.x = curCamPos.x;
      camera.position.y = curCamPos.y;
      camera.position.z = curCamPos.z;
      camera.lookAt({x:0, y:0, z:0});
      
      if (firstTime) {
        // nanimosinai
      } else if (0 == globalCounter % 300) {
           
        var vector = new THREE.Vector3(Math.random()*0.4-0.2, Math.random()*0.2-0.1, Math.random());
        
        cameraScale = Math.random() * 0.3 - 0.1;
        vector.setLength(cameraSphereRadius + cameraSphereRadius * cameraScale);
        nextCamPos.x = vector.x;
        nextCamPos.y = vector.y;
        nextCamPos.z = vector.z;
        cameraFriction = Math.random() * 0.3 + 0.14;
        cameraSpring = 0.85 + Math.random() * 0.24;
        
      } else if (0 == globalCounter % 50) {     
        
        var vector = new THREE.Vector3(Math.random()*2-1, Math.random()*2-1, Math.random()*2-1);
        vector.setLength(cameraSphereRadius * 0.2 - 0.1);
        nextCamPos.x += vector.x;
        nextCamPos.y += vector.y;
        nextCamPos.z += vector.z;
        cameraFriction = Math.random() * 0.125;
        cameraSpring = 0.75 + Math.random() * 0.0125;
      }
    }
    
    function strokeUpdate() {
      if (strokeCounter != strokeDuration) {
        var maxLength      = strokeDefaultPos.length / 2,
            currentLength  = maxLength * strokeCounter / strokeDuration,
            currentVertice = Math.floor(currentLength) * 2,
            targetPosX = strokeDefaultPos[currentVertice].x + (strokeDefaultPos[currentVertice + 1].x - strokeDefaultPos[currentVertice].x) * ((currentLength * 2 - currentVertice) / 2),
            targetPosY = strokeDefaultPos[currentVertice].y + (strokeDefaultPos[currentVertice + 1].y - strokeDefaultPos[currentVertice].y) * ((currentLength * 2 - currentVertice) / 2),
            targetPosZ = strokeDefaultPos[currentVertice].z + (strokeDefaultPos[currentVertice + 1].z - strokeDefaultPos[currentVertice].z) * ((currentLength * 2 - currentVertice) / 2);
        
        stroke.geometry.verticesNeedUpdate = true;
        
        for (var i=0, imax=stroke.geometry.vertices.length; i<imax; i++) {
          var sv = stroke.geometry.vertices[i];
          if (i <= currentVertice) {
            sv.x = strokeDefaultPos[i].x;
            sv.y = strokeDefaultPos[i].y;
            sv.z = strokeDefaultPos[i].z;
          } else {
            sv.x = targetPosX;
            sv.y = targetPosY;
            sv.z = targetPosZ;
          }
        }
        
        if (Detector.webgl) {
          // Stroke Vertex
          var targetScale;
          if (firstTime) {
            targetScale = 2.0;
          } else {
            targetScale = 1.0;
          }
          for (var i=0, imax = strokeVertex.children.length; i<imax; i++) {
            var vc = strokeVertex.children[i];
            if (i <= currentVertice) {
              vc.scale.x = targetScale;
              vc.scale.y = targetScale;
              vc.scale.z = targetScale;
            } else {
              vc.scale.x = 0.001;
              vc.scale.y = 0.001;
              vc.scale.z = 0.001;
            }
          }
        }
        
      } else if (strokeCounter == strokeDuration) {
      
        stroke.geometry.verticesNeedUpdate = true;
      
        for(i in stroke.geometry.vertices) {
          stroke.geometry.vertices[i].x = strokeDefaultPos[i].x;
          stroke.geometry.vertices[i].y = strokeDefaultPos[i].y;
          stroke.geometry.vertices[i].z = strokeDefaultPos[i].z;    
        }
        
        if (Detector.webgl) {
          // Stroke Vertex
          for (var i=0, iamx=strokeVertex.children.length; i<imax; i++) {
            strokeVertexTarget[i] = 0.001;
          }
          for (var i=0, imax=strokeVertex.children.length; i<imax; i++) {
            var cs = strokeVertex.children[i].scale
              , vt = strokeVertexTarget[i];
            cs.x += (vt - cs.x) * 0.05;
            cs.y += (vt - cs.y) * 0.05;
            cs.z += (vt - cs.z) * 0.05;
          }
        }
        
      }
    }
    
    function depthRhombusUpdate() {
      if (!firstTime && globalCounter % 50 === 0) {
        var flag = true
          , count = 0;
            
        while (flag) {
          var rnd = Math.floor(Math.random() * depth.length);
          
          if (depth[rnd].bang == false) {
            depth[rnd].bang = true;
            flag = false;
          }
          
          count++;
          
          if (count > depth.length) {
            flag = false;
          }
        }
      } else if (!firstTime && globalCounter % strokeDuration === 0 && Math.random() < 0.1) {  
        for (var i=0; i < depth.length; i++) {
            depth[i].bang = false;
        }
      } else if (globalCounter > strokeDuration && globalCounter % 5 === 0) {
        var flag = true
          , count = 0;
            
        while (flag) {
          var rnd = Math.floor(Math.random() * depth.length);
          
          if (depth[rnd].bang == false) {
            depth[rnd].bang = true;
            flag = false;
          }
          
          count++;
          
          if (count > depth.length) {
            flag = false;
          }
        }
      }
      
      for (var i in depth) {
        var dp = depth[i]
          , dpv = dp.geometry.vertices;
        dp.geometry.verticesNeedUpdate = true;
                
        if (dp.bang && Math.abs(depthDefaultPos[i][2].x - dpv[2].x) > 0.0001) {
          var ax, ay, az, bx, by, bz;
          ax = (depthDefaultPos[i][2].x - dpv[2].x) * spring;
          dp.speedX += ax;
          dp.speedX *= friction;
          dpv[2].x += dp.speedX;
          
          ay = (depthDefaultPos[i][2].y - dpv[2].y) * spring;
          dp.speedY += ay;
          dp.speedY *= friction;
          dpv[2].y += dp.speedY;
          
          az = (depthDefaultPos[i][2].z - dpv[2].z) * spring;
          dp.speedZ += az;
          dp.speedZ *= friction;
          dpv[2].z += dp.speedZ;
          
          bx = (depthDefaultPos[i][3].x - dpv[3].x) * spring;
          dp.speedX += bx;
          dp.speedX *= friction;
          dpv[3].x += dp.speedX;
          
          by = (depthDefaultPos[i][3].y - dpv[3].y) * spring;
          dp.speedY += by;
          dp.speedY *= friction;
          dpv[3].y += dp.speedY;
          
          bz = (depthDefaultPos[i][3].z - dpv[3].z) * spring;
          dp.speedZ += bz;
          dp.speedZ *= friction;
          dpv[3].z += dp.speedZ;         
        } else if (!dp.bang) {
          var ddp = depthDefaultPos[i];
          dpv[2].x = ddp[0].x;
          dpv[2].y = ddp[0].y;
          dpv[2].z = ddp[0].z;
          dpv[3].x = ddp[1].x;
          dpv[3].y = ddp[1].y;
          dpv[3].z = ddp[1].z;
        }
      }
    }
    
    function lightsUpdte() {
      pointLights.rotation.x = camera.rotation.x;
      pointLights.rotation.y = camera.rotation.y;
      pointLights.rotation.z = camera.rotation.z;
    }
    
    function counterUpdate() {
      if (autoAnimation) {        
        globalCounter++;
        strokeCounter++;
      }
      if (!Detector.webgl) {
        globalCounter += 4;
        strokeCounter += 4;
      } 
      if (strokeCounter > strokeDuration) {
        strokeCounter = strokeDuration;
      }
      if (!firstTime && globalCounter > globalRoopDuration) {
        globalCounter = 0;
        strokeCounter = 0;
      } else if (Detector.webgl && globalCounter > 400) {
        globalCounter = 0;
        strokeCounter = 0;
        firstTime = false;
      } else if (!Detector.webgl && globalCounter > 2000) {
        globalCounter = 0;
        strokeCounter = 0;
        firstTime = false;
      }
    }
    
    function dividedBackgroundUpdate() {      
      // Initializing Processing.js Canvas
      if (window.p5 && p5init) {
      
        var cpa = colorPristArray[colorPatternIndexNum];

        //random
        for (var i=0, imax=4; i<imax; i++) {
          var bgcolor = cpa.splice(Math.floor(Math.random() * cpa.length), 1)
            , r = parseInt(bgcolor[0].slice(2, 4), 16)
            , g = parseInt(bgcolor[0].slice(4, 6), 16)
            , b = parseInt(bgcolor[0].slice(6, 8), 16);
          p5.setBgColor(r, g, b, i);
        }
        
        /*
        // 2012 winter
        p5.setBgColor(255, 255, 255, 0);
        p5.setBgColor(251, 251, 251, 1);
        p5.setBgColor(255, 255, 255, 2);
        p5.setBgColor(251, 251, 251, 3);
        */
        
        p5.setSize(ww, wh);
        p5init = false;
        console.log("p5 initialized");
        // this code have to replace in future from
        for (var i in depth) {
          depth[i].bang = false;
        }
        // this code have to replace in future to
      }
      
      // Update Processing.js Canvas
      if (window.p5) {
        p5.updateBgAngle(camera.rotation.x, camera.rotation.y, camera.rotation.z);
      }  
    }
    
    // 2012 winter
    /*
    function snowUpdate() {
      for (var i=0, imax=particles.geometry.vertices.length; i<imax; i++) {
        var particle = particles.geometry.vertices[i];
        
        particle.x += Math.random() * 0.004 - 0.003;
        particle.y -= Math.random() * 0.009;
        particle.z += Math.random() * 0.004 - 0.003;
        
        if (particle.y < -10) {
          particle.x = Math.random() * 20 - 10;
          particle.y = 10;
          particle.z = Math.random() * 20 - 10;
        }
      }
      particles.geometry.verticesNeedUpdate = true;
    }
    */
    
  }
  
  function rgb2hex(r, g, b) {
    return '0x' + (((256 + r << 8) + g << 8) + b).toString(16).slice(1);
  }

  function v(x, y, z) {
    var v = new THREE.Vector3( x/100 - 4, y/100 - 2, z/100 );
    return v;
  }
    
  function f4(a, b, c, d) {
    var f = new THREE.Face4(a, b, c, d);
    return f;
  }