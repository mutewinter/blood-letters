#pragma strict

class Bow extends Skill {
  function Awake() {
    damageMin = 1;
    damageMax = 3;
    symbol = 'D';
    super.Awake();
  }

  function Start() {
    var singleProjectileAbility =
      gameObject.AddComponent(SingleProjectileAbility);
    singleProjectileAbility.damage = damage;
    // Same as kobold
    Color.TryParseHexString('FBE39F', singleProjectileAbility.color);
    abilities.Add(singleProjectileAbility);
    super.Start();
  }
}
