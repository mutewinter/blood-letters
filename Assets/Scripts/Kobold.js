#pragma strict

class Kobold extends Character {
  private var nextFire : float = 0;
  private var bulletSpeed : float = 100;
  private var fireRate : float = 0.8;

  function Start() {
    worthExperience = 55;
    health = 15;
    moveSpeed = 5;
    moveRate = 0.8;
    var skill = gameObject.AddComponent(Bow);
    skill.damage = 1;
    super.Start();
    GetComponent.<DropsSkills>().possibleSkillsDropped.Add(Bow);
  }

  function Update () {
    if (Time.time > nextFire) {
      nextFire = Time.time + fireRate;
      var attackDirection = new Vector2(
        Random.Range(-1F, 1F),
        Random.Range(-1F, 1F)
      );
      attack(attackDirection);
    }
  }
}
