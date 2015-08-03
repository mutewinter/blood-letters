#pragma strict

class StatusManager extends MonoBehaviour {
  public var text: UnityEngine.UI.Text;

  var _level = 0;
  function get level() { return _level; }
  function set level(value: int) { _level = value; update(); }

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
    var levelText = String.Format(
      'Level: {0} ({1}/{2} XP)', level, experience,
      experienceNeededForNextLevel
    );

    var damageText = '';
    var weaponSign = weaponDamage > 0 ? '+' : '-';
    if (weaponDamage) {
      damageText = String.Format(
        'Damage: {0} {1} {2}', baseDamage, weaponSign, weaponDamage
      );
    } else {
      damageText = String.Format('Damage: {0}', baseDamage);
    }

    text.text = String.Format(
      '{0}\n{1}\nKills: {2}', levelText, damageText, kills
    );
  }
}
