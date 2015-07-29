#pragma strict

class Player extends Character {
  public var weaponDamage = 0;

  var _totalExperience = 1;
  function get totalExperience() {
    return _totalExperience;
  }

  function set kills(value: int) { 
    _kills = value;
    updateStatusManager();
  }

  function set totalExperience(value: int) {
    _totalExperience = value;
    updateStatusManager();
  }

  function get level() : int {
    return Mathf.CeilToInt(totalExperience / 100F);
  }
  function set level(value : int) {
    level = value;
  }

  function get damage() : float {
    return (level * 1.5) + weaponDamage;
  }
  function set damage(value : float) {
    damage = value;
  }

  function Start () {
    moveSpeed = 2.0;
    updateStatusManager();
  }

  function Update () {
  }

  function gainExperience(experience: int) {
    var startLevel = level;
    totalExperience += experience;
    Debug.Log('+' + experience + 'XP');
    if (startLevel != level) {
      Debug.Log('ZTARG!');
      Debug.Log('Level: ' + level);
      Debug.Log('Damage: ' + damage);
    }
  }

  function pickUp(item: Bow) {
    weaponDamage = item.damage;
  }

  function updateStatusManager() {
    var canvas = GameObject.FindWithTag('HUD');
    var statusManager = canvas.GetComponentInChildren(StatusManager);
    if (statusManager) {
      statusManager.level = level;
      statusManager.damage = damage;
      statusManager.kills = kills;
    } else {
      Debug.Log('No status manager');
    }
  }
}

