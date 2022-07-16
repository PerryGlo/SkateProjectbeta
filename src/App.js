import React, { Component } from 'react';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './App.css'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scale_y: 1, val_offset: 0, offsetRange: 0, globalColor: false, scaleRange: 0, activeOption: 'body_skateboard_top_panel01', theModel: ""
            , showControls: false
        };

    }

    /*     document.getElementById("scale").addEventListener("change", (e) => {
            console.log(e.target.value);
    
            scale_y = 1 - e.target.value * 0.01;
            liveChanges();
        })
    document.getElementById("offset").addEventListener("change", (e) => {
        console.log(e.target.value);
    
        val_offset = e.target.value * 0.01;
        liveChanges();
    }) */


    componentDidMount() {
        const { scale_y, val_offset } = this.state;
        const changeState = (val) => {
            this.setState(val)
        };

        const LOADER = document.getElementById('js-loader');
        const colors = [
            {
                texture: 'img/wood_.jpg',
                size: [2, 2, 2],
                shininess: 60
            },

            {
                texture: 'img/fabric_.jpg',
                size: [4, 4, 4],
                shininess: 0
            },

            {
                texture: 'img/pattern_.jpg',
                size: [8, 8, 8],
                shininess: 10
            },

            {
                texture: 'img/denim_.jpg',
                size: [3, 3, 3],
                shininess: 0
            },

            {
                texture: 'img/quilt_.jpg',
                size: [6, 6, 6],
                shininess: 0
            },

            {
                color: '131417'
            },

            {
                color: '374047'
            },

            {
                color: '5f6e78'
            },

            {
                color: '7f8a93'
            },

            {
                color: '97a1a7'
            },

            {
                color: 'acb4b9'
            },

            {
                color: 'DF9998'
            },

            {
                color: '7C6862'
            },

            {
                color: 'A3AB84'
            },

            {
                color: 'D6CCB1'
            },

            {
                color: 'F8D5C4'
            },

            {
                color: 'A3AE99'
            },

            {
                color: 'EFF2F2'
            },

            {
                color: 'B0C5C1'
            },

            {
                color: '8B8C8C'
            },

            {
                color: '565F59'
            },

            {
                color: 'CB304A'
            },

            {
                color: 'FED7C8'
            },

            {
                color: 'C7BDBD'
            },

            {
                color: '3DCBBE'
            },

            {
                color: '264B4F'
            },

            {
                color: '389389'
            },

            {
                color: '85BEAE'
            },

            {
                color: 'F2DABA'
            },

            {
                color: 'F2A97F'
            },

            {
                color: 'D85F52'
            },

            {
                color: 'D92E37'
            },

            {
                color: 'FC9736'
            },

            {
                color: 'F7BD69'
            },

            {
                color: 'A4D09C'
            },

            {
                color: '4C8A67'
            },

            {
                color: '25608A'
            },

            {
                color: '75C8C6'
            },

            {
                color: 'F5E4B7'
            },

            {
                color: 'E69041'
            },

            {
                color: 'E56013'
            },

            {
                color: '11101D'
            },

            {
                color: '630609'
            },

            {
                color: 'C9240E'
            },

            {
                color: 'EC4B17'
            },

            {
                color: '281A1C'
            },

            {
                color: '4F556F'
            },

            {
                color: '64739B'
            },

            {
                color: 'CDBAC7'
            },

            {
                color: '946F43'
            },

            {
                color: '66533C'
            },

            {
                color: '173A2F'
            },

            {
                color: '153944'
            },

            {
                color: '27548D'
            },

            {
                color: '438AAC'
            }];
        var lastSelectedColorKey;
        const TRAY = document.getElementById('js-tray-slide');
        const DRAG_NOTICE = document.getElementById('js-drag-notice');
        var isuploaded = false;
        var theModel;

        const MODEL_PATH = "model.gltf";

        var activeOption = 'body_skateboard_top_panel01';
        var loaded = false;


        var pickerColor = '';
        var repeat = false;
        const BACKGROUND_COLOR = 0xf1f1f1;
        // Init the scene
        const scene = new THREE.Scene();
        // Set background
        scene.background = new THREE.Color(BACKGROUND_COLOR);
        // scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

        const canvas = document.querySelector('#c');

        // Init the renderer
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);

        var cameraFar = 155;

        document.body.appendChild(renderer.domElement);

        // Add a camerra
        var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = cameraFar;
        camera.position.x = 0;

        // Initial material
        const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });

        const INITIAL_MAP = [
            { childID: "body_skateboard_bottom_panel01", mtl: INITIAL_MTL },
            { childID: "skateboard_wheels01", mtl: INITIAL_MTL },
            { childID: "skateboard_wheels_part_01", mtl: INITIAL_MTL },
            { childID: "skateboard_wheels_part_02", mtl: INITIAL_MTL },
            { childID: "body_skateboard_top_panel01", mtl: INITIAL_MTL },
            { childID: "body_skateboard_top_panel_bolts01", mtl: INITIAL_MTL },
        ]


        // Init the object loader
        var loader = new GLTFLoader();

        loader.load(MODEL_PATH, function (gltf) {
            console.log({ gltf })
            theModel = gltf.scene;
            changeState({ theModel });

            theModel.traverse(o => {
                if (o.isMesh) {
                    o.castShadow = true;
                    o.receiveShadow = true;
                }
            });

            // Set the models initial scale
            theModel.scale.set(2, 2, 2);
            theModel.rotation.y = Math.PI;

            // Offset the y position a bit
            theModel.position.y = -1;

            // Set initial textures
            for (let object of INITIAL_MAP) {
                initColor(theModel, object.childID, object.mtl);
            }

            // Add the model to the scene
            scene.add(theModel);

            // Remove the loader
            LOADER.remove();

        }, undefined, function (error) {
            console.error(error);
        });

        // Function - Add the textures to the models
        function initColor(parent, type, mtl) {
            parent.traverse(o => {
                if (o.isMesh) {
                    if (o.name.includes(type)) {
                        o.material = mtl;
                        o.nameID = type; // Set a new property to identify this object
                    }
                }

            });
        }

        // Add lights
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene
        scene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // Add directional Light to scene
        scene.add(dirLight);

        // Floor
        var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        var floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xeeeeee,
            shininess: 0
        });


        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI;
        floor.receiveShadow = true;
        floor.position.y = -1;
        scene.add(floor);

        // Add controls
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = Math.PI / 3;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.dampingFactor = 0.1;
        controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
        controls.autoRotateSpeed = 0.2; // 30

        function animate() {

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            if (theModel != null && loaded === false) {
                initialRotation();
                DRAG_NOTICE.classList.add('start');
            }
        }

        animate();

        // Function - New resizing method
        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            var width = window.innerWidth;
            var height = window.innerHeight;
            var canvasPixelWidth = canvas.width / window.devicePixelRatio;
            var canvasPixelHeight = canvas.height / window.devicePixelRatio;

            const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
            if (needResize) {

                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        // Function - Build Colors

        function buildColors(colors) {
            TRAY.innerHTML = '';
            for (let [i, color] of colors.entries()) {
                let swatch = document.createElement('div');
                swatch.classList.add('tray__swatch');

                if (color.texture) {
                    swatch.style.backgroundImage = "url(" + color.texture + ")";
                } else {
                    swatch.style.background = "#" + color.color;
                }

                swatch.setAttribute('data-key', i);
                TRAY.append(swatch);
            }
        }

        buildColors(colors);

        // Select Option
        const options = document.querySelectorAll(".option");

        for (const option of options) {
            option.addEventListener('click', selectOption);
        }

        function selectOption(e) {
            let option = e.target;
            activeOption = e.target.dataset.option;
            changeState({ activeOption })
            for (const otherOption of options) {
                otherOption.classList.remove('--is-active');
            }
            option.classList.add('--is-active');
            if ((activeOption === 'body_skateboard_top_panel01' || activeOption === 'body_skateboard_bottom_panel01') && !isuploaded) {
                document.querySelector('.uploadImageBlock').style.display = 'block';
            } else if ((activeOption === 'body_skateboard_top_panel01' || activeOption === 'body_skateboard_bottom_panel01') && isuploaded) {
                document.querySelector('.uploadImageBlock').style.display = 'none';
                document.querySelector('.uploadedImageBlock').style.display = 'block';
            }
            if (activeOption !== 'body_skateboard_top_panel01' && activeOption !== 'body_skateboard_bottom_panel01') {
                document.querySelector('.uploadImageBlock').style.display = 'none';
                document.querySelector('.uploadedImageBlock').style.display = 'none';
            }
        }

        // Swatches

        function registerEvents() {
            const swatches = document.querySelectorAll(".tray__swatch");
            for (const swatch of swatches) {
                swatch.addEventListener('click', selectSwatch);
            }
        }

        registerEvents();

        function selectSwatch(e, key1 = '') {
            console.log(this);
            let color;
            if (e) {
                let key = e.target.dataset.key;
                lastSelectedColorKey = key;
                color = colors[parseInt(key)];
            } else {
                color = colors[parseInt(key1)];
            }

            changeState({ globalColor: color });
            let new_mtl;
            if (color.texture) {
                let txt = new THREE.TextureLoader().load(color.texture);
                if (activeOption == 'body_skateboard_bottom_panel01') {
                    txt.repeat.set(3, scale_y);
                    txt.offset.set(0.2, val_offset);
                }
                else {
                    txt.repeat.set(1, scale_y);
                    txt.offset.set(0, val_offset);
                }
                if (repeat) {
                    txt.repeat.set(color.size[0], color.size[1], color.size[2]);
                    txt.wrapS = THREE.RepeatWrapping;
                    txt.wrapT = THREE.RepeatWrapping;
                }
                if (pickerColor) {
                    new_mtl = new THREE.MeshPhongMaterial({
                        color: parseInt('0x' + pickerColor.substring(1)),
                        map: txt,
                        shininess: color.shininess ? color.shininess : 10
                    });
                } else {
                    new_mtl = new THREE.MeshPhongMaterial({
                        map: txt,
                        shininess: color.shininess ? color.shininess : 10
                    });
                }

            } else {
                new_mtl = new THREE.MeshPhongMaterial({
                    color: parseInt('0x' + color.color),
                    shininess: color.shininess ? color.shininess : 10
                });
            }
            setMaterial(theModel, activeOption, new_mtl);
        }

        function setMaterial(parent, type, mtl) {
            parent.traverse(o => {
                if (o.isMesh && o.nameID != null) {
                    if (o.nameID === type) {
                        o.material = mtl;
                    }
                }
            });
        }

        // Function - Opening rotate
        let initRotate = 0;

        function initialRotation() {
            initRotate++;
            if (initRotate <= 120) {
                theModel.rotation.y += Math.PI / 60;
            } else {
                loaded = true;
            }
        }

        var slider = document.getElementById('js-tray'),
            sliderItems = document.getElementById('js-tray-slide'),
            difference;

        function slide(wrapper, items) {
            var posX1 = 0,
                posX2 = 0,
                posInitial,
                threshold = 20,
                posFinal;

            // Mouse events
            items.onmousedown = dragStart;

            // Touch events
            items.addEventListener('touchstart', dragStart);
            items.addEventListener('touchend', dragEnd);
            items.addEventListener('touchmove', dragAction);


            function dragStart(e) {
                e = e || window.event;
                posInitial = items.offsetLeft;
                difference = sliderItems.offsetWidth - slider.offsetWidth;
                difference = difference * -1;

                if (e.type === 'touchstart') {
                    posX1 = e.touches[0].clientX;
                } else {
                    posX1 = e.clientX;
                    document.onmouseup = dragEnd;
                    document.onmousemove = dragAction;
                }
            }

            function dragAction(e) {
                e = e || window.event;

                if (e.type === 'touchmove') {
                    posX2 = posX1 - e.touches[0].clientX;
                    posX1 = e.touches[0].clientX;
                } else {
                    posX2 = posX1 - e.clientX;
                    posX1 = e.clientX;
                }

                if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
                    items.style.left = items.offsetLeft - posX2 + "px";
                }
            }

            function dragEnd(e) {
                posFinal = items.offsetLeft;
                if (posFinal - posInitial < -threshold) {

                } else if (posFinal - posInitial > threshold) {

                } else {
                    items.style.left = posInitial + "px";
                }

                document.onmouseup = null;
                document.onmousemove = null;
            }

        }

        slide(slider, sliderItems);


        const colorPicker = document.querySelector('#colorPicker');
        colorPicker.addEventListener('change', (event) => {
            pickerColor = event.target.value;
            selectSwatch(null, lastSelectedColorKey);
        });
        const checkbox = document.querySelector("input[name=repeat]");
        checkbox.addEventListener('change', function () {
            repeat = this.checked;
            selectSwatch(null, lastSelectedColorKey);
        });
        const imgUpload = document.querySelector('#img_upload');
        imgUpload.addEventListener('change', (event) => {
            document.querySelector('.uploadedImageBlock').style.display = 'block';
            document.querySelector('.uploadImageBlock').style.display = 'none';
            isuploaded = true;
            let FR = new FileReader();
            FR.addEventListener("load", function (e) {
                let obj = {
                    texture: e.target.result,
                    size: [2, 2, 2],
                    shininess: 60
                }
                colors.unshift(obj);
                buildColors(colors);
                registerEvents();
                lastSelectedColorKey = '0';

                changeState({ showControls: true })
                selectSwatch(null, lastSelectedColorKey);
            });
            FR.readAsDataURL(event.target.files[0]);
        });
        const clear = document.querySelector('#clear');
        clear.addEventListener('click', function () {
            repeat = null;
            pickerColor = null;
            isuploaded = false;
            imgUpload.value = null;
            checkbox.checked = false;
            colorPicker.value = null;
            lastSelectedColorKey = '0';
            changeState({ showControls: false })
            selectSwatch(null, lastSelectedColorKey);
            document.querySelector('.uploadImageBlock').style.display = 'block';
            document.querySelector('.uploadedImageBlock').style.display = 'none';
        });
    }
    setMaterial(parent, type, mtl) {
        parent.traverse(o => {
            if (o.isMesh && o.nameID != null) {
                if (o.nameID === type) {
                    o.material = mtl;
                }
            }
        });
    }
    liveChanges() {
        console.log("hello sir..")
        const { scale_y, val_offset, globalColor, theModel, activeOption } = this.state;
        let global_color = globalColor;
        console.log(globalColor)
        if (globalColor) {
            let new_mtl;
            let color = global_color;
            if (color.texture) {

                let txt = new THREE.TextureLoader().load(color.texture);
                if (activeOption == 'body_skateboard_bottom_panel01') {
                    txt.repeat.set(3, scale_y);
                    txt.offset.set(0.2, val_offset);
                }
                else {
                    txt.repeat.set(1, scale_y);
                    txt.offset.set(0, val_offset);
                }

                new_mtl = new THREE.MeshPhongMaterial({
                    map: txt,
                    shininess: color.shininess ? color.shininess : 10
                });
                console.log(color.texture, "is texture")

            } else {
                new_mtl = new THREE.MeshPhongMaterial({
                    color: parseInt('0x' + color.color),
                    shininess: color.shininess ? color.shininess : 10
                });
            }
            this.setMaterial(theModel, activeOption, new_mtl);
        }
    }
    changeOffset(e) {
        let item = document.getElementById("target");
        let percent = Math.trunc((e.clientX / item.offsetWidth) * 100);
        if (((e.clientX / item.offsetWidth) * 100) > 99.5) {
            percent = 100;
        }
        console.log("hello", percent, item.offsetWidth, e.clientX, e.offsetX);
        document.getElementById("child").style.width = `${percent}%`;
        document.getElementById("thumb").style.left = `${percent}%`;
        this.setState({ val_offset: percent * 0.01 });
        this.liveChanges();
    }
    changeScale(e) {
        let item = document.getElementById("target1");
        console.log(e);
        let percent = Math.trunc(((e.clientX - 166) / item.offsetWidth) * 100);
        if ((((e.clientX - 166) / item.offsetWidth) * 100) > 99.5) {
            percent = 100;
        }
        console.log("hello", percent, item.offsetWidth, e.clientX, item.clientX);
        document.getElementById("child1").style.width = `${percent}%`;
        if (e.clientX >= 165) {
            document.getElementById("thumb1").style.left = `${percent}%`;
        }
        this.setState({ scale_y: 1 - percent * 0.01 });
        this.liveChanges();
    }

    render() {
        return (
            <>
                <div className={'loading'} id={'js-loader'}>
                    <div className={'loader'} />
                </div>
                <span className={'drag-notice'} id={'js-drag-notice'}>Drag to rotate 360&#176;</span>

                <div className={'options'}>
                    <div className={'option --is-active'} data-option={'body_skateboard_top_panel01'}>
                        GripTape
                    </div>
                    <div className={'option'} data-option={'body_skateboard_bottom_panel01'}>
                        Deck
                    </div>
                    <div className={'option'} data-option={'skateboard_wheels01'}>
                        Wheels
                    </div>
                    <div className={'option'} data-option={'skateboard_wheels_part_01'}>
                        Trucks
                    </div>
                    <div className={'option'} data-option={'skateboard_wheels_part_02'}>
                        Shocks
                    </div>
                    <div className={'option'} data-option={'body_skateboard_top_panel_bolts01'}>
                        Hardware
                    </div>
                </div>

                <canvas id={'c'} />

                <div className={'controls'}>
                    <div className={' uploadImageBlock mx-5'}>
                        <br /><label className={'my-2 uploadTitle'}>Upload your Image:</label><br />
                        <input type="file" name="img_upload" id={'img_upload'} className={''} accept={'image/*'} />
                    </div>
                    {
                        this.state.showControls && <div className="range-input-container">
                            <div className="range-input">
                                <label>Offset Y</label>
                                {/* <input type="range" value={this.state.offsetRange} onChange={(e) => {
                                    this.setState({ offsetRange: e.target.value });
                                    this.setState({ val_offset: e.target.value * 0.01 });
                                    this.liveChanges();
                                }} /> */}
                                <div id="target" className="slider" onMouseUp={this.changeOffset.bind(this)}>
                                    <div id="child" className="slider-child"></div>
                                    <div id="thumb" className="slider-thumb"></div>
                                </div>
                            </div>
                            <div className="range-input">
                                <label>Size</label>
                                {/*   <input type="range" value={this.state.scaleRange} onChange={(e) => {
                                    this.setState({ scaleRange: e.target.value });
                                    this.setState({ scale_y: 1 - e.target.value * 0.01 });
                                    this.liveChanges();
                                }} /> */}
                                <div id="target1" className="slider" onMouseUp={this.changeScale.bind(this)}>
                                    <div id="child1" className="slider-child"></div>
                                    <div id="thumb1" className="slider-thumb"></div>
                                </div>
                            </div>
                        </div>
                    }


                    <div className={'uploadImage uploadedImageBlock mx-5'}>
                        <h3>Image Upload</h3>
                        Choose Image Background Color: <input type="color" name="colorPicker" id={'colorPicker'} />
                        <br /> Do you want to repeat your image? <input type="checkbox" name="repeat" id={'repeat'} />
                        <br /> <label id={'clear'}>Clear</label>
                    </div>
                    <div className={'info'}>
                        <div className={'info__message'}>
                            <p><strong>&nbsp;Grab&nbsp;</strong> to rotate
                                SkateBoard. <strong>&nbsp;Scroll&nbsp;</strong> to
                                zoom. <strong>&nbsp;Drag&nbsp;</strong> swatches to view more.</p>
                        </div>
                    </div>
                    <div id={'js-tray'} className={'tray'}>
                        <div id={'js-tray-slide'} className={'tray__slide'} />
                    </div>
                </div>
                <div className={'frame'}>
                    <h1 className={'frame__title '}>SkateBoard</h1>
                </div>
            </>
        );
    }

}

App.propTypes = {};

export default App;
