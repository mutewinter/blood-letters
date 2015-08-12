#pragma strict

class FireBow extends Skill {
  function Awake() {
    damageMin = 3;
    damageMax = 10;
    symbol = 'F';
    super.Awake();
  }

  function Start() {
    var singleProjectileAbility =
      gameObject.AddComponent(SingleProjectileAbility);
    singleProjectileAbility.damage = damage;
    singleProjectileAbility.color = Color.red;
    abilities.Add(singleProjectileAbility);
    super.Start();
  }
}
