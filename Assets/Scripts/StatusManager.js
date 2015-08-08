#pragma strict

class StatusManager extends MonoBehaviour {
  public var text: UnityEngine.UI.Text;

  var _health = 0;
  function get health() { return _health; }
  function set health(value: int) { _health = value; update(); }

  var _level = 0;
  function get level() { return _level; }
  function set level(value: int) { _level = value; update(); }

  var _damage = 0;
  function get damage() { return _damage; }
  function set damage(value: int) { _damage = value; update(); }

  var _baseDamage = 0;
  function get baseDamage() { return _baseDamage; }
  function set baseDamage(value: int) { _baseDamage = value; update(); }

  var _weaponDamage = 0;
  function get weaponDamage() { return _weaponDamage; }
  function set weaponDamage(value: int) { _weaponDamage = value; update(); }

  var _kills = 0;
  function get kills() { return _kills; }
  function set kills(value: int) { _kills = value; update(); }

  var _experience = 0;
  function get experience() { return _experience; }
  function set experience(value: int) { _experience = value; update(); }

  var _experienceNeededForNextLevel = 0;
  function get experienceNeededForNextLevel() {
    return _experienceNeededForNextLevel;
  }
  function set experienceNeededForNextLevel(value: int) {
    _experienceNeededForNextLevel = value; update();
  }

  function Start () {
    update();
  }

  function Update () {
  }

  function update() {
    var healthText = String.Format('Health: {0}', health);

    var levelText = String.Format(
      'Level: {0} ({1}/{2} XP)', level, experience,
      experienceNeededForNextLevel
    );

    var damageText = '';
    if (weaponDamage) {
      var weaponSign = weaponDamage > 0 ? '+' : '';
      damageText = String.Format(
        'Damage: {0} ({1}{2}{3})',
        damage, baseDamage, weaponSign, weaponDamage
      );
    } else {
      damageText = String.Format('Damage: {0}', baseDamage);
    }

    var killsText = String.Format('Kills: {0}', kills);

    text.text = new Array([
      healthText,
      levelText,
      damageText,
      killsText
    ]).join('\n');
  }
}
