#pragma strict

class ShowsPopupDamage extends MonoBehaviour {
  public var color = Color.white;

  private var damageTextPrefab : GameObject;

  function Awake() {
    damageTextPrefab = AssetDatabase.LoadAssetAtPath(
      'Assets/Prefabs/DamageText.prefab',
      typeof(GameObject)
    );
    if (!damageTextPrefab) {
      Debug.LogWarning('ShowsPopupDamage: Missing damageTextPrefab');
    }
  }

  function showPopupDamage(amount, target: Vector3) {
    var textPosition = target;
    textPosition.y += 0.3;
    var damageText = Instantiate(
      damageTextPrefab, textPosition, Quaternion.identity
    );
    var textMesh = damageText.GetComponent.<TextMesh>();
    textMesh.color = color;
    textMesh.text = String.Format('{0}', amount);

    return void;
  }
}
