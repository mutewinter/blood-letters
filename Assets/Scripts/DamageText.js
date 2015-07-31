#pragma strict

public var secondsToShow = 0.5;

function Start () {
  yield WaitForSeconds(secondsToShow);
  Destroy(gameObject);
}

function Update () {

}
