#pragma strict

public var damage = 1;
public var damageMin = -2;
public var damageMax = 10;

function Start () {
  // Ensure bow does at least one damage or less
  damage = Random.Range(damageMin, damageMax) || 1;
  var tooltip = GetComponentInChildren(Tooltip);

  // TODO DRY with statusmanager
  var weaponSign = damage > 0 ? '+' : '';
  tooltip.text = String.Format('{0}{1}', weaponSign, damage);
}

function Update () {
}

function pickedUp(player: Player) {
  player.SendMessage('pickUp', this);
  Destroy(gameObject);
}
