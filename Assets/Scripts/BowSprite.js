#pragma strict

function Start () {
}

function Update () {
}

function OnTriggerEnter2D(other: Collider2D) {
  var player = other.GetComponentInParent(Player);
  if (player) {
    SendMessageUpwards('pickedUp', player);
  }
}
