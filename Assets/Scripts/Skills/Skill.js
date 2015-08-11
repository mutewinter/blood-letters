#pragma strict

class Skill extends MonoBehaviour {
  public var damage = 1;
  public var damageMin = 1;
  public var damageMax = 1;
  public var symbol = 'L';
  public var color = Color.magenta;

  public var projectilePrefab: GameObject;
  public var projectilePrefabName: String;

  function Awake() {
    damage = Random.Range(damageMin, damageMax);
  }

  function Start() {
    SendMessageUpwards(
      'skillAdded', this, SendMessageOptions.DontRequireReceiver
    );

    if (projectilePrefabName) {
      projectilePrefab = AssetDatabase.LoadAssetAtPath(
        projectilePrefabName,
        typeof(GameObject)
      );
      if (!projectilePrefab) {
        Debug.LogWarning(String.Format(
          'Skill: Missing Projectile Prefab {0}', projectilePrefabName
        ));
      }
    }
  }
}
