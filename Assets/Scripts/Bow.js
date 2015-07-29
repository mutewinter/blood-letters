#pragma strict

public var damage = 2;

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(other: Collider2D) {
  other.GetComponentInParent(Player).SendMessage('pickUp', this);
  Destroy(gameObject);
}
