#pragma strict

class Skill extends MonoBehaviour {
  public var damage = 1;
  public var damageMin = 1;
  public var damageMax = 1;
  public var symbol = 'L';
  public var color = Color.magenta;

  function Start() {
    damage = Random.Range(damageMin, damageMax);
    SendMessageUpwards(
      'skillAdded', this, SendMessageOptions.DontRequireReceiver
    );
  }
}
