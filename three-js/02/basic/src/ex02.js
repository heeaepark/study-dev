import * as THREE from 'three';


export default function example() {
  console.log(THREE);

  //const renderer = new THREE.WebGLRenderer();
  //renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild(renderer.domElement);

  //캔버스 크기 동적 조립
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true, //사물의 외곽을 부드럽게 하는 옵션 기본값은 false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //렌더러화소비율
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //디바이스 화소 비율이 1보다 클 경우 렌더러의 화소를 2배로, 그 외엔 1로

  //Scene
  const scene = new THREE.Scene();

  //Camera
  const camera = new THREE.PerspectiveCamera(
    //시야각(field of view)
    75,
    //화면 종횡비율 (aspect)
    window.innerWidth / window.innerHeight,
    //가까워지면 사물이 안보이는 수치 (near)
    0.1,
    //멀어지면 사물이 안보이는 수치 (far)
    1000
  );

  camera.position.x = 1 //카메라 x축 위치값 설정
  camera.position.y = 2 //카메라 y축 위치값 설정
  camera.position.z = 5 //카메라 z축 위치값 설정
  //무대 위 카메라 추가
  scene.add(camera);


  //Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000
    // color: '#ff0000'
    color: 'red'
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh)



  // 그리기
  renderer.render(scene, camera);


  //렌더러 사이즈 브라우저 리사이즈 이벤트에 맞게 수정
  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight; //카메라 종횡비 이벤트 실행시 브라우저 크기 비율로 업데이트
    camera.updateProjectionMatrix(); // 카메라가 수정되면 업데이트 해줘야함
    renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러 사이즈 수정
    renderer.render(scene, camera); //그려주기
  }
  window.addEventListener('resize', setSize)
}