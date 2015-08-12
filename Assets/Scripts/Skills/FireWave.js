#pragma strict

class FireWave extends Skill {
  function Awake() {
    damageMin = 1;
    damageMax = 5;
    symbol = 'W';
    super.Awake();
  }

  function Start() {
    var multipleProjectileAbility =
      gameObject.AddComponent(MultipleProjectileAbility);
    multipleProjectileAbility.damage = damage;
    multipleProjectileAbility.color = Color.red;
    abilities.Add(multipleProjectileAbility);
    super.Start();
  }
}
