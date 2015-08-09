#pragma strict

class Skill extends MonoBehaviour {
  public var damage = 1;
  public var damageMin = -2;
  public var damageMax = 10;

  function get symbol() { return getSymbol().text; }
  function set symbol(value: string) {
    getSymbol().text = value;
    updateColliderBounds();
  }

  function Start() {
    damage = Random.Range(damageMin, damageMax) || 1;

    // TODO DRY with statusmanager
    var weaponSign = damage > 0 ? '+' : '';
    var tooltip = GetComponentInChildren(Tooltip);
    tooltip.text = String.Format('{0}{1}', weaponSign, damage);
    updateColliderBounds();
  }

  function OnTriggerEnter2D(other: Collider2D) {
    var player = other.GetComponentInParent(Player);
    if (player) {
      player.SendMessage('pickUp', this);
      Destroy(gameObject);
    }
  }

  function getSymbol() : Symbol {
    return GetComponentInChildren.<Symbol>();
  }

  function updateColliderBounds() {
    var textMesh = getSymbol().GetComponent.<TextMesh>();
    var textMeshRenderer = textMesh.GetComponent.<Renderer>();
    var boxCollider2D = GetComponent.<BoxCollider2D>();
    boxCollider2D.size = Vector2(
      textMeshRenderer.bounds.size.x,
      textMeshRenderer.bounds.size.y
    );
    boxCollider2D.transform.position = textMesh.transform.position;
  }
}
