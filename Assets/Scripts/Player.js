#pragma strict

class Player extends Character {
  public var bulletPrefab: GameObject;

  var fireRate: float = 0.2;

  var _baseDamage = 0;
  function get baseDamage() { return (level * 1.5); }

  var _weaponDamage = 0;
  function get weaponDamage() { return _weaponDamage; }
  function set weaponDamage(value: int) {
    _weaponDamage = value;
    updateStatusManager();
  }

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
    return baseDamage + weaponDamage;
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
      statusManager.baseDamage = baseDamage;
      statusManager.kills = kills;
      statusManager.experience = totalExperience;
      statusManager.experienceNeededForNextLevel = 100;
      statusManager.weaponDamage = weaponDamage;
    } else {
      Debug.Log('No status manager');
    }
  }
}

